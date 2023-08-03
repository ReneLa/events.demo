/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const requireAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { token } = useSelector(({ auth }) => auth);
    useEffect(() => {
      if (!token) {
        // Redirect to index if no token is available
        router.replace("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default requireAuth;
