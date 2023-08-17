"use client";

import cn from "classnames";
import { DownloadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoadingDots from "./loading-dots";
import styles from "./ticket-actions.module.css";
import styleUtils from "./utils.module.css";
import { useSelector } from "react-redux";

export default function TicketActions({ username }) {
  const { ticket } = useSelector(({ ticket }) => ticket);
  const [imgReady, setImgReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const downloadLink = useRef();
  const permalink = encodeURIComponent(
    `https:///tickets/${ticket?.client_full_name}`
  );
  const text = encodeURIComponent("sdsads");
  const downloadUrl = `/api/ticket-images/${ticket?.client_full_name}`;

  useEffect(() => {
    setImgReady(false);

    const img = new Image();

    img.src = downloadUrl;
    img.onload = () => {
      setImgReady(true);
      setLoading(false);
      if (downloadLink.current) {
        downloadLink.current.click();
        downloadLink.current = undefined;
      }
    };
  }, [downloadUrl]);

  return (
    <>
      <a
        className={cn(
          styles.button,
          styleUtils.appear,
          styles.third,
          "icon-button",
          {
            [styles.loading]: loading,
          }
        )}
        href={loading ? undefined : downloadUrl}
        onClick={(e) => {
          if (imgReady) return;

          e.preventDefault();
          downloadLink.current = e.currentTarget;
          // Wait for the image download to finish
          setLoading(true);
        }}
        download="ticket.png"
      >
        {loading ? (
          <LoadingDots size={4} />
        ) : (
          <>
            <DownloadCloud size={24} />
            Download
          </>
        )}
      </a>
    </>
  );
}
