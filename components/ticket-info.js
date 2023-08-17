"use client";

import { useSelector } from "react-redux";
import styles from "./ticket-info.module.css";
import styleUtils from "./utils.module.css";

export default function TicketInfo({
  logoTextSecondaryColor = "var(--accents-5)",
}) {
  const { ticket } = useSelector(({ ticket }) => ticket);

  return (
    <div className={styles.info}>
      <div className={styles.logo}></div>
      <div className={styles.date}>
        <div>{ticket?.summit.name}</div>
        <div>{ticket?.summit.location}</div>
      </div>
      <div className={styleUtils["hide-on-mobile"]}></div>
      <div className={styles.url}>{ticket?.summit.from_time}</div>
      <div className={styleUtils["show-on-mobile"]}>events.rw</div>
    </div>
  );
}
