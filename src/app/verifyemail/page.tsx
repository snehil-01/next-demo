"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router"

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(window.location.search.split("=")[1] || "");
    setLoading(false);
  }, []);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      console.log(res);
      setVerified(true);
      console.log("yooooooooooooooo")
    } catch (error: any) {
      setError(true);
      console.log("object")
      console.log(error.response.data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token.trim()) {
    return <div>NO TOKEN</div>;
  }

  return (
    <div>
      <button onClick={verifyUserEmail}>VERIFY EMAIL</button>
      <div>{verified && <div>SUCCESS</div>}</div>
      <div>{error && <div>ERROR IN VERIFICATION</div>}</div>
    </div>
  );
}

export default VerifyEmail;
