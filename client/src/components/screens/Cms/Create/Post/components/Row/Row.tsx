import { RowProps } from "./Row.props";

export const Row = ({ header, annotation, children, message, col }: RowProps) => {
  const Content = () => (
    <>
      <div className="flex flex-col">
        <span className="font-bold">{header}</span>
        {annotation && <span className="font-medium text-sm text-gray-500">{annotation}</span>}
      </div>
      <div className="flex flex-col gap-2">
        {children}
        {message && <span className="font-medium text-sm text-gray-400">{message}</span>}
      </div>
    </>
  );

  return col ? (
    <div className="grid grid-flow-row gap-4 border-t border-border-color py-7">
      <Content />
    </div>
  ) : (
    <div className="grid grid-cols-[2fr_4fr_1fr] gap-4 border-t border-border-color py-7">
      <Content />
    </div>
  );
};
