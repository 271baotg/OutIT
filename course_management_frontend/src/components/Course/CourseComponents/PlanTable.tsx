/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "../styles/PlanTable.module.css";
import { Badge } from "@chakra-ui/react";
import PlanRow from "./PlanRow";

type componentprops = {
  data: Course[];
  planList: Course[];
  setPlanList: Dispatch<SetStateAction<Course[]>>;
};

const PlanTable: React.FC<componentprops> = (props) => {
  const typeChuyenNghiep: String[] = ["CN", "CSN", "CNTC", "CNCS", "CSNN"];

  useEffect(() => {
    const planListCodes = new Set(props.planList.map((item) => item.code));
    const newDataCodes = new Set(props.data.map((item) => item.code));

    //Remove the no-longer existing course from plan list
    const remainingList = props.planList.filter((item) =>
      newDataCodes.has(item.code)
    );

    //Get new course from selected list
    const newItemsInData = props.data.filter(
      (item) => !planListCodes.has(item.code)
    );
    const updatedPlanList = [...remainingList, ...newItemsInData];

    props.setPlanList(updatedPlanList);
  }, [props.data]);

  useEffect(() => {
    console.log("Plan list: " + JSON.stringify(props.planList));
  }, [props.planList]);

  const handleTypeChange = (code: string, newType: string) => {
    // Find the course in the planList and update its type
    const updatedPlanList = props.planList.map((course) =>
      course.code === code ? { ...course, type: newType } : course
    );
    props.setPlanList(updatedPlanList);
  };

  return (
    <div className={styles.plan_table_container}>
      <table className={styles.plan_table}>
        <thead>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.planList.map((course) => {
            return (
              <tr key={course.id}>
                <td className="px-2 p-2">
                  <div className="d-flex gap-2">
                    <div className={styles.tag}></div>
                    <div className="code">{course.code}</div>
                  </div>
                </td>
                <td className="px-2 p-2">
                  {!typeChuyenNghiep.includes(course.type) && (
                    <Badge colorScheme="green" className={styles.dropdown}>
                      <button type="button" aria-expanded="false">
                        {course.type}
                      </button>
                    </Badge>
                  )}
                  {typeChuyenNghiep.includes(course.type) && (
                    <PlanRow
                      data={course}
                      onTypeChange={(newType: string) =>
                        handleTypeChange(course.code, newType)
                      }
                    ></PlanRow>
                  )}
                </td>
                <td>{course.total}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
