import React from "react";
import { useAppContext } from "../../Context/AppContextProvider";

const ContactUs = () => {
  const { state } = useAppContext();
  return (
    <div className="text-4xl text-red-600">
      ContactPage
      <h1 className="text-white bg-red-400 mt-6 text-xl">
        {state.user ? state.user.email : "alo"}
      </h1>
    </div>
  );
};

export default ContactUs;
