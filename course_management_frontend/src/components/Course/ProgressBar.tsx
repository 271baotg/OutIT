import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";
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
    if (progress < 14) return "#ff9900";
    else if (progress < 30) {
      return "#00ffaa";
    } else return "#ff2600";
  };

  return (
    <div className={styles.wrapper}>
      {progress < 14 && (
        <div
          className={`progress-label text-start ${styles.label}`}
          style={{ color: getColor() }}
        >
          You are below 14 credits
        </div>
      )}
      {progress >= 14 && (
        <div
          className={`progress-label text-start ${styles.label}`}
          style={{ color: getColor() }}
        >
          You meet the requirement of 14 credits
        </div>
      )}

      <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_fill}
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
