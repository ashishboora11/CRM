"use client"
import Image from "next/image";
import React, { useState } from "react";
import { HidePassIcon, ShowPassIcon } from "../components/Icon/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"

interface LoginUserType {
    email: string,
    password: string,
}

export default function page() {
    
    const router = useRouter()
    const [error, setError] = useState<any>(null);
    const [showpassword, setShowPassword] = useState<boolean>(false);
    const [loginuser, setLoginUser] = useState<LoginUserType>({
        email: "",
        password: "",
    });

    const onhandelchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError(null);
        setLoginUser({ ...loginuser, [name]: value });
    };

    const onhandelsumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = localStorage.getItem("credentials")
        const convercredentials = credentials ? JSON.parse(credentials) : null
        if (convercredentials === null) setError("Your Account Not Found")
        else if ((loginuser.email !== convercredentials?.email) || (loginuser.password !== convercredentials?.password)) setError("Somthing Went Wrong")
        else {
            setLoginUser({
                email: "",
                password: "",
            })
            localStorage.setItem("userlogin", "true")
            router.push("/dashboard")
        }

    };

    return (
        <div className=" h-screen flex justify-center items-center">
            <div className="container px-3 mx-auto  relative z-30">
                <h1 className="text-[20px] lg:text-[34px] font-medium text-center">Login Your Account</h1>
                <div className="flex items-center justify-center mt-4">
                    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 pb-[30px] sm:py-[30px]">
                        <form onSubmit={onhandelsumit}>
                            <div className="flex items-center gap-3 rounded-[10px] px-5 bg-[#F4F4F4]">
                                <input
                                    type="email"
                                    required
                                    value={loginuser.email}
                                    name="email"
                                    onChange={onhandelchange}
                                    placeholder="Enter your Email ID"
                                    className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base  placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px] outline-none "
                                />
                                <p className=" text-2xl font-normal text-[#7a7a7a]">@</p>
                            </div>
                            <div className="flex items-center gap-3 rounded-[10px] bg-[#F4F4F4] px-5 mt-4  sm:mt-[30px]">
                                <input
                                    type={!showpassword ? "password" : "text"}
                                    required
                                    value={loginuser.password}
                                    name="password"
                                    onChange={onhandelchange}
                                    placeholder="Enter your Password"
                                    className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base  placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px]  outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showpassword)}
                                >
                                    {showpassword ? <ShowPassIcon /> : <HidePassIcon />}
                                </button>
                            </div>
                            <div className="flex items-center justify-between mt-4 sm:mt-[30px]">
                                <div className="flex items-center">
                                    <input
                                        id="saveLogin"
                                        className="accent-[#E77A3F]"
                                        type="checkbox"
                                    />

                                    <label
                                        htmlFor="saveLogin"
                                        className="text-base font-normal text-black ms-2.5"
                                    >
                                        Save Login
                                    </label>
                                </div>
                                <div>
                                    <Link
                                        href={"/forgot-password"}
                                        type="button"
                                        className="font-medium text-base text-black"
                                    >
                                        Forgot password ?
                                    </Link>
                                </div>
                            </div>
                            <div className=" mt-2">
                                {error && (
                                    <p className=" text-red-400 font-normal text-xs text-center capitalize">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="text-white text-sm sm:text-base font-medium py-2 sm:py-[14px] w-full bg-[#E77A3F] mt-4 sm:mt-[30px] rounded-[10px]"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => signIn("google")}
                                className="text-white text-sm sm:text-base font-medium py-2 sm:py-[14px] w-full bg-[#E77A3F] mt-4 sm:mt-[30px] rounded-[10px]"
                            >
                                Login with Google
                            </button>
                            <p className="font-normal text-lg text-black text-center mt-4 sm:mt-[30px]">
                                If have not any account ?{" "}
                                <Link href={"/sign-up"}
                                    className="font-bold"
                                    type="button"
                                >
                                    Create Account
                                </Link>{" "}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
