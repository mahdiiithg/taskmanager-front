import dayjs from "dayjs";

const Coverheader = () => {

  const covers = [
    {src: '/images/weeks/0.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/1.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/2.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/3.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/4.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/5.webp', slogan: 'Lorem ipsum dolor sit amet'},
    {src: '/images/weeks/6.webp', slogan: 'Lorem ipsum dolor sit amet'},
  ]
  // Get today's date
  const today = dayjs();
  // Get the number of the day in the week
  const dayOfWeek = today.day();

  return (
    <div className="relative flex items-center w-full bg-gray-100 rounded-md h-36 md:h-52 p-8 shadow-md">
      <p className="w-1/2 text-sm md:text-lg">
        {covers[dayOfWeek - 1].slogan}
      </p>
      <img
        className=" h-52 sm:h-72 absolute -top-16 right-0"
        src={covers[dayOfWeek - 1].src || "/images/weeks/0.webp"}
        alt=""
      />
    </div>
  );
};
export default Coverheader;
