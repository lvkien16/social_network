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

export default function page() {
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
                if(error.response?.data.message === "User already exists"){
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
                <div className="bg-secondary py-10 px-20 shadow-md max-w-full">
                    <h2 className="pb-10 rounded text-center text-primary text-3xl font-semibold">
                        Register
                    </h2>
                    {error && <div className="pb-3 justify-center gap-2 text-red-500 flex items-center max-w-full"><IoWarningOutline />{error}</div>}
                    <form className=" flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="mb-3 flex items-center border border-primary rounded">
                            <label
                                htmlFor="name"
                                className="flex items-center p-2 bg-primary text-secondary border-r border-primary"
                            >
                                <FaUser />
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                placeholder="Name"
                                id="name"
                                className="px-2 py-1 w-full outline-none bg-transparent"
                            />
                        </div>
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
                        <div className="mb-3 flex items-center border border-primary rounded">
                            <label
                                htmlFor="confirm-password"
                                className=" flex items-center p-2 bg-primary text-secondary border-r border-primary"
                            >
                                <RiLockPasswordFill />
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                id="confirm-password"
                                className="px-2 py-1 w-full outline-none bg-transparent"
                            />
                        </div>
                        <div className="mb-3">
                            <div>
                                Have an account?{" "}
                                <Link href="/auth/login" className="hover:underline">
                                    Log in
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="rounded py-2 w-full border border-primary bg-primary text-secondary hover:bg-transparent hover:text-primary font-semibold flex justify-center items-centerr"
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
