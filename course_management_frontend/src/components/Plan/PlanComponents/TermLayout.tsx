import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import styles from "../styles/TermLayout.module.css";
import TermItem from "./TermItem";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  max-height: 90%;
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

const TermLayout = () => {
  const [selectedId, setSelectedId] = useState(null);
  const cards = [1, 2, 3, 4];
  const handleCardClick = (cardId: any) => {
    setSelectedId(selectedId === cardId ? null : cardId);
  };
  const handleOverlayClick = () => {
    setSelectedId(null); // Collapse the currently expanded card
  };

  return (
    <Wrapper>
      {cards.map((card, i) => (
        <motion.div
          className={
            selectedId === card ? `${styles.opened_card}` : `${styles.card}`
          }
          key={i}
          layout
          drag={selectedId === card ? "x" : false}
          onClick={() => handleCardClick(card)}
        >
          {selectedId === card && <div> Hello </div>}
          {selectedId !== card && <TermItem />}
        </motion.div>
      ))}
      <motion.div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          background: "black",
          opacity: 0,
          pointerEvents: "none",
        }}
        animate={{ opacity: selectedId ? 0.3 : 0 }}
        onClick={handleOverlayClick} // Add onClick handler for overlay
      />
    </Wrapper>
  );
};

export default TermLayout;
