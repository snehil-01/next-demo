"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const getProfile = async () => {
    try {
      const data = await axios.get("/api/users/me");
      setUser(data.data.data);
      setVerified(true);
    } catch (error: any) {
      setError(error);
    }
  };
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login')
    } catch (error:any) {
      alert(error.response.data.error);
    }
  }
  return (
    <div>
      <button onClick={getProfile}>abcd</button>
      <hr />
      {verified && (
        <Link href={`/profile/${user._id}`}>VIsit user Profile....</Link>
      )}
      <hr />
      {error && (
        <div>{error.response.data.error}</div>
      )}
       <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
    </div>
  );
}
