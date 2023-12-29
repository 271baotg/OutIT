import { Button, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useNumberInput } from "@chakra-ui/react"
import { CreditItem } from "./CreditItem"
import { Type } from "../../../model/TypeAndTotal"
import style from "../styles/Step3.module.css"
import { Target } from "../../../model/Target"
import { FaLongArrowAltLeft } from "react-icons/fa"


export const Step3: React.FC<{
    creditTypeList: Target[],
    handleOnFinish: Function,
    handleOnChangeTotal: Function
    handleOnClickBack: Function
}> = (props) => {

    return (
        <div className="w-100 p-md-5 pt-0 pb-0 overflow-auto">
            {/* DESKTOP */}
            <div className="container d-none d-md-block">
                <h5 className="text-center">Sắp xong rồi ! Điền thông tin tín chỉ mục tiêu của bạn để bắt đầu trải nghiệm</h5>
                <div className="container w-75">
                    <ul className={`${style.listGroup} list-group overflow-x-hidden`}>
                        {props.creditTypeList.map((item) => {
                            return (
                                <li className="list-group-item p-1 pe-0 bg-transparent border-0"><CreditItem data={item} handleOnChangeTotal={props.handleOnChangeTotal}></CreditItem>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="d-none d-md-flex row justify-content-around mt-3">
                    <button onClick={() => (props.handleOnClickBack())} className="btn btn-secondary h-25 col-5"><FaLongArrowAltLeft size={30} className="d-inline-block" />&nbsp;BACK</button>
                    <button onClick={() => { props.handleOnFinish() }} className="btn btn-primary col-5 h-25">FINISH</button>
                </div>
            </div>
            {/* MOBILE */}
            <div className="container d-md-none">
                <h5 className="text-center">Sắp xong rồi ! Điền thông tin tín chỉ mục tiêu của bạn để bắt đầu trải nghiệm</h5>
                <div className="container w-100">
                    <ul className={`${style.listGroup} list-group overflow-x-hidden`}>
                        {props.creditTypeList.map((item) => {
                            return (
                                <li className="list-group-item p-1 bg-transparent border-0"><CreditItem data={item} handleOnChangeTotal={props.handleOnChangeTotal}></CreditItem>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="container d-flex flex-column align-items-center d-md-none ps-2 pe-2 mt-3">
                    <button onClick={() => { props.handleOnFinish() }} className="btn btn-primary d-block m-1 h-25 w-75">FINISH</button>
                    <button onClick={() => (props.handleOnClickBack())} className="btn btn-secondary d-block m-1 h-25 w-75"><FaLongArrowAltLeft size={30} className="d-inline" />&nbsp;BACK</button>
                </div>
            </div>
        </div>
    )
}