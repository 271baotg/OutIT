import { Button, Input } from "@chakra-ui/react"
import { Target } from "../../../model/Target"
import { getTitle, getTypeColor } from "../../../hooks/getTypeColor";

export const CreditItem: React.FC<{handleOnChangeTotal:Function, data: Target}> = (props) => {

    

    const handleOnDecreaseGoal = () =>{
        if(props.data.goal === 0){
            return;
        }
        props.handleOnChangeTotal(props.data.type, props.data.goal - 1);
    }

    const handleOnChangeInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const value = +event.target.value;
        
        props.handleOnChangeTotal(props.data.type, value);
    }



    return (
        <div className="card p-1 ps-4">
            <div className="row">
                <div className="col-4  fs-5 text-star d-flex align-items-center text-bold fw-bolder" style={{color: getTypeColor(props.data.type)}} >{getTitle(props.data.type)}</div>
                <div className="col-8">
                    <div className="text-end">
                        <Button className="me-1" size='sm' onClick={() => {props.handleOnChangeTotal(props.data.type, props.data.goal + 1)}} >+</Button>
                        <Input onChange={handleOnChangeInput} defaultValue={0} value={props.data.goal} className="me-1" fontWeight={'bold'} textAlign={'center'} maxWidth='50px' size='sm' type="number" />
                        <Button  size='sm' onClick={handleOnDecreaseGoal}>-</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}