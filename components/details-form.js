/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setFormStep } from "../redux/ui/ui.slice";
import cn from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";

export default function DetailsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { summit } = useSelector(({ event }) => event);
  const { ticket_type } = useSelector(({ ticket }) => ticket);

  const [focused, setFocused] = useState(false);
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
        first_name: f_name,
        last_name: l_name,
        phone,
        address,
      };
      router.push(
        "/payment" + "?" + createQueryString("user", JSON.stringify(user))
      );
      // dispatch(setFormStep(0));
    },
    [f_name, l_name, phone, address]
  );

  return (
    <div className="flex flex-row w-full justify-center">
      <div className="relative md:w-1/2 self-center px-5 my-10">
        <h3
          className={cn(
            "absolute -left-24 top-16 -rotate-90 text-xl font-semibold"
          )}
        >
          Attendee details
        </h3>
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
          htmlFor="phone-input-field"
          className={cn(styles["input-label"], {
            [styles.focused]: focused,
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="phone"
            id="phone-input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your tel no."
            aria-label="Your phone number"
            required
          />
        </label>
        <label
          htmlFor="address-input-field"
          className={cn(styles["input-label"], {
            [styles.focused]: focused,
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="text"
            id="address-input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your address"
            aria-label="Your address location"
            required
          />
        </label>
        <div className="flex flex-row items-center justify-center mt-5">
          <button
            onClick={() => dispatch(setFormStep(1))}
            className="w-1/3 h-10 mr-3 bg-[#131316] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
          >
            Back
          </button>
          <button
            className="w-1/3 h-10  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
