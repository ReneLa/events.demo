"use client";


import TicketColored from './ticket-colored';
import TicketColoredMobile from './ticket-colored-mobile';
import TicketInfo from './ticket-info';
import TicketNumber from './ticket-number';
import TicketProfile from './ticket-profile';
import styles from './ticket-visual.module.css';

export default function TicketVisual({
  size = 1,
  ticketNumber,
}) {
 
  return (
    <>
      <div className={styles.visual} style={{ ['--size']: size }}>
        <div className={styles['horizontal-ticket']}>
           <TicketColored /> 
        </div>
        <div className={styles['vertical-ticket']}>
           <TicketColoredMobile />
        </div>
        <div className={styles.profile}>
          <TicketProfile
            username=" "
          />
        </div>
        <div className={styles.info}>
          <TicketInfo logoTextSecondaryColor={ticketNumber ? 'var(--brand)' : undefined} />
        </div>
        {ticketNumber && (
          <div className={styles['ticket-number-wrapper']}>
            <div className={styles['ticket-number']}>
              <TicketNumber number={ticketNumber} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}