"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        toast.success('Registration successful!');
        router.push('/products');
      } else {
        toast.success('Please check your email for the confirmation link');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
    } finally {
      setLoading(false);
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
            <h1 className="font-serif text-4xl text-[#2D2926] mb-2">Create Account</h1>
            <p className="text-[#6B6462] text-sm">Join our premium wedding studio</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#2D2926]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A87C]" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F8F4EF]/50 border border-[#E8E0D5] rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4A87C] transition-all"
                />
              </div>
            </div>

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
              <label className="text-xs uppercase tracking-widest font-bold text-[#2D2926]">Password</label>
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

            <div className="flex items-start gap-3 py-2">
              <ShieldCheck className="w-5 h-5 text-[#C4A87C] shrink-0" />
              <p className="text-[10px] text-[#6B6462] leading-relaxed">
                By signing up, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>. We protect your data with care.
              </p>
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
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B6462] mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-[#C4A87C] font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
