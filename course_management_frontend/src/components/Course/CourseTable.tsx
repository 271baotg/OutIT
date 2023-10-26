import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import styles from "./CourseTable.module.css";

interface TableProps {
  data: Course[];
  checklist: Course[];
  setchecklist: Dispatch<SetStateAction<Course[]>>;
}

const Wrapper = styled.div`
  color: #212529;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-family: montserrat, sans-serif;
  line-height: 1.6;
  box-sizing: border-box;
  display: block !important;
  text-align: center;
  font-weight: 700;
  font-size: 0.937rem;
  text-transform: uppercase;
  border: 2px solid #34444c;
  background: #fff;
  box-shadow: 4px 4px 0 #34444c;
  height: 80%;
`;

const CourseTable: React.FC<TableProps> = (props) => {
  const onCheckHandler = (course: Course) => {
    if (props.checklist.includes(course)) {
      props.setchecklist(props.checklist.filter((c) => c !== course));
    } else {
      props.setchecklist([...props.checklist, course]);
    }
  };

  return (
    <Wrapper className="container rounded mt-5 bg-white p-md-5">
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
                <tr key={course.id}>
                  <td>
                    <input
                      type="checkbox"
                      className={styles.smallCheckbox}
                      onChange={() => onCheckHandler(course)}
                    />
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
    </Wrapper>
  );
};

export default CourseTable;
