"use client"

import React, { ChangeEvent, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import Link from "next/link";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoWarningOutline } from "react-icons/io5";
import { loginStatus } from "@/redux/user/userSlice";
import { login } from "@/services/AuthService";
import { useAppDispatch } from "@/redux/store";
import { BeatLoader } from "react-spinners";

export default function Login() {
  interface IFormData {
    email: string;
    password: string;
}

const [formData, setFormData] = useState<IFormData>({
  email: "",
  password: ""
});
const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

const router = useRouter();
const dispatch = useAppDispatch();

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (
    !formData.email ||
    !formData.password
    )
       {
      setError("All fields are required");
      setLoading(false);
      return;
  }

  try {
      const res = await login(formData.email, formData.password);

      if (res.status !== 200) {
          setLoading(false);
          setError(res.data.message || "Something went wrong");
          return;
      }

      setLoading(false);
      dispatch(loginStatus(res.data.userData));
      router.push(`/`);
      
  } catch (error) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || "Something went wrong");
          if(error.response?.data.message === "User already exists"){
              return;
          }
          return;
      } else {
          console.log("Unexpected error:", error);
          setError("An unexpected error occurred.");
      }
  }
};

  return (
    <>
      <div className="pt-10 flex justify-center w-full">
        <div className="bg-secondary py-10 px-20 shadow-md max-w-full">
          <h2 className="pb-10 rounded text-center text-primary text-3xl font-semibold">
            Login
          </h2>
          {error && <div className="pb-3 justify-center gap-2 text-red-500 flex items-center max-w-full"><IoWarningOutline />{error}</div>}
          <form className=" flex-col gap-2" onSubmit={handleSubmit}>
            <div className="mb-3 flex items-center border border-primary rounded">
              <label
                htmlFor="email"
                className="flex items-center p-2 bg-primary text-secondary border-r border-primary"
              >
                <MdEmail />
              </label>
              <input
              onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                className="px-2 py-1 w-full outline-none bg-transparent"
              />
            </div>
            <div className="mb-3 flex items-center border border-primary rounded">
              <label
                htmlFor="password"
                className="flex items-center p-2 bg-primary text-secondary border-r border-primary"
              >
                <RiLockPasswordFill />
              </label>
              <input
              onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                className="px-2 py-1 w-full outline-none bg-transparent"
              />
            </div>
            <div className="mb-3">
              <div>
                Don't have an account?{" "}
                <Link href="/auth/register" className="hover:underline">
                  Register
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="rounded py-2 w-full border border-primary bg-primary text-secondary hover:bg-transparent hover:text-primary font-semibold flex justify-center items-centerr"
              >
                {loading ? <BeatLoader /> : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
