"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
function Page() {
    const router = useRouter();
    const [error, setError] = useState<any>(null);
    const [emailmsg, setEmailmsg] = useState<string>("");


    const onhandelsumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailmsg }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "forget-password failed");
                return;
            }
            else {
                setEmailmsg("")
                alert("check your gmail")
                router.push("/login")
            }

        } catch (error) {
            console.error("Error forget-password user:", error);
            setError("Something went wrong. Please try again.");
        }

    };


    return (
        <div className=' h-screen flex justify-center items-center'>
            <div className="container px-3 mx-auto">
                <div className="flex items-center justify-center">
                    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 pb-[30px] sm:py-[30px]">
                        <h3 className="text-[20px] lg:text-[34px] font-medium text-center">
                            Forget your Password !
                        </h3>
                        <p className=" text-base font-normal text-black opacity-60 mt-[30px] text-center">
                            please enter your email so we can provide you code to
                            reset your password .
                        </p>
                        <form onSubmit={onhandelsumit} className=" mt-[30px]">
                            <div className="flex items-center gap-3 rounded-[10px] px-5 bg-[#F4F4F4]">
                                <input
                                    type="email"
                                    required
                                    value={emailmsg}
                                    name="emailmsg"
                                    onChange={(e) => (setEmailmsg(e.target.value), setError(null))}
                                    placeholder="Enter your Email ID"
                                    className="w-full rounded-[10px] text-black text-sm font-normal sm:placeholder:text-base placeholder:text-black placeholder:font-normal placeholder:text-sm sm:text-base bg-[#F4F4F4] py-[13px] outline-none"
                                />
                                <p className=" text-2xl font-normal text-[#7a7a7a]">@</p>
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
                                className="text-white text-sm cursor-pointer sm:text-base font-medium py-2 sm:py-[14px] w-full bg-[#E77A3F] mt-4 sm:mt-[30px] rounded-[10px]"
                            >
                                Send Password Reset Link {`>`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page