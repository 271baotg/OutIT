import React from "react";
import styles from "../styles/TypeBar.module.css";
import { motion } from "framer-motion";
import { Type } from "../../../model/TypeAndTotal";

interface componentProps {
  data: Type;
}

const TypeBar: React.FC<componentProps> = (props) => {
  const percentage = (props.data.total / 20) * 100;
  const getTitle = () => {
    if (props.data.type == "CN") return "CHUYÊN NGHÀNH";
    if (props.data.type == "CSN") return "CƠ SỞ NGHÀNH";
    if (props.data.type == "ĐC") return "ĐẠI CƯƠNG";
    if (props.data.type == "CNTC") return "CHUYÊN NGHÀNH TỰ CHỌN";
    if (props.data.type == "CSNN") return "CƠ SỞ NHÓM NGHÀNH";
    if (props.data.type == "others") return "KHÁC";
  };
  const getColor = () => {
    if (props.data.type == "CN") return "var(--cn-type-color)";
    if (props.data.type == "CSN") return "var(--csn-type-color)";
    if (props.data.type == "ĐC") return "var(--dc-type-color)";
    if (props.data.type == "CNTC") return "var(--cntc-type-color)";
    if (props.data.type == "CSNN") return "var(--csnn-type-color)";
    if (props.data.type == "others") return "var(--other-type-color)";
  };

  const progressBarVariant = {
    hidden: { opacity: 0, width: "0%" },
    visible: { opacity: 1, width: "100%" },
  };

  const fillVariant = {
    hidden: { width: "0%" },
    visible: { width: `${percentage}%` },
  };

  const tooltipVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <div className={styles.wrapper}>
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#fff",
          marginBottom: "1.5rem",
        }}
      >
        {getTitle()}
      </div>
      {/* <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_fill}
          style={{ width: `50%` }}
        ></div>
      </div> */}
      <motion.div
        className={styles.progress_bar}
        initial="hidden"
        animate="visible"
        variants={progressBarVariant}
        transition={{ duration: 1.5, type: "tween" }}
      >
        <motion.div
          className={styles.progress_bar_fill}
          style={{ backgroundColor: getColor() }}
          initial="hidden"
          animate="visible"
          variants={fillVariant}
          transition={{ duration: 1, delay: 1, type: "tween" }}
        >
          <motion.span
            variants={tooltipVariant}
            transition={{ duration: 2 }}
            className={styles.tooltip}
            style={{ backgroundColor: getColor(), border: "1px solid #ffffff" }}
          >
            {props.data.total} tín chỉ
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TypeBar;
