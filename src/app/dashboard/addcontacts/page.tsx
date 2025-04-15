"use client";
import { AddCustomBlackDot, BackArrowIcon } from "@/app/components/Icon/Icon";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

interface Contact {
  Name: string;
  Mobile: string;
  Business: string;
  Email_Address: string;
  Address1: string;
  status: any;
}

const page = () => {
  const [error, setError] = useState<any>("");
  const [inputdata, setInputdata] = useState<Contact>({
    Name: "",
    Mobile: "",
    Business: "",
    Email_Address: "",
    Address1: "",
    status: null,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //////////////////////////   get customer for update       ////////////////////////

  useEffect(() => {
    async function GetContacts() {
      try {
        const getdata = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts/${id}`);
        const convertjson = await getdata.json();
        const { Address1, Business, Email_Address, Mobile, Name, status } =
          convertjson.response;
        setInputdata({
          Name: Name,
          Mobile: Mobile,
          Business: Business,
          Email_Address: Email_Address,
          Address1: Address1,
          status: status,
        });
      } catch (error) {
        console.log(error);
      }
    }
    GetContacts();
  }, [id]);

  //////////////////////////   rest state       ////////////////////////

  function onhandelrest() {
    setInputdata({
      Name: "",
      Mobile: "",
      Business: "",
      Email_Address: "",
      Address1: "",
      status: null,
    });
  }

  //////////////////////////   set value in state       ////////////////////////

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setError(null);
    if (name === "status") {
      setInputdata((prevData) => ({
        ...prevData,
        [name]: value === "active" ? true : false,
      }));
    } else {
      setInputdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //////////////////////////   submit customer        ////////////////////////

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(inputdata.Email_Address)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts${id ? `/${id}` : ""}`,
        {
          method: id ? "PATCH" : "POST",
          body: JSON.stringify(inputdata),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.result)
        alert(`Contacts ${id ? "Update" : "Add"} Successfully`),
          router.push("/dashboard/contacts");
      
      else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mt-5 pb-8">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="font-normal cursor-pointer flex items-center gap-3 text-base text-black border-[1px] border-black sm:py-[10px] sm:px-[20px] lg:py-[10px] lg:px-[30px] rounded-xl me-5 border-"
          >
            <BackArrowIcon />
            <span>Back</span>
          </button>
          <div>
            <button
              onChange={onhandelrest}
              type="button"
              className="font-normal text-base text-black border-[1px] border-black sm:py-[10px] sm:px-[20px] lg:py-[10px] lg:px-[39px] rounded-xl me-5 border-"
            >
              Reset
            </button>
            <button
              type="submit"
              className="font-normal text-base text-white sm:py-[10px] sm:px-[20px] lg:py-[10px] lg:px-[48px] rounded-lg bg-[#335ACB] border border-[#335ACB]"
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className=" bg-white px-5 py-5 rounded-[7px]">
          <div className=" text-center pt-1">
            {error && <p className="text-red-500 capitalize">{error}</p>}
          </div>
          <div className=" pt-3">
            <div className=" w-full outline-none rounded-lg font-normal text-base  bg-[#335ACB33]   items-center flex py-[15px] px-3   ">
              <AddCustomBlackDot />
              <input
                // value={inputdata.Personal}
                name="Personal"
                readOnly
                className="w-full bg-transparent  sm:text-sm lg:text-base font-normal outline-none ps-2 placeholder:text-[#00000080]"
                type="text"
                placeholder="Personal Details"
                onChange={handleChange}
              />
            </div>

            {/* Full Name and Business Name */}
            <div className="lg:flex lg:flex-row justify-between">
              <div className="lg:w-6/12 lg:me-5">
                <h3 className="font-normal  sm:text-sm lg:text-base pt-5 text-black ">
                  Full Name
                </h3>
                <input
                  value={inputdata.Name}
                  name="Name"
                  className="outline-none rounded-lg font-normal placeholder:text-[#00000080] sm:text-sm lg:text-base px-3 py-[15px] w-full  bg-[#ECECEC] mt-3"
                  required
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-6/12">
                <h3 className="font-normal  sm:text-sm lg:text-base  pt-5 text-black ">
                  Business Name
                </h3>
                <input
                  name="Business"
                  value={inputdata.Business}
                  className="outline-none rounded-lg font-normal placeholder:text-[#00000080] sm:text-sm lg:text-base px-3 py-[15px] w-full bg-[#ECECEC] mt-3"
                  required
                  type="Business"
                  placeholder="Enter your Business name "
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mobile Number and Email */}
            <div className="lg:flex lg:flex-row justify-between">
              <div className="lg:w-6/12 lg:me-5">
                <h3 className="font-normal sm:text-sm lg:text-base  pt-5 text-black ">
                  Mobile Number
                </h3>
                <input
                  name="Mobile"
                  value={inputdata.Mobile}
                  className="outline-none rounded-lg font-normal text-l sm:text-sm lg:text-base px-3 py-[15px] w-full bg-[#ECECEC] mt-3 placeholder:text-[#00000080]"
                  required
                  type="tel"
                  placeholder="Enter your Number "
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-6/12 ">
                <h3 className="font-normal sm:text-sm lg:text-base  pt-5 text-black ">
                  Email Address
                </h3>
                <input
                  name="Email_Address"
                  value={inputdata.Email_Address}
                  className="outline-none rounded-lg font-normal placeholder:text-[#00000080] sm:text-sm lg:text-base px-3 py-[15px] w-full bg-[#ECECEC] mt-3"
                  required
                  type="email"
                  placeholder="Enter your Email Address"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className=" w-full outline-none rounded-lg font-normal text-base  bg-[#335ACB33]   items-center flex py-[15px] px-3 mt-5  ">
              <div>
                <AddCustomBlackDot />
              </div>
              <input
                name="Address"
                // value={inputdata.Address}
                readOnly
                className=" w-full outline-none ps-2  bg-transparent sm:text-sm lg:text-base   placeholder:text-[#00000080] "
                required
                type="text"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="lg:w-6/12">
              <h3 className="font-normal sm:text-sm lg:text-base pt-5">
                Status
              </h3>
              <div className="flex items-center mt-[14px]">
                <div className="flex items-center">
                  <input
                    className="h-[14px] w-[14px]"
                    type="radio"
                    name="status"
                    value="active"
                    id="active"
                    onChange={handleChange}
                    checked={inputdata.status === true}
                  />
                  <label
                    className="ms-[14px] opacity-[50%] font-normal text-[14px]"
                    htmlFor="active"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center ms-[150px]">
                  <input
                    className="h-[14px] w-[14px]"
                    type="radio"
                    name="status"
                    value="inactive"
                    id="inactive"
                    onChange={handleChange}
                    checked={inputdata.status === false}
                  />
                  <label
                    className="ms-[14px] opacity-[50%] font-normal text-[14px]"
                    htmlFor="inactive"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>
            {/* ADDRESS 1 */}
            <div className="w-full md:me-3">
              <h3 className="font-normal sm:text-sm lg:text-base  pt-5 ms-3 ">
                Address 1
              </h3>
              <input
                name="Address1"
                onChange={handleChange}
                value={inputdata.Address1}
                required
                className="px-3 pt-3 outline-none bg-[#ececec] placeholder:text-[#00000080] py-[5%] rounded-lg w-[100%] mt-3 "
                placeholder="enter full address"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
