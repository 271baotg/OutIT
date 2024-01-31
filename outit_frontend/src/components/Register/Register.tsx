import { useEffect, useState } from "react";
import styled from "styled-components";
import { Step1 } from "./RegisterComponents/Step1";
import { Step2 } from "./RegisterComponents/Step2";
import { Step3 } from "./RegisterComponents/Step3";
import style from "./styles/Register.module.css";
import {
  TbRosetteNumber1,
  TbRosetteNumber2,
  TbRosetteNumber3,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Target } from "../../model/Target";
import RegisterDataModel from "../../model/RegisterDataModel";
import { useAxiosPrivate } from "../../hooks/useAxiosHook";
import { PiPersonSimpleRunFill } from "react-icons/pi";

type RegisterResponse = {
  token: string;
};

const Wrapper = styled.div`
  height: calc(100vh - 85px);
`;

type RegisterInformation = {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  className: string;
};

const INIT_CREDIT: Target[] = [
  { type: "CĐTN", total: 0, goal: 0 },
  { type: "CN", total: 0, goal: 0 },
  { type: "CSN", total: 0, goal: 0 },
  { type: "CSNN", total: 0, goal: 0 },
  { type: "ĐA", total: 0, goal: 0 },
  { type: "ĐC", total: 0, goal: 0 },
  { type: "TTTN", total: 0, goal: 0 },
  { type: "CNTC", total: 0, goal: 0 },
  { type: "KLTN", total: 0, goal: 0 },
  { type: "NN", total: 0, goal: 0 },
];

export const Register: React.FC<{}> = () => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [major, setMajor] = useState<number>(0);
  const [creditTypeList, setCreditTypeList] = useState<Target[]>(INIT_CREDIT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const [isOpenFailModal, setIsOpenFailModal] = useState<boolean>(false);
  const [isSuccessRegister, setIsSuccessRegiser] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    switch (isSuccessRegister) {
      case true: {
        setIsOpenSuccessModal(true);
        break;
      }
      case false: {
        setIsOpenFailModal(true);
        break;
      }
    }
  }, [isSuccessRegister]);

  const handleOnClickSignIn = () => {
    navigate("/login");
  };

  const handleOnClickBack = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleOnChangeCreditTotal = (type: string, total: number) => {
    const tempList = creditTypeList.map((item) => {
      if (item.type === type) {
        return { ...item, goal: total };
      }
      return item;
    });

    setCreditTypeList(tempList);
  };
  const handleOnFinish = async () => {
    setIsLoading(true);

    let dataMajor = "";

    switch (major) {
      case 0: {
        dataMajor = "KTPM";
        break;
      }
      case 1: {
        dataMajor = "HTTT";
        break;
      }
      case 2: {
        dataMajor = "KHMT";
        break;
      }
      case 3: {
        dataMajor = "KTMT";
        break;
      }
      case 4: {
        dataMajor = "TMDT";
        break;
      }
      case 5: {
        dataMajor = "KHDL";

        break;
      }
      case 6: {
        dataMajor = "MMT";
        break;
      }
      default:
        return;
    }
    const data = new RegisterDataModel(
      username,
      password,
      email,
      `${firstName} ${lastName}`,
      dataMajor,
      creditTypeList
    );
    try {
      const url = "/auth/register";
      axios
        .post<RegisterResponse>(url, data)
        .then((res) => {
          const regRes: RegisterResponse = res as unknown as RegisterResponse;
          setIsSuccessRegiser(true);
        })
        .catch((e) => {
          setIsOpenFailModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {}
  };

  const renderRightSideContent = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Step1
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            email={email}
            setStep={setCurrentStep}
            setUserName={setUserName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
        break;
      }
      case 2:
        return (
          <Step2
            setStep={setCurrentStep}
            firstName={firstName}
            lastName={lastName}
            major={major}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setMajor={setMajor}
            handleOnClickBack={handleOnClickBack}
          />
        );
        break;

      case 3:
        return (
          <Step3
            handleOnChangeTotal={handleOnChangeCreditTotal}
            handleOnFinish={handleOnFinish}
            creditTypeList={creditTypeList}
            handleOnClickSignin={handleOnClickSignIn}
            handleOnClickBack={handleOnClickBack}
            isLoading={isLoading}
            isOpenSuccessModal={isOpenSuccessModal}
            onCloseSuccessModal={() => {
              setIsOpenSuccessModal(false);
            }}
            isOpenFailModal={isOpenFailModal}
            onCloseFailModal={() => {
              setIsOpenFailModal(false);
            }}
            setStep={setCurrentStep}
            setIsSuccessRegister={setIsSuccessRegiser}
          />
        );

      default:
        return (
          <div>
            <h1>Error</h1>
          </div>
        );
    }
  };

  return (
    <>
      <Wrapper>
        <div
          className="card container-fluid"
          style={{ backgroundColor: "var(--main-color)", height: "100%" }}
        >
          <div className="row" style={{ height: "100%", overflow: "auto" }}>
            <div className={`${style.leftSide} col-3 bg-info`}>
              <h1 className="mb-0">
                Out<span style={{ color: "var(--button-color)" }}>IT</span>
                <PiPersonSimpleRunFill size={28} className="d-inline" />
              </h1>

              <div className=" d-flex justify-content-center flex-column mt-5">
                <h1 className="d-block">ALREADY HAVE AN ACCOUNT?</h1>
                <p>
                  To keep track on your dashboard please login with your
                  personal info
                </p>
                <button
                  onClick={handleOnClickSignIn}
                  className="btn btn-outline-light"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="col-9">
              <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                {/* <div className="w-100 mt-1">
                                    <FaArrowLeft className={`${style.backButton} ${currentStep === 1 ? "d-none" : ""}`} role="button" size={40} onClick={handleOnClickBack} />
                                </div> */}
                <h1 className="text-primary">
                  <b>ĐĂNG KÝ</b>
                </h1>
                <div className="container-fluid">
                  <div className="row justify-content-center p-1 ">
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                      <p>LOGIN INFO</p>
                      <TbRosetteNumber1
                        size={50}
                        color={currentStep === 1 ? "blue" : "black"}
                      />
                    </div>
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                      <p>PERSONAL INFO</p>
                      <TbRosetteNumber2
                        size={50}
                        color={currentStep === 2 ? "blue" : "black"}
                      />
                    </div>
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                      <p>LOGIN INFO</p>
                      <TbRosetteNumber3
                        size={50}
                        color={currentStep === 3 ? "blue" : "black"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">{renderRightSideContent()}</div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
