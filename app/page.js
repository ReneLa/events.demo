"use client"

import ConfContainer from '@/components/conf-container';
import Form from '@/components/form';
import Hero from '@/components/hero';
import TicketTypeGrid from '@/components/ticket-types';
import { META_DESCRIPTION } from '@/lib/constants';
import { useGetEventQuery } from '@/redux/event/event.slice';
import { AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';


export default function Home() {
  const {data, loading, error}= useGetEventQuery()
  const {formStep}= useSelector(({ui})=>ui)
  const meta = {
    title: 'Events.rw - Cyber Tech Conference',
    description: META_DESCRIPTION
  };

  if(data){
    return (
      <ConfContainer>
      <Hero event={data.data}/>
      <AnimatePresence mode='wait'>
        {formStep===0?
          <TicketTypeGrid/>:
        <Form/>}
      </AnimatePresence>
    </ConfContainer>
)

  }
  return<div/>
}
