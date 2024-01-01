import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export const Step2: React.FC<{
  setStep: Function;
  firstName: string;
  lastName: string;
  major: number;
  setFirstName: Function;
  setLastName: Function;
  setMajor: Function;
  handleOnClickBack: Function;
}> = (props) => {
  //FN = FIRST NAME
  const [isShowFNTooltip, setIsShowFNTooltip] = useState<boolean>(false);
  //LN = LAST NAME
  const [isShowLNToolTip, setIsShowLNTooltip] = useState<boolean>(false);

  const handleOnFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowFNTooltip(false);
    props.setFirstName(e.target.value);
  };
  const handleOnLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowLNTooltip(false);
    props.setLastName(e.target.value);
  };
  const handleOnMajorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    props.setMajor(value);
  };

  const handleOnClickNext = () => {
    let canNext = true;
    if (props.lastName == "") {
      setIsShowLNTooltip(true);
      canNext = false;
    }
    if (props.firstName == "") {
      setIsShowFNTooltip(true);
      canNext = false;
    }
    if (canNext) {
      props.setStep(3);
    }
  };

  return (
    <div className="w-100 p-5 pt-0">
      <div className="container">
        <h5 className="text-center">Hãy điền thêm chút thông tin</h5>
        <div className="input-group input-group-md m-4">
          <span className="input-group-text">Full name</span>
          <Tooltip
            hasArrow
            placement="bottom-end"
            isOpen={isShowFNTooltip}
            label="This field can't be empty"
            bg="red.600"
          >
            <input
              onChange={handleOnFirstNameChanged}
              value={props.firstName}
              type="text"
              placeholder="Enter first name"
              aria-label="First name"
              className="form-control"
            />
          </Tooltip>
          <Tooltip
            hasArrow
            placement="bottom-end"
            isOpen={isShowLNToolTip}
            label="This field can't be empty"
            bg="red.600"
          >
            <input
              onChange={handleOnLastNameChanged}
              value={props.lastName}
              type="text"
              placeholder="Enter last name"
              aria-label="Last name"
              className="form-control"
            />
          </Tooltip>
        </div>
        <div className="input-group input-group-md m-4">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Major{" "}
          </label>
          <select
            onChange={handleOnMajorChanged}
            className="form-select"
            id="inputGroupSelect01"
            value={props.major}
          >
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
      <div className="row justify-content-around">
        <button
          onClick={() => props.handleOnClickBack()}
          className="btn btn-secondary h-25 col-5"
        >
          <FaLongArrowAltLeft size={30} className="d-inline-block" />
          &nbsp;BACK
        </button>
        <button
          onClick={handleOnClickNext}
          className="btn btn-primary h-25 col-5"
        >
          NEXT&nbsp;
          <FaLongArrowAltRight size={30} className="d-inline-block" />
        </button>
      </div>
    </div>
  );
};
