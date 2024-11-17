import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Expenses = () => {
  return (
    <div>
      <div className="bg-white h-screen flex relative items-center justify-between px-0">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-wenge">Your Expenses</h1>
          <div className="flex flex-col space-y-3">
            
            <p className="text-2xl text-wenge">Monthly Spending Limit</p>
            <input type="text" placeholder="USD Value" className="border-2 border-wenge p-2 rounded-lg placeholder:text-wenge text-wenge" />
            <p className="text-2xl text-wenge">What do you spend your money on?</p>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col'>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2">Housing</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Transportation</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Food</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2">Healthcare</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Entertainment</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Education</span>
                </label><label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2">Personal Care</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Pets</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge">Investements</span>
                </label>
              </div>
            </div>
            <Link href="/onboarding/bankingstory">
                <button className="bg-pistachio text-white p-2 rounded-lg">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;