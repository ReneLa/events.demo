import cn from "classnames";
import Image from "next/image";
import styles from "./ticket-types.module.css";
import styleUtils from "./utils.module.css";
import { useGetTicketsQuery } from "../redux/event/event.slice";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../redux/ui/ui.slice";
import { saveTicket } from "../redux/ticket/ticket.slice";

function TicketType({ tickets }) {
  const dispatch = useDispatch();
  return (
    <div className="md:grid md:gap-2 md:grid-cols-3 place-items-center w-full">
      {tickets.map((type, idx) => (
        <div key={type.id} className={styles.card}>
          <div className={styles.cardBody}>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col justify-between">
                <Image
                  width={30}
                  height={30}
                  priority
                  src={
                    idx === 0
                      ? "/free.png"
                      : idx === 1
                      ? "/gold.png"
                      : "/platinum.png"
                  }
                  alt="tick type"
                  style={{ marginBottom: "5px" }}
                />
                <h3 className={cn(styles.title)}>{type.name}</h3>
              </div>
              <div className="flex-row items-center justify-center">
                <h3 className={styles.title}>{type.price}</h3>
              </div>
            </div>
            <div className="mt-5">
              <p className={styles.description}>{type.description}</p>
            </div>
            <div className="flex flex-row items-center justify-center mt-5 w-full">
              <button
                onClick={() => {
                  dispatch(setFormStep(2));
                  dispatch(saveTicket(type));
                }}
                className={cn(
                  styles.submit,
                  styles.register,
                  styles["default"]
                )}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TicketTypeGrid() {
  const { data, isLoading, error } = useGetTicketsQuery();
  const { formStep } = useSelector(({ ui }) => ui);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (data) {
      setTypes(
        data.data.reduce((allTicTypes, type) => {
          allTicTypes[type.companyName] = [
            ...(allTicTypes[type.companyName] || []),
            type,
          ];
          return allTicTypes;
        }, {})
      );
    }
  }, [data]);

  return (
    <>
      {Object.keys(types).map((companyName) => (
        <motion.div
          key={companyName}
          className={cn(
            styles.companyRow,
            [styleUtils.appear],
            [styleUtils["appear-fourth"]]
          )}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className={cn(styles.title, "absolute -left-6 top-5 -rotate-90")}>
            Tickets
          </h3>
          <TicketType tickets={types[companyName]} />
        </motion.div>
      ))}
    </>
  );
}
