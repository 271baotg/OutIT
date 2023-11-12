import { Badge } from "@chakra-ui/react";
import styles from "../styles/PlanTable.module.css";
import React, { MouseEventHandler, useEffect, useState } from "react";

type componentProps = {
  data: Course;
  onTypeChange: Function;
};

const PlanRow: React.FC<componentProps> = (props) => {
  const typeChuyenNghiep: String[] = ["CN", "CSN", "CNTC", "CNCS", "CSNN"];
  const [current, setCurrentType] = useState<String>(props.data.type);

  const handleItemSelect = (value: String) => {
    setCurrentType(value);
    props.onTypeChange(value);
  };

  return (
    <Badge colorScheme="green" className={styles.dropdown}>
      <button
        type="button"
        className="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {current}
      </button>
      <ul className="dropdown-menu animate">
        {typeChuyenNghiep
          .filter((item) => item !== current)
          .map((value) => {
            return (
              <li>
                <Badge
                  colorScheme="green"
                  className="dropdown-item animate"
                  onClick={() => {
                    handleItemSelect(value);
                  }}
                >
                  {value}
                </Badge>
              </li>
            );
          })}
      </ul>
    </Badge>
  );
};

export default PlanRow;
