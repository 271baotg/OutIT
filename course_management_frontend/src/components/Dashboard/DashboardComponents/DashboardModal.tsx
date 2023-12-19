import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Backdrop from "../../Backdrop";
import styled from "styled-components";
import { MouseEventHandler, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Center, CloseButton } from "@chakra-ui/react";
import { createPortal } from "react-dom";
import EnrollmentTable from "./EnrollmentTable";
import StaggerCourseList from "./StaggerCourseList";
import { Enrollment } from "../../../model/Enrollment";
import { getTitle } from "../../../hooks/getTypeColor";
import { Target } from "../../../model/Target";

const bubble = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      damping: 15,
      stiffness: 80,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const Dialog = styled(motion.dialog)`
  width: 50%;
  height: 50%;
  background-color: white;
  padding: 0;
  margin: auto;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // Ensure this is set to 'relative'

  @media (max-width: 768px) {
    // Adjust the max-width as needed
    width: 90%; // Change the width for mobile devices
    height: 85%; // Adjust the height for mobile devices
    border-radius: 0.7rem; // Remove border-radius for mobile devices if needed
    /* Add more mobile-specific styles as needed */
  }
`;

const DialogHeader = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #ebcf94;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

const Title = styled.div`
  padding: 1rem;
  width: 100%;
  align-items: center;
`;

interface modalProps {
  isOpen: Boolean;
  handleClose: MouseEventHandler;
  type: string;
  enrollment: Enrollment[];
  listTarget: Target[];
}

const DashboardModal: React.FC<modalProps> = (props) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [filterEnrollment, setFilterEnrollment] = useState<Enrollment[]>([]);
  const goal = props.listTarget.find((item) => item.type === props.type)?.goal;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const tempFilter = props.enrollment.filter(
      (enrollment) => enrollment.type === props.type
    );
    setFilterEnrollment(tempFilter);
    const total = tempFilter.reduce((acc, current) => {
      return (acc += current.total);
    }, 0);
    const animation = animate(count, total, {
      duration: 2.5,
      onUpdate: (latest) => {
        // Update displayValue during the animation
        setDisplayValue(latest);
      },
      onComplete: () => {
        const roundedValue = rounded.get();
        setDisplayValue(roundedValue);
        console.log("Rounded Value after animation:", rounded.get());
      },
    });

    return animation.stop;
  }, []);

  return createPortal(
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={bubble}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        <DialogHeader>
          <CloseButton
            colorScheme="orange"
            onClick={props.handleClose}
            size="md"
          />
        </DialogHeader>
        <div
          className="container flex-grow-1 w-100"
          style={{ backgroundColor: "white", overflow: "hidden" }}
        >
          <div className="row h-100">
            {filterEnrollment.length !== 0 && (
              <>
                <div className="col-md-4 h-100 bg-gray d-flex align-items-center justify-center">
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <strong>{getTitle(props.type)}</strong>
                    <motion.h3>
                      {displayValue.toFixed(0)}/{goal}
                    </motion.h3>
                    <p>Tín chỉ</p>
                  </div>
                </div>
                <div className="col-md-8 h-100 bg-gray py-5 px-2">
                  <StaggerCourseList
                    data={filterEnrollment}
                    type={props.type}
                  ></StaggerCourseList>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default DashboardModal;
