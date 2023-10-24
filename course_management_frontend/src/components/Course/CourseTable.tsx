import React, { SetStateAction } from "react";
import styled from "styled-components";
import styles from "./CourseTable.module.css";

interface TableProps {
  data: Course[];
}

const CourseTable: React.FC<TableProps> = (props) => {
  return (
    <div className="container rounded mt-5 bg-white p-md-5">
      <section className={`${styles.theader}`}>
        <div className="h3 display-6">Course List</div>
        <form
          className={styles.search_form}
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <label htmlFor="search">Search for stuff</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
            required
          />
        </form>
      </section>
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
            {props.data.map((course) => {
              return (
                <tr>
                  <td>
                    <input type="checkbox" className={styles.smallCheckbox} />
                  </td>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.type}</td>
                  <td>{course.total}</td>
                  <td>Done</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
