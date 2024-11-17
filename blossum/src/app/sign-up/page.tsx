import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Welcome = () => {
  return (
    <div >
      <div className="bg-white h-screen flex relative items-center">
        
          <div className="flex flex-col">
            <Image src="/tree.png" alt="Welcome" width={900} height={400} />
          </div>
          <div className="flex flex-col ml-52 space-y-8 ">
            <div className='flex items-center flex-col'>
              <h1 className="text-6xl font-bold text-wenge mb-8">Welcome to Blossom</h1>
              <p className="text-3xl text-wenge">Let's get started</p>
            </div>
            <div className="flex flex-col justify-center space-y-8 ">
              <input type="text" placeholder="Email" className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg " />
              <input type="text" placeholder="Password" className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg" />
              <div className='flex justify-center'>
                <Link href="/onboarding/financebg">
                  <button className="bg-pistachio text-white py-3 px-72 rounded-lg ">Sign up</button>
                </Link>
              </div>
            </div>
          </div>div
        </div>
    </div>
  );
};

export default Welcome;