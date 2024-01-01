import React from "react";
import styles from "../styles/ConstraintProgress.module.css";
import { motion } from "framer-motion";
import { Target } from "../../../model/Target";
import { getTypeColor } from "../../../hooks/getTypeColor";

interface componentProps {
  data: Target;
}

const ConstraintProgress: React.FC<componentProps> = (props) => {
  const percentage = (props.data.total / props.data.goal) * 100;

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
          style={{ backgroundColor: getTypeColor(props.data.type) }}
          initial="hidden"
          animate="visible"
          variants={fillVariant}
          transition={{ duration: 1, delay: 1, type: "tween" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default ConstraintProgress;
