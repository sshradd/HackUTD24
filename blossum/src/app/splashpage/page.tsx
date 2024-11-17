"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const SplashPage = () => {
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setMounted(true); 

    const timer = setTimeout(() => {
      router.push('/sign-in'); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [router]);

  if (!mounted) {
    return null; 
  }

  return (
    <div>
      <div className="bg-white h-screen flex items-center justify-between pr-24">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={900} height={400} />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-6xl font-bold text-wenge">Blossom</h1>
          <p className="text-3xl text-wenge">Rooted in Financial Freedom</p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
