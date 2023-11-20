import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Box = styled.button`
  display: flex;
  flex-direction: column;
  max-width: 8em; /* Smaller max width */
  min-height: 7rem; /* Smaller min height */
  overflow: hidden;
  border-radius: 0.7rem; /* Smaller border radius */
  text-decoration: none;
  background: orange;
  margin: 0.2em; /* Smaller margin */
  padding: 0.8em 0.4em; /* Smaller padding */
  border: 2px solid #34444c;
  background: #fff;
  box-shadow: 4px 4px 0 #34444c;
  transition: transform 0.5s ease, background 0.5s ease; /* Faster transition */

  h3 {
    color: #2e3c40;
    font-size: 1.3rem; /* Smaller font size */
    font-weight: 600;
    line-height: 1;
    padding-bottom: 0.2em; /* Smaller padding */
    margin: 0 0 0.1em; /* Smaller margin */
    border-bottom: 1px solid #000000; /* Smaller border */
    transition: color 0.2s ease, border 0.2s ease;
  }

  p {
    opacity: 0;
    color: #ffffff;
    font-size: 1rem;
    line-height: 1; /* Smaller line height */
    margin-top: 2rem;
    transform: translateY(-5em); /* Smaller transformation */
    transition: opacity 0.2s ease, transform 0.25s ease; /* Faster transition */
  }

  &:hover {
    background: #000000;
    transform: scale(1.01); /* Slightly smaller scaling */
  }

  &:hover h3 {
    color: #ffffff;
    border-bottom: 4px;
    border-bottom-color: #a75900;
  }

  &:hover p {
    opacity: 1;
    transform: none;
  }
`;

interface componentProps {
  data: Term;
  selectedTerm: number;
  setSelectedTerm: Dispatch<SetStateAction<number>>;
}

const TermBox: React.FC<componentProps> = (props) => {
  return (
    <div>
      <Box onClick={() => props.setSelectedTerm(props.data.term)}>
        <h3>TERM {props.data.term}</h3>
        <p>Total: {props.data.total}</p>
      </Box>
    </div>
  );
};

export default TermBox;
