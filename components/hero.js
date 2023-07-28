"use client";

import cn from "classnames";
import styles from "./hero.module.css";
import styleUtils from "./utils.module.css";

export default function Hero({ event }) {
  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils["appear-first"],
          styleUtils["show-on-mobile"],
          styles.description
        )}
      >
        {event?.description}
      </h2>
      <h1
        className={cn(
          styleUtils.appear,
          styleUtils["appear-first"],
          // 'text-3xl tracking-tighter font-bold text-center md:text-5xl'
          styles.hero
        )}
      >
        Welcome to the
        <br className={styleUtils["show-on-desktop"]} />
        {event?.name}
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils["appear-third"],
          styleUtils["show-on-tablet"],
          styles.description
        )}
      >
        {event?.description}
      </h2>
      <div
        className={cn(
          styleUtils.appear,
          styleUtils["appear-second"],
          styles.info
        )}
      >
        <p>{event?.from_time}</p>
        <div className={styles["description-separator"]} />
        <p>
          <strong>{event?.location}</strong>
        </p>
      </div>
    </div>
  );
}
