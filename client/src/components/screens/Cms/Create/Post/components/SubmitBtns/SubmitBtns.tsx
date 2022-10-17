import { Button } from "@ui";
import { useTypedSelector } from "@hooks";
import { selectCmsCreatedPost } from "@store/selectors/cms.selector";
import { SubmitBtnsProps } from "./SubmitBtns.props";

export const SubmitBtns = ({ handleSubmit }: SubmitBtnsProps) => {
  const { errorMessage } = useTypedSelector(selectCmsCreatedPost);

  return (
    <div className="flex flex-col gap-4 border-t border-border-color py-7">
      <div className="flex gap-4">
        <Button appearance="primary" onClick={() => handleSubmit("ACTIVE")}>
          Publish
        </Button>
        <Button appearance="primary" onClick={() => handleSubmit("DRAFT")}>
          Save as Draft
        </Button>
      </div>
      {errorMessage && <span className="text-red-700">{errorMessage}</span>}
    </div>
  );
};
