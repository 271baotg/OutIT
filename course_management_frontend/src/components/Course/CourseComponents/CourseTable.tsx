import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import styles from "../styles/CourseTable.module.css";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAxiosPrivate } from "../../../hooks/useAxiosHook";
import { Badge, Input } from "@chakra-ui/react";
import { Enrollment } from "../../../model/Enrollment";
import { motion } from "framer-motion";
import { getTitle, getTypeColor } from "../../../hooks/getTypeColor";

interface TableProps {
  data: Course[];
  checklist: Course[];
  setchecklist: Dispatch<SetStateAction<Course[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  allEnrollment: Enrollment[];
  selectedTerm: number;
}

const Wrapper = styled.div`
  color: #212529;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-family: montserrat, sans-serif;

  box-sizing: border-box;
  display: block !important;
  text-align: center;
  font-size: 0.937rem;
  text-transform: uppercase;
  /* border: 2px solid #34444c;
  background: #fff;
  box-shadow: 4px 4px 0 #34444c; */
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
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

  const tableVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <Wrapper className="container rounded mt-5 bg-white p-md-4">
      <section className={`${styles.theader}`}>
        <div style={{ fontSize: "1.2rem" }}>Danh sách môn học</div>
        <form
          className={styles.search_form}
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <label htmlFor="search"></label>
          {/* <input
            id="search"
            type="search"
            placeholder="Search..."
            value={props.query}
            onChange={onQueryChange}
            autoFocus
            required
          /> */}
          <Input
            value={props.query}
            onChange={onQueryChange}
            autoFocus
            placeholder="Tìm tên, mã môn..."
            required
          />
        </form>
      </section>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.smallCheckbox}></th>
              <th>Mã môn</th>
              <th>Tên</th>
              <th>Loại tín chỉ</th>
              <th>Tổng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((course) => {
              const isChecked = props.checklist?.some(
                (item) => item.code === course.code
              );

              const isDisable = props.allEnrollment?.some(
                (item) =>
                  item.code === course.code &&
                  !isChecked &&
                  item.term !== props.selectedTerm
              );

              return (
                <tr
                  key={course.id}
                  className={isDisable && styles.row_disabled}
                >
                  <td>
                    <input
                      type="checkbox"
                      className={styles.smallCheckbox}
                      onChange={() => onCheckHandler(course)}
                      checked={isChecked}
                    />
                  </td>
                  <td style={{ fontWeight: "bold" }}>{course.code}</td>
                  <td>{course.name}</td>
                  <td
                    style={{
                      color: `${getTypeColor(course.type)}`,
                      fontWeight: "bold",
                    }}
                  >
                    {getTitle(course.type)}
                  </td>
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
