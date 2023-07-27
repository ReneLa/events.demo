/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterUserMutation } from "../redux/user/auth.slice";
import styles from "./form.module.css";
import LoadingDots from "./loading-dots";

export default function RegisterForm() {
  const [register, { isError, error, isLoading }] = useRegisterUserMutation();
  const searchParams = useSearchParams();
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");

  useEffect(() => {
    if (isError && error) {
      const message = error?.data.message;
      toast.error(`Sorry, try again. ${message}`);
    }
  }, [error, isError]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      var data = new FormData();
      data.append("first_name", f_name);
      data.append("last_name", l_name);
      data.append("email", email);
      data.append("password", password);

      await register(data).unwrap();
    },
    [register, email, password]
  );

  return (
    <div className="px-5 my-10">
      <label
        htmlFor="name-input-field"
        className={cn(styles["input-label"], {
          [styles.focused]: focused,
        })}
      >
        <input
          className={styles.input}
          autoComplete="off"
          type="text"
          id="f_name-input-field"
          value={f_name}
          onChange={(e) => setFName(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter first name"
          aria-label="Your first name"
          required
        />
      </label>
      <label
        htmlFor="name-input-field"
        className={cn(styles["input-label"], {
          [styles.focused]: focused,
        })}
      >
        <input
          className={styles.input}
          autoComplete="off"
          type="text"
          id="l_name-input-field"
          value={l_name}
          onChange={(e) => setLName(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter last name"
          aria-label="Your last name"
          required
        />
      </label>
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
      <div className="flex flex-row items-center justify-center mt-5">
        <button
          className="w-1/3 h-10  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
          onClick={onSubmit}
        >
          {isLoading ? <LoadingDots size={4} /> : <>Register</>}
        </button>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--accents-7)",
            color: "var(--accents-1)",
          },
        }}
      />
    </div>
  );
}
