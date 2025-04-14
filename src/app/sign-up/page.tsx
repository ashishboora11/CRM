"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HidePassIcon, ShowPassIcon } from "../components/Icon/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignUpUserType {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export default function page() {
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [confirmshowpassword, setConfirmShowPassword] =
    useState<boolean>(false);
  const [signupuser, setSignUpUser] = useState<SignUpUserType>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const onhandelchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSignUpUser({ ...signupuser, [name]: value });
  };

  const onhandelsumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (signupuser.password.length < 8  || !/[A-Z]/.test(signupuser.password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(signupuser.password)) {
      setError("Password must be at least 8 characters long and contain at least one one uppercase letter, one special character.");
    }
    else if (signupuser.password !== signupuser.confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupuser),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Registration failed");
          return;
        }
        localStorage.setItem("userlogin", "true");
        setSignUpUser({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        router.push("/dashboard");

      } catch (error) {
        console.error("Error registering user:", error);
        setError("Something went wrong. Please try again.");
      }
 }
  };


  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="container px-3 mx-auto  relative z-30">
        <h1 className="text-[20px] lg:text-[34px] font-medium text-center">
          Create Your Account
        </h1>
        <div className="flex items-center justify-center mt-4">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 pb-[30px] sm:py-[30px]">
            <form onSubmit={onhandelsumit}>
              <div className="flex items-center gap-3 rounded-[10px] px-5 bg-[#F4F4F4]">
                <input
                  type="text"
                  required
                  value={signupuser.name}
                  name="name"
                  onChange={onhandelchange}
                  placeholder="Enter your Name"
                  className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base  placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px] outline-none "
                />
              </div>
              <div className="flex items-center gap-3 mt-4 rounded-[10px] px-5 bg-[#F4F4F4] sm:mt-[30px]">
                <input
                  type="email"
                  required
                  value={signupuser.email}
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
                  value={signupuser.password}
                  name="password"
                  onChange={onhandelchange}
                  placeholder="Enter Your Password"
                  className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base  placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px]  outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? <ShowPassIcon /> : <HidePassIcon />}
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-[10px] bg-[#F4F4F4] px-5 mt-4  sm:mt-[30px]">
                <input
                  type={!confirmshowpassword ? "password" : "text"}
                  required
                  value={signupuser.confirmpassword}
                  name="confirmpassword"
                  onChange={onhandelchange}
                  placeholder="Enter Your Confirm Password"
                  className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base  placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px]  outline-none"
                />
                <button
                  type="button"
                  onClick={() => setConfirmShowPassword(!confirmshowpassword)}
                >
                  {confirmshowpassword ? <ShowPassIcon /> : <HidePassIcon />}
                </button>
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
                Sign Up
              </button>
              <p className="font-normal text-lg text-black text-center mt-4 sm:mt-[30px]">
                If have any account ?{" "}
                <Link href={"/login"} className="font-bold" type="button">
                  Login Account
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
