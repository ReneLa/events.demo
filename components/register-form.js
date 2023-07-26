/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setFormStep } from "../redux/ui/ui.slice";
import cn from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { summit } = useSelector(({ event }) => event);
  const { ticket_type } = useSelector(({ ticket }) => ticket);

  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
      const user = {
        summit_id: summit.id,
        ticket_id: ticket_type.id,
        total_amount: ticket_type.price,
        first_name: f_name,
        last_name: l_name,
        phone,
        email,
        address,
        password,
      };
      router.push(
        "/payment" + "?" + createQueryString("user", JSON.stringify(user))
      );
      // dispatch(setFormStep(0));
    },
    [email, l_name, email, phone, address, password]
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
      <div className="flex flex-row items-center justify-center mt-5">
        <button
          className="w-1/3 h-10  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
          onClick={onSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
}
