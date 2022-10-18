import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FieldUpload, Input, TextArea } from "@ui";
import { createPost, getOnePostProtected, getPostImg, updatePost } from "@services";
import { useActions } from "@hooks";
import { scrollTopSmooth } from "@utils";
import { Categories, PostCreatedNotification, Row, SubmitBtns, Tags } from "./components";

export const CreatePost = () => {
  const { setPostCreateErrorMes, setPostOnCreateNotification } = useActions();

  const postIdRef = useRef<number | undefined>(undefined);

  const router = useRouter();

  const dataRefs = {
    title: useRef("") as any,
    description: useRef("") as any,
    img: useRef<File | null>(null) as any,
    categoryId: useRef<number | undefined>(undefined) as any,
    tags: useRef<number[] | []>([]) as any,
    content: useRef("") as any,
  };

  useEffect(() => {
    postIdRef.current = +router.asPath.split("?id=")[1];

    if (postIdRef.current) {
      getOnePostProtected(postIdRef.current).then((res) => {
        dataRefs.title.current.setValue(res.title);
        dataRefs.description.current.setValue(res.description);
        dataRefs.categoryId.current.setValue(res.category.id);
        dataRefs.tags.current.setValue(res.PostTag.map((el) => el.tag.id));
        dataRefs.content.current.setValue(res.content);
        getPostImg(res.img).then((res) => {
          dataRefs.img.current.setValue(res);
        });
      });
    }
  }, []);

  const clearForm = () => {
    for (const ref in dataRefs) {
      dataRefs[ref as keyof typeof dataRefs].current.clear();
    }
  };

  const handleSubmit = (status: "DRAFT" | "ACTIVE") => {
    const isComplited = Object.keys(dataRefs).every((i) => dataRefs[i as keyof typeof dataRefs]?.current?.check() === true);

    if (!isComplited) {
      setPostCreateErrorMes("Not all fields are filled in correctly");
      return;
    }

    const fd = new FormData();
    for (const key in dataRefs) {
      const value: any = dataRefs[key as keyof typeof dataRefs].current.getValue();
      if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, value);
      }
    }
    fd.append("status", status);

    const onPostCreated = () => {
      clearForm();
      setTimeout(() => {
        scrollTopSmooth();
        setPostOnCreateNotification(true);
      }, 0);
      setTimeout(() => {
        setPostOnCreateNotification(false);
        setPostCreateErrorMes("");
      }, 2500);
    };

    if (postIdRef.current) {
      updatePost(postIdRef.current, fd).then((res) => {
        if (res?.id) onPostCreated();
      });
    } else {
      createPost(fd).then((res) => {
        if (res?.id) onPostCreated();
      });
    }
  };

  return (
    <>
      <PostCreatedNotification type={postIdRef.current ? "UPDATED" : "CREATRED"} />
      <div className="px-5 pt-5 font-semibold text-[#454a66]">
        <Row header="Title" annotation="This is title" message="20-50 сharacters">
          <Input type="text" ref={dataRefs.title} showCounter={true} minLength={20} maxLength={50} />
        </Row>
        <Row header="Description" annotation="This is description" message="50-100 characters">
          <TextArea resize={"none"} ref={dataRefs.description} showCounter={true} minLength={50} maxLength={100} />
        </Row>
        <Row header="Img" annotation="This is img" message="jpeg - aspect ratio: (16:9)">
          <FieldUpload ref={dataRefs.img} />
        </Row>
        <Row header="Category" annotation="This is category">
          <Categories ref={dataRefs.categoryId} />
        </Row>
        <Row header="Tags" annotation="This is tags" message="Choise 1-5 tags">
          <Tags ref={dataRefs.tags} />
        </Row>
        <Row col={true} header="Content" annotation="This is content" message="300-10000 characters">
          <TextArea
            resize={"y"}
            ref={dataRefs.content}
            showCounter={true}
            minLength={300}
            maxLength={10000}
            className="!min-h-[500px]"
          />
        </Row>
        <SubmitBtns handleSubmit={handleSubmit} />
      </div>
    </>
  );
};
