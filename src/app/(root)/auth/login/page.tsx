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
import Logo from '@/public/images/Logo.jpg';

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
    ) {
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
      dispatch(loginStatus(res.data.rest));
      router.push(`/`);

    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Something went wrong");
        if (error.response?.data.message === "User already exists") {
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
        <div className="hidden lg:flex justify-center items-center px-5 lg:w-1/3 bg-white">
          <div>
            <div className="flex gap-3 items-center justify-center">
              <img src={Logo.src} alt="" className="w-12 h-12" />
              <h2 className="font-bold text-3xl text-primary">SLEEPANT</h2>
            </div>
            <div className="pt-3">
              <p className="text-2xl text-center text-secondary">Connect with friends and the world around on the sleepant</p>
            </div>
          </div>
        </div>
        <div className="bg-white py-10 px-20 shadow-md lg:w-1/3">
          <h2 className="pb-10 rounded text-center text-primary text-3xl font-semibold">
            LOGIN
          </h2>
          {error && <div className="pb-3 justify-center gap-2 text-red-500 flex items-center max-w-full"><IoWarningOutline />{error}</div>}
          <form className=" flex-col gap-2" onSubmit={handleSubmit}>
            <div className="mb-3 flex items-center border rounded">
              <label
                htmlFor="email"
                className="flex items-center p-2 text-secondary border-r-0 border border-secondary"
              >
                <MdEmail />
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                className="px-2 py-1 w-full outline-none border border-secondary"
              />
            </div>
            <div className="mb-3 flex items-center border border-third rounded">
              <label
                htmlFor="password"
                className="flex items-center p-2 text-secondary border-r-0 border border-secondary"
              >
                <RiLockPasswordFill />
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                className="px-2 py-1 w-full outline-none border border-secondary"
              />
            </div>
            <div className="mb-3">
              <div className="text-center">
                Don't have an account?{" "}
                <Link href="/auth/register" className="hover:underline">
                  Register
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="rounded py-2 w-full border border-primary bg-primary text-white hover:bg-white hover:text-primary font-semibold flex justify-center items-centerr"
              >
                {loading ? <BeatLoader /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
