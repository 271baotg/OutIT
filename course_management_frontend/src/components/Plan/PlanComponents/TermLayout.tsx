import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import styles from "../styles/TermLayout.module.css";
import TermItem from "./TermItem";
import TermDetail from "./TermDetail";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  max-height: 90%;
  margin-bottom: 1rem;
  overflow: auto;
  scrollbar-width: thin; // For Firefox
  scrollbar-color: #161616 lightgray; // For Firefox
  &::-webkit-scrollbar {
    width: 2px; // For Chrome and Safari
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0a0a0a; // For Chrome and Safari
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray; // For Chrome and Safari
  }
`;

interface componentProps {
  data: Term[];
  listCourse: Course[];
  onTermClick: Function;
}

const TermLayout: React.FC<componentProps> = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const handleCardClick = (cardId: any) => {
    setSelectedId(selectedId === cardId ? null : cardId);
  };
  const handleOverlayClick = () => {
    setSelectedId(null); // Collapse the currently expanded card
  };

  return (
    <Wrapper>
      {props.data.map((term, i) => (
        <motion.div
          className={
            selectedId === term ? `${styles.opened_card}` : `${styles.card}`
          }
          key={i}
          layout
          onClick={() => {
            handleCardClick(term);
            props.onTermClick(term.term);
          }}
        >
          {selectedId === term && (
            <TermDetail data={term} listCourse={props.listCourse} />
          )}
          {selectedId !== term && <TermItem data={term} />}
        </motion.div>
      ))}
      {/* <motion.div
        layout
        style={{
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          background: "black",
          opacity: 0,
          pointerEvents: "none",
          borderRadius: "0 0.375rem 0.375rem 0",
        }}
        animate={{ opacity: selectedId ? 0.3 : 0 }}
        onClick={handleOverlayClick} // Add onClick handler for overlay
      /> */}
    </Wrapper>
  );
};

export default TermLayout;
