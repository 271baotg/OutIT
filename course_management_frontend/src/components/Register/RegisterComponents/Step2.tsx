import { FaLongArrowAltRight } from "react-icons/fa"

export const Step2: React.FC<{
    setStep:Function, 
    firstName:string, 
    lastName:string, 
    major: number,
    setFirstName: Function,
    setLastName: Function,
    setMajor: Function,
}> = (props) => {

    const handleOnFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>{
        props.setFirstName(e.target.value);
    }
    const handleOnLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>{
        props.setFirstName(e.target.value);
    }
    const handleOnMajorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const value = +e.target.value;
        console.log(value);
        props.setMajor(value);
        // switch (value) {
        //     case 0: {
        //         props.setMajor('KTPM');
        //         break;
        //     }
        //     case 1: {
        //         props.setMajor('HTTT');
        //         break;
        //     }
        //     case 2: {
        //         props.setMajor('KHMT');
        //         break;
        //     }
        //     case 3: {
        //         props.setMajor('KTMT');
        //         break;
        //     }
        //     case 4: {
        //         props.setMajor('TMDT');
        //         break;
        //     }
        //     case 5: {
        //         props.setMajor('KHDL');

        //         break;
        //     }
        //     case 6: {
        //         props.setMajor('MMT');
        //         break;
        //     }
        //     default : return;
        // }
    }

    const handleOnClickNext = () =>{
        props.setStep(3);
    }

    return (
        <div className="w-100 h-100 p-5">
            <div className="container">
                <h5 className="text-center">Hãy điền thêm chút thông tin</h5>
                <div className="input-group input-group-lg m-4">
                    <span className="input-group-text">Full name</span>
                    <input onChange={handleOnFirstNameChanged} value={props.firstName} type="text" placeholder="Enter first name" aria-label="First name" className="form-control" />
                    <input onChange={handleOnLastNameChanged} value={props.lastName} type="text" placeholder="Enter last name" aria-label="Last name" className="form-control" />
                </div>
                <div className="input-group input-group-lg m-4">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Major </label>
                    <select onChange={handleOnMajorChanged} className="form-select" id="inputGroupSelect01" value={props.major}>
                        <optgroup label="Chose your major">
                            <option value="0">KTPM</option>
                            <option value="1">HTTT</option>
                            <option value="2">KHMT</option>
                            <option value="3">KTMT</option>
                            <option value="4">TMDT</option>
                            <option value="5">KHDL</option>
                            <option value="6">MMT</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleOnClickNext} className="btn btn-primary w-75 h-25">NEXT     <FaLongArrowAltRight size={30} className="d-inline-block" /></button>
            </div>
        </div>
    )
}