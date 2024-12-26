"use client";

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import "@stream-io/video-react-sdk/dist/css/styles.css";

const Meeting = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);  
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const {call , isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>


  if (!isLoaded) {
    return <p>Loading user data...</p>;
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete}/>
          ) : (
            <MeetingRoom  />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
