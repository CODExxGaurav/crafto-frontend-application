import Axios from "./index";

type LoginPayload = {
  username: string;
  otp: string;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await Axios.post("/login", data);
  return response.data;
};
