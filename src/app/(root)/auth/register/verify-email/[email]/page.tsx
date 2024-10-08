"use client"

import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams  } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const { email } = useParams() as { email: string };

    const router = useRouter();

    const resendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/mailer/register", {
                email: decodeURIComponent(email),
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                setLoading(false);
                toast.error(res.data.message);
                return ;
            }
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong");
            } else {
                console.log("Unexpected error:", error);
                toast.error("An unexpected error occurred.");
            }
        }
    }

    useEffect(() => {
        if(otp.length === 4){
            const register = async () => {
                const userInformation = localStorage.getItem("userInformation");
                try {
                    const res = await axios.post("/api/auth/register", {
                        ...JSON.parse(userInformation || '{}'),
                        otp,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if(res.status !== 201){
                        toast.error(res.data.message);
                        return ;
                    }

                    router.push("/auth/login");
                    toast.success("User created successfully");

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        toast.error(error.response?.data.message || "Something went wrong");
                    } else {
                        console.log("Unexpected error:", error);
                        toast.error("An unexpected error occurred.");
                    }
                }
            }
            register();
        }

    }, [otp])

    return (
        <div className="pt-10 flex justify-center">
            <div className="bg-white pb-10 px-20 shadow-md max-w-full">
                <h2 className="py-10 rounded text-center text-primary text-3xl font-semibold">
                    VERIFY YOUR EMAIL
                </h2>
                <div className="pb-3">
                    <p className="text-center">Enter the verification code send to your email:</p>
                </div>
                <form className="flex-col gap-2" onSubmit={resendCode}>
                    <div className="flex justify-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                width: '40px',
                                height: '40px',
                                fontSize: '24px',
                                margin: '0 5px',
                                textAlign: 'center',
                                border: '2px solid #ddd',
                                borderRadius: '5px',
                                color: '#3795BD'
                            }}
                        />
                    </div>
                    <div className="pt-3">
                        <div className="pb-3">
                            <p className="text-center">Didn't recive the code?</p>
                        </div>
                        <button
                            type="submit"
                            className="rounded py-2 w-full border border-primary bg-primary text-white hover:bg-transparent hover:text-primary font-semibold flex justify-center items-centerr"
                        >
                            {loading ? <BeatLoader /> : "Resend Code"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
