/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import isMobileOrTablet from "../lib/is-mobile-or-tablet";
import { scrollTo } from "../lib/smooth-scroll";
import { useGetUserTicketsQuery } from "../redux/user/auth.slice";
import TicketActions from "./ticket-actions";
import TicketVisual from "./ticket-visual";
import styles from "./ticket.module.css";
import styleUtils from "./utils.module.css";

export default function Ticket({ username, sharePage }) {
  const router = useRouter();
  const { data, isError } = useGetUserTicketsQuery();
  const ticketRef = useRef(null);
  const [ticketGenerationState, setTicketGenerationState] = useState("default");
  const divRef = useRef(null);

  useEffect(() => {
    if (isError) {
      router.replace("/");
    }
  }, [isError]);
  // useEffect(() => {
  //   if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
  //     Tilt.init(ticketRef.current, {
  //       glare: true,
  //       max: 5,
  //       'max-glare': 0.16,
  //       'full-page-listening': true
  //     });
  //   }
  // }, [ticketRef]);

  useEffect(() => {
    if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef, sharePage]);
  if (data) {
    return (
      <div
        className={cn(styles["ticket-layout"], {
          [styles["ticket-share-layout"]]: sharePage,
        })}
      >
        <div ref={divRef}>
          <div className={styles["ticket-text"]}>
            <h2
              className={cn(
                "text-3xl tracking-tighter font-bold text-center md:text-5xl",
                styleUtils.appear,
                styleUtils["appear-first"]
              )}
            >
              You
              <br />
              have
              <br /> Booked.
            </h2>
          </div>
          <div
            className={cn(styleUtils.appear, styleUtils["appear-third"])}
          ></div>
        </div>
        <div className={styles["ticket-visual-wrapper"]}>
          <div ref={ticketRef} className={cn(styles["ticket-visual"])}>
            <TicketVisual username={username} />
          </div>
          <div>
            <div className={styles["ticket-actions"]}>
              <TicketActions username={username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}
