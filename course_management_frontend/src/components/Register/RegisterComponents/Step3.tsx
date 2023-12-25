import { Button, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useNumberInput } from "@chakra-ui/react"
import { CreditItem } from "./CreditItem"
import { Type } from "../../../model/TypeAndTotal"
import style from "../styles/Step3.module.css"
import { Target } from "../../../model/Target"


export const Step3: React.FC<{ creditTypeList: Target[], handleOnFinish: Function, handleOnChangeTotal:Function }> = (props) => {






    return (
        <div className="w-100 p-5">
            <div className="container">
                <h5 className="text-center">Sắp xong rồi ! Điền thông tin tín chỉ mục tiêu của bạn để bắt đầu trải nghiệm</h5>
                <div className="container w-75">
                    <ul className={`${style.listGroup} list-group`}>
                        {props.creditTypeList.map((item) => {
                            return (
                                <li className="list-group-item"><CreditItem data={item} handleOnChangeTotal={props.handleOnChangeTotal}></CreditItem>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="d-flex justify-content-center mt-1">
                    <button onClick={()=>{props.handleOnFinish()}} className="btn btn-primary w-75 h-25">FINISH</button>
                </div>
            </div>
        </div>
    )
}