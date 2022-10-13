import { useTypedSelector } from "@hooks";
import { selectPost } from "@store/selectors/post.selector";
import { Img, Tags } from ".";

export const Header = () => {
  const { title } = useTypedSelector(selectPost);

  return (
    <header className="flex flex-col gap-4">
      <Img />
      <div className="px-8 lg:px-10 flex flex-col gap-2 [overflow-wrap:anywhere]">
        <div>
          <h1 className="font-bold text-2xl text-black text-center">{title}</h1>
        </div>
        <Tags />
      </div>
    </header>
  );
};
