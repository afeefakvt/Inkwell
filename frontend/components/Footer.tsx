
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function Footer() {
  const router = useRouter();
  const token = useSelector((state:RootState)=>state.auth.token);

  const handleClick = ()=>{
    if(token){
      router.push('/createBlog');
    }else{
      router.push('/signup');
    }
  }
  return (
    <section className="py-20 bg-gray-50 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-semibold text-gray-900"
      >
        Ready to Share Your Story?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-gray-600 max-w-xl mx-auto"
      >
        Join thousands of writers who have found their voice on Inkwell.
        Your story matters, and we’re here to help you tell it.
      </motion.p>
      <Button className="mt-8 bg-[#6b2737] hover:bg-[#581c2b]  text-white cursor-pointer"
      onClick={handleClick}>
        {token? "Start Writing" : "Create Your Account"}
      </Button>
    </section>
  )
}
