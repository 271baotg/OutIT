import React, { useEffect, useState } from "react";
import styles from "../styles/ProgressBar.module.css";
import { color } from "framer-motion";

type componentProp = {
  data: Course[];
};

const ProgressBar: React.FC<componentProp> = (props) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const newProgress = props.data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    setProgress(newProgress);
  }, [props.data]);

  const percentage = (progress / 30) * 100;
  const getColor = () => {
    if (progress < 14) return "#000000";
    else if (progress < 30) {
      return "#0bb83f";
    } else return "#ff2600";
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`progress-label text-start ${styles.label}`}
        style={{ color: getColor() }}
      >
        {progress === 0
          ? "Select some courses"
          : progress < 14
          ? "You are below 14 credits"
          : progress < 30
          ? "You meet the requirement of 14 credits"
          : "You are picking over 30 credits"}
      </div>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_fill}
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        ></div>
      </div>
      <div className="text-start">Total: {progress}</div>
    </div>
  );
};

export default ProgressBar;
