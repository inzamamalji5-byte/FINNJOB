import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Logo from "@/components/Logo";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Login failed");
      }

      const userData = await response.json();
      toast.success("Welcome back!");
      navigate("/dashboard", { state: { user: userData } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-finn-slate-50 flex" data-testid="login-page">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <Logo className="mb-8" />
              <h1 className="font-heading font-semibold text-3xl text-finn-slate-900 mb-2">
                Welcome back
              </h1>
              <p className="text-finn-slate-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-xl border-finn-slate-200 text-finn-slate-700 hover:bg-finn-slate-50 mb-6"
              data-testid="google-login-button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-finn-slate-50 px-2 text-finn-slate-500 text-sm">
                or
              </span>
            </div>

            {/* Email Login */}
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
              <div>
                <Label htmlFor="email" className="text-finn-slate-700 mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-finn-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="h-12 pl-12 rounded-xl border-finn-slate-200"
                    data-testid="login-email-input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-finn-slate-700 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-finn-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="h-12 pl-12 pr-12 rounded-xl border-finn-slate-200"
                    data-testid="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-finn-slate-400 hover:text-finn-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-finn-slate-900 text-white hover:bg-finn-slate-800"
                data-testid="login-submit-button"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <p className="text-center text-finn-slate-600 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-finn-slate-900 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <h2 className="font-heading font-semibold text-4xl text-white mb-4">
            Flexible Jobs. Fast Pay.
          </h2>
          <p className="text-finn-slate-400 text-lg">
            Join thousands of workers finding gigs that fit their schedule and getting paid instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
