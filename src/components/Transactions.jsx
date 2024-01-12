import React from "react";
import maestro from "../assets/img/logos_maestro.svg";

export const Transactions = ({ name, price }) => {
  const strPrice = price.toString();

  return (
    <div
      className={
        price > 0
          ? "flex items-center justify-between px-4 mMedium:px-6 py-6 mb-4 bg-[#F2FFF5] rounded-lg"
          : "flex items-center justify-between px-4 mMedium:px-6 py-6 mb-4 bg-[#FFF2FA] rounded-lg"
      }
    >
      <div className="flex items-center justify-center">
        <img src={maestro} alt="Status" className="w-6 mr-4" />
        <div className="flex flex-col">
          <div className="text-sm mMedium:text-base mLarge:text-xl font-semibold text-black">
            {name}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={
            price > 0
              ? "text-sm mMedium:text-base mLarge:text-xl font-semibold text-[#006317]"
              : "text-sm mMedium:text-base mLarge:text-xl font-semibold text-[#64011F]"
          }
        >
          {price > 0 ? `+£${strPrice}` : `-£${strPrice.replace("-", "")}`}
        </div>
      </div>
    </div>
  );
};
