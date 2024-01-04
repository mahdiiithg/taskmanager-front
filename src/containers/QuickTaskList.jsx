import QuickTasks from "../components/QuickTasks"

const QuickTaskList = () => {
  return (
    <div>
      <QuickTasks title="High Priorities" />
      <QuickTasks title="In Schedule" />
      <QuickTasks title="Today" />
    </div>
  )
}
export default QuickTaskList