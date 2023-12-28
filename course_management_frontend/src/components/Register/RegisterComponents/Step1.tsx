import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { FaCheckCircle, FaLongArrowAltRight } from "react-icons/fa";
import { PasswordValidator, UsernameValidator, isEmalValid } from "../../../utils/Validation";
import { Tooltip } from "@chakra-ui/react";

export const Step1: React.FC<{
    setStep: Function,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    setUserName: Function,
    setPassword: Function,
    setConfirmPassword: Function,
    setEmail: Function
}> = (props) => {

    const passwordValidator = new PasswordValidator();
    const userNameValidator = new UsernameValidator();
    //UN = USERNAME
    const [isShowUNToolTip, setIsShowUNToolTip] = useState<boolean>(false);
    //PW = PASSWORD
    const [isShowPWToolTip, setIsShowPWToolTip] = useState<boolean>(false);
    const [isShowEmailToolTip, setIsShowEmailToolTip] = useState<boolean>(false);
    //CFPW = CONFIRM PASSWORD
    const [isShowCFPWToolTip, setIsShowCFPWToolTip] = useState<boolean>(false);


    const handleOnClickNext = () => {

        let canNext = true;

        if (props.username == '') {
            setIsShowUNToolTip(true);
            canNext = false;
        }
        if (props.password == '') {
            setIsShowPWToolTip(true);
            canNext = false;
        }
        if (props.email == '') {
            setIsShowEmailToolTip(true);
            canNext = false;

        }
        if (props.confirmPassword == '') {
            setIsShowCFPWToolTip(true);
            canNext = false;

        }

        if(isEmalValid(props.email) 
        && userNameValidator.isValid(props.username)
        && passwordValidator.isValid(props.password)
        && props.confirmPassword === props.password
        ) {
            canNext = true;
        } else{
            canNext = false;
        }

        if (canNext) {
            props.setStep(2);
        }
        return;
    }

    const handleOnUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsShowUNToolTip(false);
        props.setUserName(e.target.value);
    }

    const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsShowEmailToolTip(false);
        props.setEmail(event.target.value);
    }

    function handleOnChangePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setIsShowPWToolTip(false);
        props.setPassword(event.target.value);
    }

    const handleOnChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsShowCFPWToolTip(false);
        props.setConfirmPassword(event.target.value);
    }



    return (
        <div className="w-100 p-5 pt-0 pb-2">
            <div className="container">
                <h5 className="text-center">Hãy bắt đầu bằng MSSV và mật khẩu</h5>
                <div>
                    <Tooltip hasArrow placement="bottom-end" isOpen={isShowUNToolTip} label="This field can't be empty" bg='red.600'>
                        <div className="input-group input-group-md m-4 mt-0 mb-1">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Username</span>
                            <input onChange={handleOnUserNameChange} type="text" name="username" value={props.username} placeholder="Enter username (e.g. 2152xxxx)" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </Tooltip>

                    <p className="ms-5 mb-2">{userNameValidator.isValid(props.username) ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />
                    }
                        &nbsp;User phải có ít nhất 8 ký tự số</p>
                </div>
                <div>
                    <Tooltip hasArrow placement="bottom-end" isOpen={isShowEmailToolTip} label="This field can't be empty" bg='red.600'>
                        <div className="input-group input-group-md m-4 mt-0 mb-1">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                            <input onChange={handleOnChangeEmail} type="text" name="email" value={props.email} placeholder="Enter email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </Tooltip>
                    <p className="ms-5 mb-2">
                        {isEmalValid(props.email) ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />}
                        &nbsp;Email phải là email thực
                    </p>
                </div>
                <div>
                    <Tooltip hasArrow placement="bottom-end" isOpen={isShowPWToolTip} label="This field can't be empty" bg='red.600'>
                        <div className="input-group input-group-md m-4 mt-0 mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                            <input onChange={handleOnChangePassword} type="password" name="password" value={props.password} placeholder="Enter password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </Tooltip>
                    <p className="ms-5 mb-2">
                        {passwordValidator.isLongEnough(props.password) ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />}
                        &nbsp; Mật khẩu phải có ít nhất 8 ký tự
                    </p>
                    <p className="ms-5 mb-2">
                        {passwordValidator.isContainerNumber(props.password) ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />}
                        &nbsp; Mật khẩu phải có ít nhất 1 chữ số
                    </p>
                    <p className="ms-5 mb-2">
                        {passwordValidator.isContaineSpecialCharacter(props.password) ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />}
                        &nbsp; Mật khẩu phải có ít nhất 1 ký tự đặc biệt (e.g. @#$&...)
                    </p>
                </div>
                <div>
                    <Tooltip hasArrow placement="bottom-end" isOpen={isShowCFPWToolTip} label="This field can't be empty" bg='red.600'>
                        <div className="input-group input-group-md m-4 mt-0 mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Confirm password</span>
                            <input onChange={handleOnChangeConfirmPassword} type="password" name="confirmPassword" value={props.confirmPassword} placeholder="Re enter password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </Tooltip>
                    <p className="ms-5 mb-2">
                        {props.confirmPassword === props.password && props.confirmPassword != '' ? <FaCheckCircle className="d-inline text-success" /> : <MdError className="d-inline text-danger" />}
                        &nbsp; Mật khẩu xác nhận phải có trùng với mật khẩu đã nhập                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleOnClickNext} className="btn btn-primary h-25 w-75">NEXT     <FaLongArrowAltRight size={30} className="d-inline-block" /></button>
            </div>
        </div>
    )
}