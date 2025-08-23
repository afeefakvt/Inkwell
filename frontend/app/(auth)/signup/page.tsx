"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, PenTool } from "lucide-react";
import { register } from "@/lib/api/auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const response = await register(formData);
      console.log("Registered:", response);

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Logo & Heading */}
      <div className="flex items-center gap-2 mb-6">
        <PenTool className="text-[#6b2737]" size={26} />
        <h1 className="text-2xl font-bold text-gray-900">Inkwell</h1>
      </div>

      <p className="text-gray-600 mb-6">Join us and start sharing your stories</p>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Fill in your details to get started
          </p>

          {/* Name */}
          <div className="mb-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <Label>Confirm Password</Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6b2737] hover:bg-[#581c2b] text-white"
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#6b2737] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
