"use client";
import React, { useEffect } from "react";

function Demo() {
  useEffect(() => {
    fetch("/api/users/health")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Demo Page....</div>;
}

export default Demo;
