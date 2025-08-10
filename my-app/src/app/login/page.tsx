'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2 font-headline font-semibold mb-6 text-white drop-shadow-lg">
        <Package2 className="h-8 w-8 text-white" />
        <span className="text-2xl">KnacPro Solutions</span>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-sm backdrop-blur-lg bg-white/90 border-none shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-indigo-500 hover:text-indigo-600"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  required
                  className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-600 transition-all duration-300"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
