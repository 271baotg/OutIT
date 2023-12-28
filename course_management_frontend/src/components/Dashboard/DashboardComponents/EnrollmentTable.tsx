import React from "react";
import { Enrollment } from "../../../model/Enrollment";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import TypeBadge from "./TypeBadge";
import { useNavigate } from "react-router-dom";

interface componentProps {
  data: Enrollment[];
}

const EnrollmentTable: React.FC<componentProps> = (props) => {
  const navigate = useNavigate();
  const tableVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const getTitle = (type: string) => {
    if (type == "CN") return "Chuyên nghành";
    if (type == "CSN") return "Cơ sở nghành";
    if (type == "ĐC") return "Đại cương";
    if (type == "CNTC") return "Chuyên nghành tự chọn";
    if (type == "CSNN") return "Cơ sở nhóm nghành";
    if (type == "CĐTN") return "Chuyên đề tốt nghiệp";
    if (type == "TTTN") return "Thực tập tốt nghiệp";
    if (type == "ĐA") return "Đồ án";
  };
  const handleOnClickGoToCourse = () => {
    navigate("/course");
  }

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={tableVariant}>
        <TableContainer whiteSpace="nowrap" overflowX="unset" overflowY="unset">
          <Table variant="simple" size="sm">
            <Thead position="sticky" top={0} bgColor="white">
              <Tr>
                <Th>Mã môn</Th>
                <Th>Tên môn</Th>
                <Th>Loại tín chỉ</Th>
                <Th>Số tín chỉ</Th>
                <Th>Học kì</Th>
              </Tr>
            </Thead>
            {props.data.length > 0 ? <Tbody>
              {props.data.map((enrollment) => (
                <Tr>
                  <Td
                    borderLeft={"none"}
                    borderRight={"none"}
                    textColor={"black"}
                  >
                    {enrollment.code}
                  </Td>
                  <Td
                    borderLeft={"none"}
                    borderRight={"none"}
                    maxWidth="200px"
                    whiteSpace="pre-line"
                  >
                    {enrollment.name}
                  </Td>
                  <Td borderLeft={"none"} borderRight={"none"}>
                    <TypeBadge data={enrollment.type} />
                  </Td>
                  <Td borderLeft={"none"} borderRight={"none"} isNumeric>
                    {enrollment.total}
                  </Td>
                  <Td borderLeft={"none"} borderRight={"none"} isNumeric>
                    {enrollment.term}
                  </Td>
                </Tr>
              ))}
            </Tbody>
              :
              <tr>
                <td colSpan={5}>
                  <div className="h-100 flex-column d-flex justify-content-center align-items-center">
                    <h4>Bạn chưa đăng ký môn nào hết, xin vui lòng chuyển sang Course để đăng ký</h4>
                    <button onClick={handleOnClickGoToCourse} className="btn btn-primary m-4 w-50 h-25 fs-5">Đi tới Course</button>
                  </div>
                </td>
              </tr>
            }
          </Table>
        </TableContainer>
      </motion.div>
    </>
  );
};

export default EnrollmentTable;
