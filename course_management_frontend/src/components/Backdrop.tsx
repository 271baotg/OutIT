import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface backdropProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #6b6565e0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    // Adjust styles for mobile view
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #6b6565e0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
`;

const Backdrop: React.FC<backdropProps> = (props) => {
  return (
    <Wrapper
      onClick={props.onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </Wrapper>
  );
};

export default Backdrop;
