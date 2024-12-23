import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center '>
        <SignIn/>
    </main>
  )
}

export default SignUpPage