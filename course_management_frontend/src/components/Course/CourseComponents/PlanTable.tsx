/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "../styles/PlanTable.module.css";
import { Badge } from "@chakra-ui/react";
import PlanRow from "./PlanRow";

type componentprops = {
  data: Course[];
};

const PlanTable: React.FC<componentprops> = (props) => {
  const typeChuyenNghiep: String[] = ["CN", "CSN", "CNTC", "CNCS", "CSNN"];

  return (
    <div className={styles.plan_table_container}>
      <table className={styles.plan_table}>
        <thead>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((course) => {
            return (
              <tr key={course.id}>
                <td className="px-2 p-2">
                  <div className="d-flex gap-2">
                    <div className={styles.tag}></div>
                    <div className="code">{course.code}</div>
                  </div>
                </td>
                <td className="px-2 p-2">
                  {!typeChuyenNghiep.includes(course.type) && (
                    <Badge colorScheme="green" className={styles.dropdown}>
                      <button type="button" aria-expanded="false">
                        {course.type}
                      </button>
                    </Badge>
                  )}
                  {typeChuyenNghiep.includes(course.type) && (
                    <PlanRow data={course}></PlanRow>
                  )}
                </td>
                <td>{course.total}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
