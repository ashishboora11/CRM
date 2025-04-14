"use client"
import React from "react";
import { CrossIcon } from "../Icon/Icon";
import deleteProvinceImg from "@/../public/images/png/deleteProvinceImg.png"
const DeletePop = ({ delete_name, onhandeledelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 z-[60] rounded-[20px] w-[400px] lg:w-[446px] relative">
          <div className="absolute top-5 right-3 cursor-pointer">
            <button onClick={() => onhandeledelete(null)}>
              <CrossIcon />
            </button>
          </div>
          <div className="w-full mt-4 md:mt-0">
            <div className="mx-auto text-center">
              <img
                className="mx-auto"
                src={deleteProvinceImg}
                alt="Delete Driver"
              />
            </div>
            <p className="text-[25px] font-medium text-center mt-[20px]">
              Delete {delete_name}
            </p>
            <p className="w-[269px] mx-auto text-center mt-[20px] opacity-[50%] text-sm font-normal">
              You are going to delete this {delete_name}. Are you sure you want
              to proceed?
            </p>
          </div>
          <div className="flex items-center justify-between mt-[20px]">
            <button
              onClick={() => onhandeledelete(null)}
              type="button"
              className="font-medium text-base border border-[#4C6FD1] px-[40px] py-3 rounded-lg text-[#335ACB]"
            >
              No, Keep It.
            </button>
            <button
              onClick={() => onhandeledelete(null)}
              type="submit"
              className="font-medium text-base border bg-[#4C6FD1] text-white px-[40px] py-3 rounded-lg"
            >
              Yes, Delete!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePop;
