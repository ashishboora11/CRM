"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  DeleteIcon,
  DropDownIcon,
  EditIcon,
  SearchIcon,
  AddIcon,
} from "../../components/Icon/Icon";
import Link from "next/link";

interface Contact {
  _id: string;
  Name: string;
  Mobile: string;
  Business: string;
  Email_Address: string;
  Address1: string;
  status: any;
  createdAt: string
}

const page = () => {
  const dropdownRef = useRef(null);
  const [DropdownOpen, setDropdownOpen] = useState<any>(false);
  const [filterdata, setFilterData] = useState<string>("");
  const [status, setStatus] = useState<string>("All");
  const [allcontacts, setAllContacts] = useState<Contact[]>([]);
  //////////////////////////    delete customer       ////////////////////////

  //////////////////////////    Change Status driver       ////////////////////////

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setDropdownOpen(false);
  };

  async function GetContacts() {
    try {
      const getdata = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts`);
      const convertjson = await getdata.json();
      setAllContacts(convertjson.response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetContacts();
  }, []);

  async function onhadeldelete(id: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      const filterdata = allcontacts.filter(
        (value, index, array) => value._id !== id
      );
      setAllContacts(filterdata);
      if (data.result) alert(`Contacts detete Successfully`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex justify-end items-center">
        {/* SEARCH and filter */}
        <div className=" flex justify-end gap-5">
          <div className="shadow-[0px_1px_3px_0px_#00000042] bg-white rounded-lg max-lg:p-[10px] p-[10px_15px] w-full max-lg:w-[40%] flex gap-x-2.5  ">
            <SearchIcon />
            <input
              className="focus:outline-none bg-white w-[100%] text-base font-normal "
              type="search"
              value={filterdata}
              onChange={(e) => setFilterData(e.target.value)}
              name="search"
              id="search"
              placeholder="Enter Full Name"
            />
          </div>

          {/* filter data  */}
          <div ref={dropdownRef} className="relative">
            <div
              className="flex items-center close bg-[#335ACB] border border-[#335ACB] max-lg:py-[10px] py-[10px] max-lg:px-[10px] px-[20px] rounded-lg cursor-pointer"
              onClick={() => setDropdownOpen(!DropdownOpen)}
            >
              <span>
                <DropDownIcon />{" "}
              </span>
              <button className="font-normal text-base max-lg:text-sm text-white ms-4 bg-[#335ACB]  transition-colors duration-200">
                {status}
              </button>
            </div>

            {DropdownOpen && (
              <div className="absolute bg-white rounded-lg shadow-xl mt-2 w-[130px] overflow-hidden  z-[90]  ">
                <ul>
                  <li
                    className="py-2 px-4 font-normal cursor-pointer hover:bg-[#335ACB] hover:text-white"
                    onClick={() => handleStatusChange("All")}
                  >
                    All
                  </li>
                  <li
                    className="py-2 px-4 font-normal cursor-pointer hover:bg-[#335ACB] hover:text-white"
                    onClick={() => handleStatusChange("Active")}
                  >
                    Active
                  </li>
                  <li
                    className="py-2 px-4 font-normal cursor-pointer hover:bg-[#335ACB] hover:text-white"
                    onClick={() => handleStatusChange("Inactive")}
                  >
                    Inactive
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <Link
              href={"/dashboard/addcontacts"}
              className="font-normal text-nowrap  flex max-lg:text-sm text-base text-white bg-[#335ACB] max-lg:py-[10px] py-[10px] max-lg:px-[15px] px-[15px] rounded-lg relative"
            >
              <div className=" me-3">
                <AddIcon />
              </div>
              ADD Contacts
            </Link>
          </div>
        </div>
      </div>
      {/* TABLE **** */}
      <div className="shadow-[0px_1px_3px_0px_#00000042] rounded-[7px] pt-5 mt-5 px-5 bg-white">
        <div className="overflow-auto mt-5 green_scroll h-[70vh]">
          <table className="min-w-full ">
            <thead className="border-b border-dashed border-[#335ACB] sticky top-[-1%] bg-white ">
              <tr>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  #
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  ID
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Created At
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Full Name
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Email
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Business Name
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Address
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Mobile
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Status
                </th>
                <th className="text-sm text-black px-2.5 py-[8.5px] text-start font-medium capitalize">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="scroll-smooth">
              {allcontacts
                .filter((value) => value.Name.includes(filterdata))
                .filter((value, index, array) => {
                  if (status === "Active") {
                    return value.status === true;
                  } else if (status === "Inactive") {
                    return value.status === false;
                  } else {
                    return allcontacts;
                  }
                })
                .map((item, index) => {
                  return (
                    <tr
                      className={`${index % 2 === 0 ? null : "bg-[#335ACB1A]"
                        } `}
                      key={index}
                    >
                      <td className="text-base text-black font-normal px-2.5 py-[12px] ">
                        {index + 1}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap">
                        {item?._id}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[150px]">
                        {new Date(item?.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[150px]">
                        {item?.Name}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[250px]">
                        {item?.Email_Address}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[250px]">
                        {item?.Business}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[250px]">
                        {item?.Address1}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[150px]">
                        +91 {item?.Mobile}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] whitespace-nowrap w-[150px]">
                        {item?.status ? "Active" : "Inactive"}
                      </td>
                      <td className="text-sm text-black font-normal px-2.5 py-[12px] flex gap-3 items-center w-[120px]">
                        <button
                          onClick={() => onhadeldelete(item._id)}
                          className="me-3"
                        >
                          <DeleteIcon />
                        </button>
                        <Link
                          href={{
                            pathname: "/dashboard/addcontacts",
                            query: { id: item._id },
                          }}
                        >
                          <EditIcon />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
