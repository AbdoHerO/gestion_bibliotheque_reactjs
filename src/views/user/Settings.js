import React from "react";

// components

import CardSettings from "../../components/Cards/CardSettings.js";
// import CardProfile from "../../components/Cards/CardProfile.js";

export default function Settings() {
  return (
    <>
      <div className="flex justify-center flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings title="User Setting" />
        </div>
       
      </div>
    </>
  );
}
