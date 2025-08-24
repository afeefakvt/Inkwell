"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function Hero() {
  const router = useRouter();
  const token = useSelector((state:RootState)=>state.auth.token)
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center bg-gradient-to-b from-white to-gray-50 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-gray-900"
      >
        Your Words, <span className="text-[#6b2737]">Your Story</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 max-w-2xl text-lg text-gray-600"
      >
        Join a community of writers sharing stories, insights, and ideas.  
        Discover compelling narratives and connect with fellow storytellers.
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button className="bg-[#6b2737] hover:bg-[#581c2b] text-white cursor-pointer"
        onClick={()=>router.push(token? "/blogs/create" : "/login")}>
          Start Writing Today
        </Button>
        <Button variant="outline" className="cursor-pointer" onClick={()=>router.push('/blogs')}>
          Explore Stories
        </Button>
      </div>
    </section>
  )
}
