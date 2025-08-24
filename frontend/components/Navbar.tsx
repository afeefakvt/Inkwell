'use client'

import React from "react"
import { BookOpen, User, LogIn,PenTool, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { logout } from "@/redux/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistor } from '@/redux/store';
import { logoutUser } from "@/lib/api/auth";



const Navbar: React.FC = () => {

  const router = useRouter();
  const token = useSelector((state:RootState)=>state.auth.token);
  const dispatch = useDispatch()


  const handleLogout = async()=>{
    dispatch(logout());
     await persistor.flush(); //ensure persisted state is updated
    storage.removeItem('persist:auth');//clear persisted redux state
    await logoutUser()
    router.push('/')

  }

  return (
    <nav className="bg-white border-b shadow-sm h-16 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <PenTool className="text-[#6b2737]" size={28} />
          <span className="text-xl font-bold text-gray-900">Inkwell</span>
        </div>

        {/* Center Nav (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <div
            className="flex items-center space-x-1 cursor-pointer hover:text-[#6b2737]"
            onClick={() => router.push("/blogs")}
          >
            <BookOpen size={16} />
            <span>Blogs</span>
          </div>
        </div>

        
        <div className="flex items-center space-x-4">
          {token && (
            <div
              className="hidden md:flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-[#6b2737]"
              onClick={() => router.push("/profile")}
            >
              <User size={18} />
              <span>Profile</span>
            </div>
          )}

          {token?  (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          ):
          <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>

          }

           <button
            onClick={() => router.push(token ? "/createBlog" : "/signup")}
            className="px-4 py-1.5 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar