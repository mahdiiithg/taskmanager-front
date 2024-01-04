import { AiTwotoneStar } from "react-icons/ai";

const QuickTasks = (props) => {
  const {title} = props
  return (
    <div className="flex gap-x-2 items-center">
      <AiTwotoneStar size={32} />
      <div className="flex flex-col gap-y-0">
        <span>{title}</span>
        <div className="flex items-start gap-x-2 text-sm text-black/50">
          <div>12 Completed</div>
          <div>4 Not yet</div>
        </div>
      </div>
    </div>
  );
};
export default QuickTasks;
