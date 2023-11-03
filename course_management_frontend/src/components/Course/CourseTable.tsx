import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import styles from "./CourseTable.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import { Badge } from "@chakra-ui/react";

interface TableProps {
  data: Course[];
  checklist: Course[];
  setchecklist: Dispatch<SetStateAction<Course[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  allEnrollment: Enrollment[];
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
  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setQuery(e.target.value);
  };

  const onCheckHandler = (course: Course) => {
    if (props.checklist.some((item) => item.code === course.code)) {
      props.setchecklist(props.checklist.filter((c) => c.code !== course.code));
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
            value={props.query}
            onChange={onQueryChange}
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
              const isChecked = props.checklist.some(
                (item) => item.code === course.code
              );

              return (
                <tr key={course.id}>
                  <td>
                    <input
                      type="checkbox"
                      className={styles.smallCheckbox}
                      onChange={() => onCheckHandler(course)}
                      checked={isChecked}
                    />
                  </td>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.type}</td>
                  <td>{course.total}</td>
                  {props.allEnrollment.some(
                    (enrollment) => enrollment.code === course.code
                  ) && (
                    <td>
                      <Badge variant="solid" colorScheme="green">
                        TERM{" "}
                        {
                          props.allEnrollment.find(
                            (enrollment) => enrollment.code === course.code
                          )?.term
                        }{" "}
                        : DONE
                      </Badge>
                    </td>
                  )}
                  {!props.allEnrollment.some(
                    (enrollment) => enrollment.code === course.code
                  ) && (
                    <td>
                      <Badge variant="solid" colorScheme="red">
                        Available
                      </Badge>
                    </td>
                  )}
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
