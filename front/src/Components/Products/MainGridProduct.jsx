import React, { useState } from "react";

const MainGridProduct = ({ props }) => {
  const [image, setImage] = useState(props.images.img1);

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="w-80 h-[400px]   flex flex-col gap-4 rounded-br-3xl">
      <div
        className="relative w-full h-[350px] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={props.images.img1}
          alt=""
          className={`absolute top-0 left-0 w-full h-full  transition-opacity duration-400 ease-in-out ${
            hovered && props.images.img2 ? "opacity-0" : "opacity-100"
          }`}
        />
        {props.images.img2 && (
          <img
            src={props.images.img2}
            alt=""
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      {props.sale ? (
        <div className="absolute overflow-hidden w-[150px] h-[150px]  flex items-center justify-center">
          <div className="absolute w-[150%] h-10 rotate-[-45deg] text-2xl -translate-y-5 bg-gradient-to-r from-[#a83141] via-[#700113] to-[#d33a0c] text-white font-semibold uppercase tracking-wider shadow-md flex items-center justify-center">
            - {props.sale}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div className="absolute text-medium  bg-red-500 overflow-hidden w-[50px] h-[25px]  flex items-center justify-center"> */}

      <div className="flex flex-col gap-4 ">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col ">
            <span className="text-medium text-gray-700 font-bold">
              {props.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-green-900">
                {props.price} ₾
              </span>

              {props.orgprice ? (
                <span className="text-sm  line-through font-bold  text-red-600 text-center">
                  {props.orgprice} ₾
                </span>
              ) : (
                ""
              )}
            </div>
            {/* <p className="text-xs text-gray-400">ID: 23432252</p> */}
          </div>
        </div>
        {/* <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl">
      Add to cart
    </button> */}
      </div>
    </div>
  );
};

export default MainGridProduct;
