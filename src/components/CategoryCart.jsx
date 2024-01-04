import { Progress } from "antd";

const CategoryCart = () => {
  return (
    <div
      className="max-w-sm min-h-[240px] h-[240px]
    rounded-2xl
    text-[#1A2421]
    backdrop-blur-lg
    [ p-4 md:p-8 lg:p-10 ]
    [ bg-gradient-to-b from-white/60 to-white/30 ]
    [ border-[1px] border-solid border-white border-opacity-30 ]
    [ shadow-black/10 shadow-xl ]"
    >
      <div className="flex flex-col justify-between items-start h-full">
      <Progress strokeColor={""} type="circle" percent={75} />
        <div>
          <div>Sport</div>
          <div>2 tasks for today</div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCart;
