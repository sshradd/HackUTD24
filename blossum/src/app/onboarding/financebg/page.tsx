import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FinanceBG = () => {
  return (
    <div>
      <div className="bg-white h-screen flex relative items-center gap-2 px-0">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div>
        <div className="flex flex-col ml-52 space-y-8">
          <div className="flex items-center flex-col">
            <h1 className="text-5xl font-bold text-wenge mb-8">Financial Background</h1>
            <div className="flex flex-col space-y-3">
              <p className="text-2xl text-wenge">Are you employed?</p>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="yes" className="p-2 rounded-lg" />
                    <span className="text-wenge ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employment" value="no" className="p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">No</span>
                  </label>
                </div>
              </div>
              <p className="text-2xl text-wenge">Yearly Income</p>
              <input type="text" placeholder="USD Value" className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg" />
              <p className="text-2xl text-wenge">Financial Literacy Level</p>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <input type="radio" name="financial-literacy" value="beginner" className="p-2 rounded-lg" />
                    <span className="text-wenge ml-2">Beginner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="financial-literacy" value="intermediate" className="p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Intermediate</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="financial-literacy" value="advanced" className="p-2 rounded-lg" />
                    <span className="ml-2 text-wenge">Advanced</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <Link href="/onboarding/expenses">
                  <button className="bg-pistachio text-white py-3 px-72 rounded-lg">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceBG;
