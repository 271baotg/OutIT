import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";
import ConstraintSlider from "./DashboardComponents/ConstraintSlider";
import { useAxiosPrivate } from "../../hooks/useAxiosHook";
import { Enrollment } from "../../model/Enrollment";
import AuthContext from "../../auth/AuthProvider";
import { Target } from "../../model/Target";
import { Type } from "../../model/TypeAndTotal";
import EnrollmentTable from "./DashboardComponents/EnrollmentTable";
import DonutChart from "./DashboardComponents/DonutChart";
import { AnimatePresence } from "framer-motion";
import DashboardModal from "./DashboardComponents/DashboardModal";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  min-height: calc(100vh - 83.5px);
  margin-left: 10rem;
  padding: 2rem;
  transition: var(--transition-speed) ease-out;
  background-color: #ebcf94;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const ConstraintWidget = styled.div``;

const TableWrapper = styled.div`
  height: 50vh;
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
`;

const TotalWrapper = styled.div`
  height: 50vh;
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
`;

const ScrollableDiv = styled.div`
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

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const { auth } = useContext(AuthContext);
  const [listTarget, setListTarget] = useState<Target[]>([]);
  const [allEnrollment, setAllEnrollment] = useState<Enrollment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleModal = () => {
    setModalOpen(true);
  };

  //Get All Enrollment
  const loadEnrollment = async () => {
    try {
      const response: Enrollment[] = await axiosPrivate({
        url: "/enroll",
        method: "get",
        params: {
          username: auth?.username,
        },
      });

      setAllEnrollment(response);
    } catch (error) { }
  };

  const loadTarget = async () => {
    try {
      const response: Target[] = await axiosPrivate({
        url: "/students/target",
        method: "get",
        params: {
          username: auth?.username,
        },
      });
      setListTarget(response);
      console.log(`Target: ${JSON.stringify(response)}`);
    } catch (error) { }
  };

  useEffect(() => {
    loadTarget();
    loadEnrollment();
  }, []);

  // useEffect(() => {
  //   console.log(allEnrollment);
  //   const tempList: Type[] = allEnrollment.reduce(
  //     (result: Type[], enrollment) => {
  //       // Check if there is an existing Type with the same 'type'
  //       const existingType = result.find(
  //         (item) => item.type === enrollment.type
  //       );

  //       if (existingType) {
  //         // If the Type already exists, update its 'total'
  //         existingType.total += enrollment.total;
  //       } else {
  //         // If the Type doesn't exist, create a new Type and push it to the result array
  //         result.push({ type: enrollment.type, total: enrollment.total });
  //       }

  //       return result;
  //     },
  //     []
  //   );
  //   setListType(tempList);
  // }, [allEnrollment]);

  useEffect(() => {
    console.log("List Target: " + JSON.stringify(listTarget));
  }, [listTarget]);

  function handleOnClickGoToCourse(): void {
    nav('/course');
  }

  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen && (
          <DashboardModal
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
            type={selectedType}
            enrollment={allEnrollment}
            listTarget={listTarget}
          />
        )}
      </AnimatePresence>

      <Content>
        <ConstraintWidget className="row">
          <ConstraintSlider
            data={listTarget}
            handleModal={handleModal}
            setSelectedType={setSelectedType}
          />
        </ConstraintWidget>
        <div className="row" style={{ marginTop: "1rem", padding: "8px" }}>
          <div className="col-md-9 mb-2 mb-md-0 ">
            <TableWrapper className="container rounded bg-white pt-3 pb-4">
              <strong style={{ fontWeight: "medium" }}>
                Danh sách môn đã đăng kí
              </strong>
              <ScrollableDiv>
                <EnrollmentTable data={allEnrollment} />
              </ScrollableDiv>
              {allEnrollment.length <= 0 &&
                <div className="h-100 flex-column d-flex justify-content-center align-items-center">
                  <h4><strong></strong>Bạn chưa đăng ký môn nào hết, xin vui lòng chuyển sang <strong><i><span role="button" onClick={handleOnClickGoToCourse}>Course</span></i></strong> để đăng ký</h4>
                  <button onClick={handleOnClickGoToCourse} className="btn btn-primary m-4 w-50 fs-5" style={{ height: '15%' }}>Đi tới Course</button>
                </div>}
            </TableWrapper>
          </div>
          <div className="col-md-3 order-md-1">
            <TotalWrapper className="container rounded bg-white pt-3 pb-4">
              <strong style={{ fontWeight: "medium" }}>Tổng tiến độ</strong>
              <ScrollableDiv>
                <DonutChart
                  listEnroll={allEnrollment}
                  listTarget={listTarget}
                />
              </ScrollableDiv>
            </TotalWrapper>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;
