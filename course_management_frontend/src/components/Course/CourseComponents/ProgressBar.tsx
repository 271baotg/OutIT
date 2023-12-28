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
      return "#79dc97";
    } else return "#ff2600";
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`progress-label text-start ${styles.label}`}
        style={{ color: getColor() }}
      >
        {progress === 0
          ? "Chọn một vài môn từ bảng bên trái đề bắt đầu"
          : progress < 14
          ? "Vui lòng chọn đủ 14 tín chỉ"
          : progress < 30
          ? "Bạn đã đạt 14 tín chỉ"
          : "Bạn đang chọn vượt quá 30 tín chỉ"}
      </div>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_fill}
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        ></div>
      </div>
      <div className="text-start">Tổng số tín chỉ: {progress}</div>
    </div>
  );
};

export default ProgressBar;
