import { Badge } from "@chakra-ui/react";
import styles from "../styles/PlanTable.module.css";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { getTitle } from "../../../hooks/getTypeColor";

type componentProps = {
  data: Course;
  onTypeChange: Function;
};

const PlanRow: React.FC<componentProps> = (props) => {
  const typeChuyenNghiep: String[] = [
    "CN",
    "CSN",
    "CNTC",
    "CSNN",
    "ĐC",
    "ĐA",
    "CĐTN",
  ];
  const [current, setCurrentType] = useState<String>(props.data.type);

  const handleItemSelect = (value: String) => {
    setCurrentType(value);
    props.onTypeChange(value);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontSize: "0.8rem" }}
      >
        {getTitle(current.toString())}
      </button>
      <ul className="dropdown-menu animate">
        {typeChuyenNghiep
          .filter((item) => item !== current)
          .map((value) => {
            return (
              <li>
                <div
                  className="dropdown-item animate"
                  style={{ fontSize: "0.8rem" }}
                  onClick={() => {
                    handleItemSelect(value);
                  }}
                >
                  {getTitle(value.toString())}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PlanRow;
