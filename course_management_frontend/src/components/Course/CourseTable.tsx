import React from "react";
import styled from "styled-components";
import styles from "./CourseTable.module.css";

const CourseTable = () => {
  return (
    <div className="container rounded mt-5 bg-white p-md-5">
      <div className="h2 font-weight-bold">Meetings</div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.smallCheckbox}></th>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" className={styles.smallCheckbox} />
              </td>
              <td>SE358</td>
              <td>Phương pháp phát triển phần mềm hướng đối tượng</td>
              <td>CN</td>
              <td>4</td>
              <td>Done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
