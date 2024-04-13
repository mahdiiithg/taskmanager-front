import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import ModalContext from "../context/ModalContext";
import { useContext } from "react";


const Coverheader = () => {
  const { t } = useTranslation();
  const { language } = useContext(ModalContext);

  const covers = [
    {src: '/images/weeks/0.webp'},
    {src: '/images/weeks/1.webp'},
    {src: '/images/weeks/2.webp'},
    {src: '/images/weeks/3.webp'},
    {src: '/images/weeks/4.webp'},
    {src: '/images/weeks/5.webp'},
    {src: '/images/weeks/6.webp'},
  ]
  // Get today's date
  const today = dayjs();
  // Get the number of the day in the week
  const dayOfWeek = today.day();

  return (
    <div className="relative flex items-center w-full bg-gray-100 rounded-md h-36 md:h-52 p-8 shadow-md" >
      <p className="w-1/2 md:text-lg">
        {/* {goodFeelingSentences[dayOfWeek - 1].english} */}
        {t('sentence1')}
      </p>
      <img
        className={`h-52 sm:h-72 absolute -top-16 ${language === 'en' ? 'right-0' : 'left-0'}`}
        src={covers?.[dayOfWeek - 1]?.src || "/images/weeks/0.webp"}
        alt=""
      />
    </div>
  );
};
export default Coverheader;
