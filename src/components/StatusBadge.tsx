"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function StatusBadge() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    text: string;
    subtext?: string;
    variant: "open" | "closed" | "sunday";
  }>({
    isOpen: true,
    text: "Open today 10 AM - 9 PM",
    variant: "open",
  });

  useEffect(() => {
    function computeStatus() {
      // Calculate based on Indian Standard Time (UTC+5:30) or user local time
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = now.getHours();

      if (day === 0) {
        // Sunday
        setStatus({
          isOpen: false,
          text: "Closed today, opens Monday 10 AM",
          variant: "sunday",
        });
      } else {
        // Monday to Saturday
        if (hour >= 10 && hour < 21) {
          setStatus({
            isOpen: true,
            text: "Open today 10 AM - 9 PM",
            subtext: "Doctor available for consultations",
            variant: "open",
          });
        } else if (hour < 10) {
          setStatus({
            isOpen: false,
            text: "Opens today at 10 AM",
            subtext: "Clinic hours: 10 AM - 9 PM",
            variant: "closed",
          });
        } else {
          // After 9 PM
          const nextDayText = day === 6 ? "opens Monday 10 AM" : "opens tomorrow 10 AM";
          setStatus({
            isOpen: false,
            text: `Closed for tonight, ${nextDayText}`,
            variant: "closed",
          });
        }
      }
    }

    computeStatus();
    const interval = setInterval(computeStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-300 ${
        status.variant === "sunday"
          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
          : status.isOpen
          ? "bg-teal/20 text-teal-light border border-teal/40 shadow-sm"
          : "bg-slate-700/40 text-slate-300 border border-slate-600/40"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {status.isOpen ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
          </>
        ) : (
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              status.variant === "sunday" ? "bg-amber-400" : "bg-slate-400"
            }`}
          ></span>
        )}
      </span>
      <Clock className="w-3.5 h-3.5 opacity-80" />
      <span>{status.text}</span>
    </div>
  );
}
