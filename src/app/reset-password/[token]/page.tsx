"use client";
import React, { useEffect, useState } from "react";
import { HidePassIcon, ShowPassIcon } from "../../components/Icon/Icon";
import { useParams, useRouter } from "next/navigation";
function Page() {
  const { token } = useParams();
  const [error, setError] = useState<string>("");
  const [resetpassword, setResetPassword] = useState<string>("");
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [userdata, setUserData] = useState<any>(null);
  const router = useRouter();

  //////////////////////////   check verify token is valid or not        ////////////////////////

  useEffect(() => {
    const checkverifiedtoken = async () => {
      try {
        const res = await fetch(
          `/api/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "forget-password failed");
        } else {
          setResetPassword("");
          setError("");
          setUserData(data.message);
        }
      } catch (error) {
        console.error("Error forget-password user:", error);
        setError("Something went wrong. Please try again.");
      }
    };

    checkverifiedtoken();
  }, [token]);

  //////////////////////////   reset the password        ////////////////////////

  const onhandelsumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      resetpassword.length < 8 ||
      !/[A-Z]/.test(resetpassword) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(resetpassword)
    ) {
      setError(
        "Password must be at least 8 characters long and contain at least one one uppercase letter, one special character."
      );
    } else {
      try {
        const res = await fetch(
          `/api/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: resetpassword,
              email: userdata.email,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "forget-password failed");
        } else {
          setResetPassword("");
          setError("");
          alert("Password Changed Successfully");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error forget-password user:", error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="container px-3 mx-auto">
        <div className="flex items-center justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 pb-[30px] sm:py-[30px]">
            <h3 className="text-[20px] lg:text-[34px] font-medium text-center">
              Reset your Password !
            </h3>
            <p className=" text-base font-normal text-black opacity-60 mt-[30px] text-center">
              please enter your new pssword so we can provide you code to reset
              your password .
            </p>
            <form onSubmit={onhandelsumit} className=" mt-[30px]">
              <div className="flex items-center gap-3 rounded-[10px] px-5 bg-[#F4F4F4]">
                <input
                  type={!showpassword ? "password" : "text"}
                  required
                  value={resetpassword}
                  name="resetpassword"
                  onChange={(e) => (
                    setResetPassword(e.target.value), setError("")
                  )}
                  placeholder="Enter your New Password"
                  className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base placeholder:text-black placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? <ShowPassIcon /> : <HidePassIcon />}
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
                disabled={error ? true : false}
                type="submit"
                className={`text-white text-sm bg-[#E77A3F] sm:text-base font-medium py-2 sm:py-[14px] w-full  mt-4 sm:mt-[30px] rounded-[10px]`}
              >
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
