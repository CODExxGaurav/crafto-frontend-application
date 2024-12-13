"use client";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./login.scss";
type LoginFormInputs = {
  username: string;
  otp: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const { token } = await loginUser(data);
      localStorage.setItem("authToken", token);
      router.push("/quotes");
    } catch (err) {
      setError(`Login failed. Please check your credentials ${err}`);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          required
        />
        <input type="text" placeholder="OTP" {...register("otp")} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
