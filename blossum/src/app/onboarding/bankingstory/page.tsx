import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const BankingStory = () => {
  return (
    <div>
      <div className="bg-white h-screen flex relative items-center justify-between px-0">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-wenge">Your Banking Story</h1>
          <div className="flex flex-col space-y-3">
            <p className="text-2xl text-wenge">Do you have a bank account?</p>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col'>
                <label className="flex items-center">
                  <input type="radio" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">No</span>
                </label>
              </div>

            </div>
            <p className="text-2xl text-wenge">If No, what is the reason?</p>
            <input type="dropdown" placeholder="USD Value" className="border-2 border-wenge p-2 rounded-lg placeholder:text-wenge text-wenge" />
            
            <Link href="/dashboard">
                <button className="bg-pistachio text-white p-2 rounded-lg">Done</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingStory;