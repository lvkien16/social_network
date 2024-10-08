"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { IoWarningOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Logo from '@/public/images/Logo.jpg';

export default function Register() {
    interface IFormData {
        name: string;
        email: string;
        password: string;
        confirmPassword?: string;
    }

    const [formData, setFormData] = useState<IFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required");
            setLoading(false);
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("/api/mailer/register", {
                email: formData.email,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                setLoading(false);
                setError(res.data.message || "Something went wrong");
                return router.push(`/auth/register/verify-email/${encodeURIComponent(formData.email)}`);
            }
            setLoading(false);

            const items = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            } as IFormData;

            localStorage.setItem("userInformation", JSON.stringify(items));

            router.push(`/auth/register/verify-email/${encodeURIComponent(formData.email)}`);

        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Something went wrong");
                if (error.response?.data.message === "User already exists") {
                    return;
                }
                return router.push(`/auth/register/verify-email/${encodeURIComponent(formData.email)}`);
            } else {
                console.log("Unexpected error:", error);
                setError("An unexpected error occurred.");
            }
        }
    };
    return (
        <>
            <div className="pt-10 flex justify-center w-full">
                <div className="hidden lg:flex justify-center items-center border-r px-5 lg:w-1/3 bg-white">
                    <div>
                        <div className="flex gap-3 items-center justify-center">
                            <img src={Logo.src} alt="" className="w-12 h-12" />
                            <h2 className="font-bold text-3xl text-primary">SLEEPANT</h2>
                        </div>
                        <div>
                            <p className="text-2xl text-center">Connect with friends and the world around on the sleepant</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-10 px-20 shadow-md lg:w-1/3">
                    <h2 className="pb-10 rounded text-center text-primary text-3xl font-semibold">
                        REGISTER
                    </h2>
                    {error && <div className="pb-3 justify-center gap-2 text-red-500 flex items-center max-w-full"><IoWarningOutline />{error}</div>}
                    <form className=" flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="mb-3 flex items-center rounded">
                            <label
                                htmlFor="name"
                                className="flex items-center p-2 text-secondary border-r-0 border border-secondary"
                            >
                                <FaUser />
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                placeholder="Name"
                                id="name"
                                className="px-2 py-1 w-full outline-none border border-secondary"
                            />
                        </div>
                        <div className="mb-3 flex items-center rounded">
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
                        <div className="mb-3 flex items-center rounded">
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
                        <div className="mb-3 flex items-center rounded">
                            <label
                                htmlFor="confirm-password"
                                className=" flex items-center p-2 text-secondary border-r-0 border border-secondary"
                            >
                                <RiLockPasswordFill />
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                id="confirm-password"
                                className="px-2 py-1 w-full outline-none border border-secondary"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="text-center">
                                Have an account?{" "}
                                <Link href="/auth/login" className="hover:underline">
                                    Login
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="rounded py-2 w-full border border-primary bg-primary text-white hover:bg-transparent hover:text-primary font-semibold flex justify-center items-centerr"
                            >
                                {loading ? <BeatLoader /> : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
