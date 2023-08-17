"use client";

import cn from "classnames";
import { Contact } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./ticket-profile.module.css";

export default function TicketProfile({ username }) {
  const { ticket } = useSelector(({ ticket }) => ticket);
  return (
    <div className={styles.profile}>
      <span
        className={cn(
          styles.skeleton,
          styles.wrapper,
          styles.inline,
          styles.rounded
        )}
      >
        <Contact size={50} />
      </span>
      <div className={styles.text}>
        <p
          className={cn(styles.name, {
            [styles["name-blank"]]: !username,
          })}
        >
          <span className={cn(styles.skeleton, styles.wrapper)}>
            {"Your Name"}
          </span>
        </p>
        <p className={styles.username}>
          <span className={cn(styles.skeleton, styles.wrapper)}>
            <span className={styles.githubIcon}></span>
            {ticket?.client_full_name ?? " "}
          </span>
        </p>
      </div>
    </div>
  );
}
