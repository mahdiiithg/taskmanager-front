import { Link } from "react-router-dom";

const QuickTasksCard = ({
  to,
  src,
  title,
  compeleteTasks,
  inCompeleteTasks,
  direction,
  isRow,
  subtitle
}) => {
  return (
    <Link className=" self-center w-fit mx-auto min-w-[150px] sm:min-w-full sm:w-full" to={to}>
      <div
        className={`flex gap-y-2 justify-center items-center bg-gray-100 p-4 rounded-lg shadow capitalize ${
          direction || "flex-col"
        }`}
      >
        <img
          className="h-14"
          src={src || "/images/4884301.webp"}
          alt="calendar"
        />
        <div className="flex flex-col items-center">
          <span className=" font-semibold">{title}</span>
          <div
            className={`flex text-xs text-black/80  ${
              isRow
                ? "flex-col gap-y-0 text-left self-start"
                : "items-start gap-x-2 "
            }`}
          >
            {subtitle ?
              <div>{subtitle}</div>
            :
            <>
              <div>12 Completed</div>
            <div>4 Not yet</div>
            </>
          }
          </div>
        </div>
      </div>
    </Link>
  );
};
export default QuickTasksCard;
