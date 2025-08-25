"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, PenTool } from "lucide-react";
import { login } from "@/lib/api/auth";
import { LoginData } from "@/types/user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // clear error as user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setError(null);
      setLoading(true);

      const response = await login(formData);
      console.log("Login success:", response);
      if(response.user.role==="admin"){
        router.replace('/admin/dashboard')
      }else{
        router.replace("/");
      }
    } catch (err: any) {
      const message = err?.message || err?.error || "Login failed";
      setError(message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex items-center gap-2 mb-6">
        <PenTool className="text-[#6b2737]" size={26} />
        <h1 className="text-2xl font-bold text-gray-900">Inkwell</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Welcome back to your writing sanctuary
      </p>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your credentials to access your account
          </p>

          
          <div className="mb-4">
            <Label className="mb-1 block">Email</Label>
            <div className="flex items-center relative">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="mb-1 block">
              Password
            </Label>
            <div className="flex items-center relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-[#6b2737] hover:underline">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6b2737] hover:bg-[#581c2b] text-white cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[#6b2737] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
