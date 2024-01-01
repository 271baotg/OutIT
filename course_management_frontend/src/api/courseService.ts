import { AxiosInstance } from "axios";
import { Enrollment } from "../model/Enrollment";

export const loadAllCourse = async (axiosPrivate: AxiosInstance) => {
  try {
    const response: Course[] = await axiosPrivate({
      method: "get",
      url: "/course",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadAllEnrollment = async (username: any, axiosPrivate: any) => {
  try {
    const response = await axiosPrivate({
      url: "/enroll",
      method: "get",
      params: {
        username,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {}
};
