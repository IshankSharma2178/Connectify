"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, isLoading, recording, upcomingCalls } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recording":
        return recording;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recording":
        return "No Recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  console.log(upcomingCalls);
  console.log(calls, noCallsMessage);

  return (
    <div className="flex flex-wrap gap-5 rounded-xl max-w-[1260px] items-center w-full text-sky-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recording.svg"
            }
            title={(meeting as Call).state.custom.description.substring(0, 26)}
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recording"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={
              type === "recording" ? "/icons/play.svg" : "/icons/start.svg"
            }
            buttonText={type === "recording" ? "Play" : "Start"}
            handleClick={
              type === "recording"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
