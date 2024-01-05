import QuickTasks from "../components/QuickTasks"
import { CiStar } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";


const QuickTaskList = () => {
  return (
    <div className="flex flex-col space-y-3">
      <QuickTasks icon={<CiStar size={25} />} to="/importatns" title="High Priorities" />
      <QuickTasks icon={<CiCalendar size={25} />} to="/scheduled" title="In Schedule" />
      <QuickTasks icon={<CiTimer size={25} />} to="/today" title="Today" />
    </div>
  )
}
export default QuickTaskList