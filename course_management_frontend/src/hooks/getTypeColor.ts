import React from "react";

export const getTypeColor = (type: string) => {
  if (type === "CN") return "#ff6464";
  if (type === "CSN") return "#ffbd67";
  if (type === "ĐC") return " #ea78f5";
  if (type === "CNTC") return " #3ec1d3";
  if (type === "CSNN") return "#5be7a9";
  if (type === "others") return "#448ef6";
};

export const getTitle = (type: string) => {
  const titleMap: Record<string, string> = {
    CN: "CHUYÊN NGHÀNH",
    CSN: "CƠ SỞ NGHÀNH",
    ĐC: "ĐẠI CƯƠNG",
    CNTC: "CHUYÊN NGHÀNH TỰ CHỌN",
    CSNN: "CƠ SỞ NHÓM NGHÀNH",
    CĐTN: "CHUYÊN ĐỀ TỐT NGHIỆP",
    TTDN: "THỰC TẬP TỐT NGHIỆP",
    ĐA: "ĐỒ ÁN",
    KLTN: "KHÓA LUẬN TỐT NGHIỆP",
    NN: "NGOẠI NGỮ",
  };

  return titleMap[type] || "CÁC MÔN KHÁC";
};
