import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="flex h-[100vh] w-full items-center justify-center ">
      <SignUp />
    </main>
  );
};

export default SignInPage;
