import React from "react"
import { BookOpen, User, LogIn,PenTool } from "lucide-react"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b shadow-sm h-16 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <PenTool className="text-[#6b2737]" size={28} />
          <span className="text-xl font-bold text-gray-900">Inkwell</span>
        </div>

        {/* Center Nav (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-[#6b2737]">
            <BookOpen size={16} />
            <span>Blogs</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-[#6b2737]">
            <User size={18} />
            <span>Profile</span>
          </div>

          <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
            <LogIn size={16} />
            <span>Sign In</span>
          </button>

          <button className="px-4 py-1.5 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
