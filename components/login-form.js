/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoginUserMutation } from "../redux/user/auth.slice";
import styles from "./form.module.css";
import LoadingDots from "./loading-dots";

export default function LoginForm() {
  const [loginUser, { data, isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    // if (data && isSuccess) {
    //   toast.success(`Login success`, {
    //     id: "login",
    //   });
    // }
    if (isError && error) {
      const message = error?.data.message;
      toast.error(`Sorry, try again. ${message}`, {
        id: "login",
      });
    }
  }, [data, isSuccess, error, isError]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      var data = new FormData();
      data.append("email", email);
      data.append("password", password);
      await loginUser(data).unwrap();
    },
    [loginUser, email, password]
  );
  return (
    <div className="px-5 my-10">
      <label
        htmlFor="email-input-field"
        className={cn(styles["input-label"], {
          [styles.focused]: focused,
        })}
      >
        <input
          className={styles.input}
          autoComplete="off"
          type="email"
          id="email-input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter email to register"
          aria-label="Your email address"
          required
        />
      </label>

      <label
        htmlFor="password-input-field"
        className={cn(styles["input-label"], {
          [styles.focused]: focused,
        })}
      >
        <input
          className={styles.input}
          autoComplete="off"
          type="password"
          id="password-input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter password"
          aria-label="Your password"
          required
        />
      </label>
      <div className="flex flex-ro items-center justify-center mt-5">
        <button
          onClick={onSubmit}
          className="w-1/3 h-10  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
        >
          {isLoading ? <LoadingDots size={4} /> : <>Login</>}
        </button>
      </div>
    </div>
  );
}
