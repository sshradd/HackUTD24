'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';  // Ensure you have the correct Firebase config file
import { useRouter } from 'next/navigation';  // Using Next.js's router to navigate after sign in
import Image from 'next/image';
import Link from 'next/link';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true);  // Store user state in sessionStorage
      setEmail('');
      setPassword('');
      router.push('/');  // Navigate to home page after successful login
    } catch (e) {
      console.error(e);  // Handle errors, you can also show a notification or message here
    }
  };

  return (
    <div>
      <div className="bg-white h-screen flex relative items-center">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={900} height={400} />
        </div>
        <div className="flex flex-col ml-52 space-y-8">
          <div className="flex items-center flex-col">
            <h1 className="text-6xl font-bold text-wenge mb-8">Welcome to Blossom</h1>
            <p className="text-3xl text-wenge">Let's get started</p>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <div className="flex justify-center">
              <button
                onClick={handleSignIn}
                className="bg-pistachio text-white py-3 px-72 rounded-lg"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
