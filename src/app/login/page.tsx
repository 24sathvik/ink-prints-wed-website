"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Github, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Successfully logged in!');
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to login with Google');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#FFFDF9] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-elegant border border-[#E8E0D5]/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
          
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-[#2D2926] mb-2">Welcome Back</h1>
            <p className="text-[#6B6462] text-sm">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#2D2926]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A87C]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F8F4EF]/50 border border-[#E8E0D5] rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4A87C] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest font-bold text-[#2D2926]">Password</label>
                <Link href="/forgot-password" size="sm" className="text-xs text-[#C4A87C] hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A87C]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F8F4EF]/50 border border-[#E8E0D5] rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4A87C] transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#2D2926] text-white rounded-full font-medium hover:bg-[#C4A87C] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E0D5]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-white px-4 text-[#6B6462]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-3 border border-[#E8E0D5] rounded-2xl hover:bg-[#F8F4EF] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.84h2.64c1.55-1.42 2.43-3.5 2.43-5.27z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.84c-.73.49-1.66.78-2.64.78-2.83 0-5.22-1.91-6.07-4.48H2.43v2.92C4.25 20.12 7.88 23 12 23z" fill="#34A853" />
                <path d="M5.93 13.8c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V6.68H2.43C1.58 8.39 1.11 10.3 1.11 12s.47 3.61 1.32 5.32l3.5-2.92z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.88 1 4.25 3.88 2.43 7.68l3.5 2.92c.85-2.57 3.24-4.48 12-4.48z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-[#E8E0D5] rounded-2xl hover:bg-[#F8F4EF] transition-colors">
              <Phone className="w-4 h-4 text-[#6B6462]" />
              <span className="text-sm font-medium">Phone</span>
            </button>
          </div>

          <p className="text-center text-sm text-[#6B6462]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#C4A87C] font-semibold hover:underline">Sign up for free</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
