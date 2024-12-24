"use client"
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = async ({params} : {params :{id:string}}) => {
  const id = (await params).id
  const {user , isLoaded} = useUser();
  const [isSetUpComplete , setIsSetUpComplete]  = useState(false)

  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup/>
          ):(
            <MeetingRoom/>
          )
        }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting