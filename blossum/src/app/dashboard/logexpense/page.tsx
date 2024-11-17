import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LogExpense = () => {
  return (
    <div>
      <div className="bg-white h-screen flex relative items-center justify-between gap-2 px-0">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div> 
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-wenge">Your Expenses</h1>
            <div className="flex flex-col space-y-3 p-2">
              <p className="text-2xl text-wenge">Amount Spent</p>
              <input type="text" placeholder="USD Value" className="border-2 border-gray-300 p-2 rounded-lg text-wenge drop-shadow-lg" />
              <p className="text-2xl text-wenge">Category</p>
              <div className="flex items-center space-x-4">
                <div className='flex flex-col'>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="yes" className="  p-2 rounded-lg" />
                    <span className="text-wenge ml-2">Housing</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Transportaion</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Food</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Healthcare</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Entertainment</span>
                  </label>
                </div>
                <div className='flex flex-col'>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="yes" className="  p-2 rounded-lg" />
                    <span className="text-wenge ml-2">Education</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Personal Care</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Pets</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Investments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="  p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Other</span>
                  </label>
                </div>
              </div>
              <Link href="/dashboard">
                  <button className="bg-pistachio text-white p-2 rounded-lg">Submit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogExpense;