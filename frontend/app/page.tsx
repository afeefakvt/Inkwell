import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Features />
      <Footer/>
    </main>
  )
}