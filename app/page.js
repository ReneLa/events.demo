"use client";

import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ConfContainer from "../components/conf-container";
import DetailsFrom from "../components/details-form";
import Form from "../components/form";
import Hero from "../components/hero";
import MenuButton from "../components/menu-button";
import TicketTypeGrid from "../components/ticket-types";
import { useGetEventQuery } from "../redux/event/event.slice";
import requireAuth from "../lib/require-auth";

 function Home() {
  const { data } = useGetEventQuery();
  const { token } = useSelector(({ auth }) => auth);
  const { formStep } = useSelector(({ ui }) => ui);

  // console.log(token);

  if (data) {
    return (
      <ConfContainer>
        {token && <MenuButton />}
        <Hero event={data.data} />
        <AnimatePresence mode="wait">
          {!token ? (
            <Form />
          ) : (
            <>{formStep === 1 ? <TicketTypeGrid /> : <DetailsFrom />}</>
          )}
        </AnimatePresence>
      </ConfContainer>
    );
  }
  return <div />;
}
export default requireAuth(Home)