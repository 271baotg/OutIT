import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getTitle, getTypeColor } from "../../../hooks/getTypeColor";
import TypeBadge from "../../Dashboard/DashboardComponents/TypeBadge";

const Item = styled(motion.div)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled(motion.div)`
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
  padding: 0.5rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  scrollbar-width: thin; // For Firefox
  scrollbar-color: #161616 lightgray; // For Firefox
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 2.5rem; /* Adjust the height as needed */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
`;

const ListContainer = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px; // For Chrome and Safari
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0a0a0a; // For Chrome and Safari
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray; // For Chrome and Safari

    border-radius: 0.7rem;
  }
`;

interface componentProps {
  data: Course[];
}
const TermCourseTable: React.FC<componentProps> = (props) => {
  return (
    <Wrapper>
      {/* <HeaderBar style={{ backgroundColor: getTypeColor(props.type) }}>
        Danh sách môn {getTitle(props.type)} bạn đã đăng kí
      </HeaderBar> */}
      <ListContainer>
        {props.data.map((value, i) => {
          return (
            <Item
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: i * 0.2 },
              }}
              className="row gx-0"
            >
              <div
                className="col-md-2"
                style={{ fontSize: "0.9rem", fontWeight: "bold" }}
              >
                {value.code}
              </div>
              <div className="col-md-4">{value.name}</div>
              <div
                className="col-md-4"
                style={{ color: getTypeColor(value.type), fontWeight: "bold" }}
              >
                {getTitle(value.type)}
              </div>
              <div className="col-md-2">{value.total} tín chỉ</div>
            </Item>
          );
        })}
      </ListContainer>
    </Wrapper>
  );
};

export default TermCourseTable;
