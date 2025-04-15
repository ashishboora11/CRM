"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/Common/Sidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TopBar from "../components/Common/TopBar";

function layout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //////////////////////////   check user login  or not        ////////////////////////

  useEffect(() => {
    const localstorage = localStorage.getItem("userlogin");
    if (localstorage === "true") {
      if (pathname.startsWith("/dashboard")) {
        router.push(`${id ? `${pathname}?id=${id}` : pathname} `);
      } else {
        router.push("/dashboard");
      }
    } else router.push("/login");
  }, []);
  return (
    <div className="flex h-screen">
      <div className="sticky top-0 left-0 max-w-[400px] w-[400px] bg-gray-800 text-white py-4  z-50">
        <Sidebar />
      </div>
      <div className="flex flex-col grow">
        <header className="bg-gray-800 text-white py-4 px-4 shadow-md sticky top-0 z-10">
          <TopBar />
        </header>
        <main className="flex-1 bg-gray-100 p-5 h-screen overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default layout;
