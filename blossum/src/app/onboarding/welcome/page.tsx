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
          <div className="flex flex-col ml-52">
            <h1 className="text-6xl font-bold text-wenge">Welcome to Blossom</h1>
            <p className="text-lg text-gray-500">A platform where your finance becomes personal.</p>
            <div className="flex flex-col space-y-3">
              <input type="text" placeholder="Full Name" className="border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg  " />
              <input type="text" placeholder="Age" className="border-2  p-2 rounded-lg  text-wenge drop-shadow-lg " />
              <input type="text" placeholder="Area Zipcode" className="border-2 border-gray-300 p-2 rounded-lg  text-wenge drop-shadow-lg" />
              <Link href="/onboarding/financebg">
                <button className="bg-pistachio text-white p-2 rounded-lg ">Next</button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Welcome;
