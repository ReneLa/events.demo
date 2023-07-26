"use client";

export default function TicketNumber({ number }) {
  
    const numDigits = `${number}`.length;
    const prefix = `000000`.slice(numDigits);
    return (
      <>
        № {prefix}
        {number}
      </>
    );
  }