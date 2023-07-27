/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import TicketColored from "./ticket-colored";
import TicketColoredMobile from "./ticket-colored-mobile";
import TicketInfo from "./ticket-info";
import TicketProfile from "./ticket-profile";
import styles from "./ticket-visual.module.css";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TicketVisual({ size = 1, ticketNumber = 453423 }) {
  const { ticket } = useSelector(({ auth }) => auth);
  const [url, setUrl] = useState("renela");
  const [qr, setQr] = useState("");

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = () => {
    QRCode.toDataURL(
      ticket?.code,
      {
        width: 800,
        margin: 2,
        color: {
          // dark: '#335383FF',
          // light: '#EEEEEEFF'
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
  };

  return (
    <>
      <div className={styles.visual} style={{ ["--size"]: size }}>
        <div className={styles["horizontal-ticket"]}>
          <TicketColored />
        </div>
        <div className={styles["vertical-ticket"]}>
          <TicketColoredMobile />
        </div>
        <div className={styles.profile}>
          <TicketProfile username=" " />
        </div>
        <div className={styles.info}>
          <TicketInfo
            logoTextSecondaryColor={ticketNumber ? "var(--brand)" : undefined}
          />
        </div>

        <div className={styles["ticket-number-wrapper"]}>
          <Image src={qr} width={70} height={70} alt="qr" priority />
        </div>
      </div>
    </>
  );
}
