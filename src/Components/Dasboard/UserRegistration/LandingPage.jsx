import React from "react";
import EntryForm from "./EntryForm";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();
  const user = location.state?.user || {}; // Use optional chaining to handle null or undefined

  return (
    <div>
      <EntryForm
        props={{
          name: user.userName || "",
          age: user.age || "",
          email: user.email || "",
        }}
      />
    </div>
  );
};

export default LandingPage;
