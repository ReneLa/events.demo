/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/user/auth.slice";

const requireAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    // const { token } = useSelector(({ ticket }) => ticket);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to index if no token is available
        router.replace("/");
      } else {
        dispatch(setCredentials(token));
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default requireAuth;
