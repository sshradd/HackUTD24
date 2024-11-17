import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Expenses = () => {
  return (
    <div>
      <div className="bg-white h-screen flex relative items-center">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div>
        <div className="flex flex-col  space-y-8 ">
          <h1 className="text-5xl font-bold text-wenge mr-52"> Your Expenses</h1>
          <div className="flex flex-col space-y-8">
            
            <p className="text-2xl text-wenge">Monthly Spending Limit</p>
            <input type="text" placeholder="USD Value" className="border-2 border-wenge p-2 rounded-lg placeholder:text-wenge text-wenge" />
            
            {/* Move to the log expenses pop up  */}
            <p className="text-2xl text-wenge">What do you spend your money on?</p>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col'>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2 text-2xl ">Housing</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Transportation</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Food</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2 text-2xl">Healthcare</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Entertainment</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Education</span>
                </label><label className="flex items-center">
                  <input type="checkbox" name="employment" value="yes" className="  p-2 rounded-lg" />
                  <span className="text-wenge ml-2 text-2xl">Personal Care</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Pets</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="employment" value="no" className="  p-2 rounded-lg" />
                  <span className="ml-2 text-wenge text-2xl">Investments</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
                <Link href="/onboarding/bankingstory">
                  <button className="bg-pistachio text-white py-3 px-72 rounded-lg">Next</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;