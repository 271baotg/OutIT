import React from "react";
import styled from "styled-components";
import styles from "../styles/ModalCourseTable.module.css";

const Wrapper = styled.div`
  color: #212529;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-family: montserrat, sans-serif;
  line-height: 1;
  box-sizing: border-box;
  text-align: center;
  font-weight: 500;
  font-size: 0.937rem;
  text-transform: uppercase;
  border: 2px solid #34444c;
  background: #fff;
  box-shadow: 4px 4px 0 #34444c;
  height: 100%;
`;

interface componentProp {
  data: Course[];
}

const ModalCourseTable: React.FC<componentProp> = (props) => {
  const serializeType = (type: string) => {
    if (type === "CN") return "CHUYÊN NGHÀNH";
    if (type === "CSN") return "CƠ SỞ NGHÀNH";
    if (type === "ĐC") return "ĐẠI CƯƠNG";
    if (type === "CNTC") return "CHUYÊN NGHÀNH TỰ CHỌN";
    if (type === "CSNN") return "CƠ SỞ NHÓM NGHÀNH";
    if (type === "KLTN") return "KHÓA LUẬN TỐT NGHIỆP";
    if (type === "CĐTN") return "CHUYÊN ĐỀ TỐT NGHIỆP";
    if (type === "ĐA") return "ĐỒ ÁN";
  };

  const getColor = (type: string) => {
    if (type === "CN") return "var(--cn-type-color)";
    if (type === "CSN") return "var(--csn-type-color)";
    if (type === "ĐC") return "var(--dc-type-color)";
    if (type === "CNTC") return "var(--cntc-type-color)";
    if (type === "CSNN") return "var(--csnn-type-color)";
    if (type === "others") return "var(--other-type-color)";
  };

  return (
    <Wrapper className="container rounded bg-white p-0">
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã môn</th>
              <th>Tên</th>
              <th>Loại tín chỉ</th>
              <th>Số tín chỉ</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((course) => (
              <tr>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td
                  style={{ color: getColor(course.type), fontWeight: "bold" }}
                >
                  {serializeType(course.type)}
                </td>
                <td>{course.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default ModalCourseTable;
