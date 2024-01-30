import React, { useEffect, useRef, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Enrollment } from "../../../model/Enrollment";
import { Target } from "../../../model/Target";

ChartJS.register(ArcElement, Tooltip, Legend);

interface componentProps {
  listEnroll: Enrollment[];
  listTarget: Target[];
}

const DonutChart: React.FC<componentProps> = (props) => {
  const getColor = (type: string) => {
    if (type === "CN") return "#ff6464";
    if (type === "CSN") return "#ffbd67";
    if (type === "ĐC") return " #ea78f5";
    if (type === "CNTC") return " #3ec1d3";
    if (type === "CSNN") return "#5be7a9";
    if (type === "others") return "#448ef6";
  };
  const getTitle = (type: string) => {
    const titleMap: Record<string, string> = {
      CN: "CHUYÊN NGHÀNH",
      CSN: "CƠ SỞ NGHÀNH",
      ĐC: "ĐẠI CƯƠNG",
      CNTC: "CHUYÊN NGHÀNH TỰ CHỌN",
      CSNN: "CƠ SỞ NHÓM NGHÀNH",
      CĐTN: "CHUYÊN ĐỀ TỐT NGHIỆP",
      TTDN: "THỰC TẬP TỐT NGHIỆP",
      ĐA: "ĐỒ ÁN",
    };

    return titleMap[type] || "CÁC MÔN KHÁC";
  };

  const [totalEnroll, setTotalEnroll] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const totalEnrollRef = useRef(0);
  const totalTargetRef = useRef(0);
  const currentTarget = props.listTarget.reduce((acc, target) => {
    acc += target.total;
    return acc;
  }, 0);

  useEffect(() => {
    const newTotalEnroll = props.listEnroll.reduce(
      (acc, enroll) => acc + enroll.total,
      0
    );
    const newTotalTarget = props.listTarget.reduce(
      (acc, target) => acc + target.goal,
      0
    );

    setTotalEnroll(newTotalEnroll);
    totalEnrollRef.current = newTotalEnroll;
    setTotalTarget(newTotalTarget);
    totalTargetRef.current = newTotalTarget;
  }, [props.listEnroll, props.listTarget]);

  const labels = props.listTarget.map((item) => getTitle(item.type));
  const listTotal = props.listTarget.map((item) => item.total);
  const backgroundColors = props.listTarget.map((item) => getColor(item.type));
  const data = {
    labels: [...labels, "Các môn khác"],
    datasets: [
      {
        label: "Số tín chỉ",
        data: [...listTotal, totalEnroll - currentTarget],
        backgroundColor: [...backgroundColors, "black"],
        borderWidth: 2,
      },
    ],
  };

  const textCenter = {
    id: "textcenter",
    beforeDraw(chart: any) {
      const { ctx, chartArea, data } = chart;
      const width = chartArea.right - chartArea.left;
      const height = chartArea.bottom - chartArea.top;
      const fontSize = 15;
      ctx.save();
      ctx.font = `bold ${fontSize}px poppins`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${totalEnrollRef.current} / ${totalTargetRef.current}`,
        width / 2,
        height / 2
      );
      ctx.restore();
    },
  };

  const option = {
    cutout: 60,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const, // Place legend at the bottom
        display: false,
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={option} plugins={[textCenter]}></Doughnut>
    </>
  );
};

export default DonutChart;
