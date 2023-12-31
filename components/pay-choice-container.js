/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { CheckCircle, Circle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAttendee,
  useBuyTicketMutation,
  useLazyGetPayStatusQuery,
} from "../redux/user/auth.slice";
import PayModal from "./PayModal";
import LoadingDots from "./loading-dots";
import choiceStyles from "./pay-choice-container.module.css";

export default function PayChoice({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const user = searchParams.get("user");
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const summit_id = searchParams.get("summit_id");
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const ticket_id = searchParams.get("ticket_id");
  const tel = searchParams.get("phone");
  const address = searchParams.get("address");

  const { pay_status, attendee_details } = useSelector(({ auth }) => auth);
  const [buyTicket, { data, isSuccess, isError, error, isLoading }] =
    useBuyTicketMutation();
  const [getPayStatus, statusResult] = useLazyGetPayStatusQuery();
  const [pay_method, setPayMethod] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [btnStatus, setBtnStatus] = useState("");

  useEffect(() => {
    if (status && status === "400") {
      // dispatch(saveAttendee(newStatu.data));
      setPayMethod(2);
      toast.error("Payment failed. Try with a different Card", {
        id: "pay_fail",
      });

      // console.log("console current status", status);
    }
  }, [status]);

  useEffect(() => {
    if (pay_status === "PENDING") {
      toast.loading("Awaiting payment on MoMo", {
        id: "pay_status",
      });
    }
  }, [pay_status]);

  useEffect(() => {
    if (isSuccess) {
      if (pay_method === 2) {
        window.location.href = `${data.url}`;
      }
      if (pay_method === 1) {
        toast.success(
          "Awaiting approval to your phone MoMo payment. To approve enter *182*1*7#"
        );
        getPayStatus(data.payment_code);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    let interval;
    if (statusResult?.data && statusResult?.data.payment_status === "PENDING") {
      interval = setInterval(() => {
        getPayStatus(statusResult.data.payment_code);
      }, 15000);
    }

    if (
      statusResult?.data &&
      statusResult?.data.payment_status === "SUCCESSFUL"
    ) {
      toast.dismiss("pay_status");
      toast.success("Payment approved");
      router.replace("/dashboard");
    }

    if (statusResult?.data && statusResult?.data.payment_status === "FAILED") {
      toast.dismiss("pay_status");
      toast.error("Payment request timeout");
    }
    return () => clearInterval(interval);
  }, [statusResult.data, statusResult.isError, statusResult.error]);

  useEffect(() => {
    if (isError && error) {
      const message = error?.data.message;
      toast.error(`${message}`);
    }
  }, [error, isError]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userData = status
        ? { first_name, last_name, summit_id, ticket_id, phone: tel, address }
        : JSON.parse(user);
      var data = new FormData();
      data.append("last_name", userData.last_name);
      data.append("first_name", userData.first_name);
      data.append(
        "phone",
        phoneNumber.length > 0 ? phoneNumber : userData.phone
      );
      data.append("payment_type", JSON.stringify(pay_method));
      data.append("summit_id", userData.summit_id);
      data.append("ticket_id", userData.ticket_id);
      data.append("address", userData.address);
      // console.log(userData);
      await buyTicket(data).unwrap();
    },
    [buyTicket, phoneNumber, pay_method]
  );

  const btnDisabled = isLoading || pay_status === "PENDING";
  return (
    <div className="relative flex flex-col w-full">
      <button
        className={cn(
          `w-full h-14 mt-4 bg-${
            pay_method === 1 ? "[#8465cb]" : "[#131316]"
          } rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C] `
        )}
        onClick={() => {
          setPayMethod(1);
        }}
      >
        <div className={choiceStyles.generateWithGithub}>
          <span className={choiceStyles.githubIcon}>
            <Image
              src="/momo.png"
              width={50}
              height={60}
              alt=" "
              className="-top-10"
            />
          </span>
          Pay with MoMo
        </div>
        <span className={choiceStyles.checkIcon}>
          {pay_method === 1 ? (
            <CheckCircle color="#fff" size={24} />
          ) : (
            <Circle color="#fff" size={24} />
          )}
        </span>
      </button>

      <button
        onClick={() => {
          setPayMethod(2);
        }}
        className={cn(
          `w-full h-14 mt-4 bg-${
            pay_method === 2 ? "[#8465cb]" : "[#131316]"
          } rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C] `
        )}
      >
        <div className={choiceStyles.generateWithGithub}>
          <span className={choiceStyles.githubIcon}>
            <Image src="/visa_card.png" width={50} height={70} alt=" " />
          </span>
          Pay with Visa Card
        </div>
        <span className={choiceStyles.checkIcon}>
          {pay_method === 2 ? (
            <CheckCircle color="#fff" size={24} />
          ) : (
            <Circle color="#fff" size={24} />
          )}
        </span>
      </button>

      {pay_method === 1 && (
        <PayModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      )}

      <div className="flex flex-row items-center justify-evenly mt-10">
        <button
          disabled={btnDisabled}
          onClick={onSubmit}
          className={cn(
            { "pointer-events-none": btnDisabled },
            `w-1/3 h-12  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]`
          )}
        >
          {btnDisabled ? <LoadingDots size={4} /> : <>Proceed</>}
        </button>
      </div>
      {status && status === "400" && (
        <div className="flex items-center justify-center pt-2">
          <p className="text-red-500 text-[15px] mb-4 text-center">
            {/* Card Payment failed. Charge or Change card */}
          </p>
        </div>
      )}
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
