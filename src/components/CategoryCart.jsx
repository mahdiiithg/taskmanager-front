import { Progress } from "antd";

const CategoryCart = ({data, tasks}) => {
  const {name} = data
  
  const countCompletedTasks = tasks.filter(task => task.status === true).length;
  const totalTasks = tasks.length;
  const percentageCompleted = totalTasks > 0 ? (countCompletedTasks / totalTasks) * 100 : 0;

  

  return (
    <div
      className="max-w-sm min-h-[240px] h-[240px] capitalize
    rounded-2xl
    text-[#1A2421]
    backdrop-blur-lg
    [ p-4 md:p-8 lg:p-10 ]
    [ bg-gradient-to-b from-white/60 to-white/30 ]
    [ border-[1px] border-solid border-white border-opacity-30 ]
    [ shadow-black/10 shadow-xl ]"
    >
      <div className="flex flex-col justify-between items-start h-full">
      <Progress
        // strokeColor={{
        //   '0%': '#108ee9',
        //   '100%': '#87d068',
        // }}
        type="circle"
        percent={totalTasks === 0 ? 100 : percentageCompleted.toFixed(0)}
      />
        <div>
          <div>{name}</div>
          <div>contain {tasks.length} tasks</div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCart;
