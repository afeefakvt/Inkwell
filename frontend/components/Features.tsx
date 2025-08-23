
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Feather, Users, TrendingUp } from "lucide-react"

const features = [
  {
    icon: <Feather className="w-8 h-8 text-[#6b2737]" />,
    title: "Beautiful Writing Experience",
    desc: "Distraction-free editor with elegant typography that makes your words shine."
  },
  {
    icon: <Users className="w-8 h-8 text-[#6b2737]" />,
    title: "Engaged Community",
    desc: "Connect with like-minded writers and readers who appreciate quality storytelling."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#6b2737]" />,
    title: "Grow Your Audience",
    desc: "Built-in tools to help you reach readers and build a following for your work."
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-semibold text-gray-900">
        Why Choose Inkwell?
      </h2>
      <p className="mt-2 text-gray-600">
        Everything you need to share your stories and connect with readers
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3 px-6 md:px-20">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition">
              <CardContent className="flex flex-col items-center p-6">
                {feature.icon}
                <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
