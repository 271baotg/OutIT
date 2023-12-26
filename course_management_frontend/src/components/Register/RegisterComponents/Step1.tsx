import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

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
    console.log("rerender");
    const handleOnClickNext = () => {
        props.setStep(2);
    }

    const handleOnUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        props.setUserName(e.target.value);
    }

    const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setEmail(event.target.value);
    }

    function handleOnChangePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        props.setPassword(event.target.value);
        
    }

    const handleOnChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>): void =>  {
        props.setConfirmPassword(event.target.value);
    }

    

    return (
        <div className="w-100 h-100 p-5">
            <div className="container">
                <h5 className="text-center">Hãy bắt đầu bằng MSSV và mật khẩu</h5>
                <div className="input-group input-group-lg m-4">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Username</span>
                    <input onChange={handleOnUserNameChange} type="text" name="username" value={props.username} placeholder="Enter username" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="input-group input-group-lg m-4">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                    <input onChange={handleOnChangeEmail} type="text" name="username" value={props.email} placeholder="Enter username" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="input-group input-group-lg m-4">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                    <input onChange={handleOnChangePassword} type="password" name="password" value={props.password} placeholder="Enter password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="input-group input-group-lg m-4">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Confirm password</span>
                    <input onChange={handleOnChangeConfirmPassword} type="password" name="confirmPassword" value={props.confirmPassword} placeholder="Re enter password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleOnClickNext} className="btn btn-primary w-75 h-25">NEXT     <FaLongArrowAltRight size={30} className="d-inline-block" /></button>
            </div>
        </div>
    )
}