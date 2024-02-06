import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerMotion = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const QuickTasksCard = ({
  to,
  src,
  title,
  compeleteTasks,
  inCompeleteTasks,
  direction,
  isRow,
  subtitle,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerMotion}
      initial="hidden"
      animate="visible"
      className=" self-center w-fit mx-auto min-w-[150px] sm:min-w-full sm:w-full"
    >
      <Link to={to}>
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
              {subtitle ? (
                <div>{subtitle}</div>
              ) : (
                <>
                  <div>12 {t("Completed")}</div>
                  <div>4 {t("Not Yet")}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default QuickTasksCard;
