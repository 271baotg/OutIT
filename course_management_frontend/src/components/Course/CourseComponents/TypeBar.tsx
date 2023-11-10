import React from "react";
import styles from "../styles/TypeBar.module.css";
import { motion } from "framer-motion";
const TypeBar = () => {
  const progressBarVariant = {
    hidden: { opacity: 0, width: "0%" },
    visible: { opacity: 1, width: "100%" },
  };

  const fillVariant = {
    hidden: { width: "0%" },
    visible: { width: "50%" },
  };
  return (
    <div className={styles.wrapper}>
      <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Cơ sở nghành</div>
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
          initial="hidden"
          animate="visible"
          variants={fillVariant}
          transition={{ duration: 1, delay: 1, type: "tween" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default TypeBar;
