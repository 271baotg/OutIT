import React from "react";
import styles from "../styles/Badge.module.css";
interface componentProps {
  data: string;
}

const TypeBadge: React.FC<componentProps> = (props) => {
  let badgeStyle = "";

  // Determine the style based on the status
  switch (props.data) {
    case "CN":
      badgeStyle = "cn_badge";
      break;
    case "CSNN":
      badgeStyle = "csnn_badge";
      break;
    case "CNTC":
      badgeStyle = "cntc_badge";
      break;
    case "ĐC":
      badgeStyle = "dc_badge";
      break;
    case "CSN":
      badgeStyle = "csn_badge";
      break;
    case "ĐA":
      badgeStyle = "da_badge";
      break;
    case "TTTN":
      badgeStyle = "tttn_badge";
      break;
    case "CĐTN":
      badgeStyle = "cdtn_badge";
      break;
    default:
      badgeStyle = "default-badge";
  }

  const getTitle = (type: string) => {
    if (type == "CN") return "Chuyên nghành";
    if (type == "CSN") return "Cơ sở nghành";
    if (type == "ĐC") return "Đại cương";
    if (type == "CNTC") return "Chuyên nghành tự chọn";
    if (type == "CSNN") return "Cơ sở nhóm nghành";
    if (type == "CĐTN") return "Chuyên đề tốt nghiệp";
    if (type == "TTTN") return "Thực tập tốt nghiệp";
    if (type == "ĐA") return "Đồ án";
  };

  return <div className={styles[badgeStyle]}>{getTitle(props.data)}</div>;
};

export default TypeBadge;
