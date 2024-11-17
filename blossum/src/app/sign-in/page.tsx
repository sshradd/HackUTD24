import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div >
      <div className="bg-white h-screen flex relative items-center">
        
          <div className="flex flex-col">
            <Image src="/tree.png" alt="Welcome" width={900} height={400} />
          </div>
          <div className="flex flex-col ml-52 space-y-8 ">
            <div className='flex items-center flex-col'>
              <h1 className="text-6xl font-bold text-wenge mb-8">Welcome to Blossom</h1>
              <p className="text-3xl text-wenge">Sign in to your account.</p>
            </div>
            <div className="flex flex-col justify-center space-y-8 ">
              <input type="text" placeholder="Email" className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg " />
              <input type="password" placeholder="Password" className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg" />
              <div className='flex justify-center items-center flex-col'>
                <Link href="/onboarding/welcome">
                  <button className="bg-pistachio text-white py-3 px-72 rounded-lg mb-4">Sign in</button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-wenge text-white py-3 px-64 rounded-lg mb-4">Create Account</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SignIn;
