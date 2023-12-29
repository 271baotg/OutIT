import instance from "./axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await instance({
      method: "post",
      url: "/auth/login",
      data: {
        username: username,
        password: password,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
