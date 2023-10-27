/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./PlanTable.module.css";
import { Badge } from "@chakra-ui/react";

type componentprops = {
  data: Course[];
};

const PlanTable: React.FC<componentprops> = (props) => {
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
                  <Badge colorScheme="green" className={styles.dropdown}>
                    <button
                      type="button"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {course.type}
                    </button>
                    <ul className="dropdown-menu animate">
                      <li>
                        <div className="dropdown-item animate">TC</div>
                      </li>
                    </ul>
                  </Badge>
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
