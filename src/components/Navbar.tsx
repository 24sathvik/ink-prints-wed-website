"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/products?category=wedding-cards', label: 'Wedding Cards' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#f2efe6]/90 backdrop-blur-md shadow-sm border-b border-[#dcd8cc]/50'
          : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo Area */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* If logo image exists, we can use it here. For now, text based as per requested style */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-2">
                  {/* Abstract Leaf Icon Placeholder if needed, or just text */}
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-[#717f65] tracking-tight group-hover:text-[#32612d] transition-colors duration-300">
                    Ink <span className="italic text-[#32612d]">&</span> Print
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs tracking-[0.4em] text-black uppercase font-medium pl-1">
                  Studio
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-base font-medium text-[#000000]/80 hover:text-[#32612d] transition-colors duration-300 group font-sans"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#717f65] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[#000000]/70 hover:text-[#32612d] transition-colors"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </motion.button>

              <Link href="/contact" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-[#32612d] text-white text-sm font-medium rounded-full shadow-lg hover:bg-[#264a22] transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#000000]/80 hover:text-[#32612d] transition-colors"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full sm:w-[320px] bg-[#f2efe6] shadow-2xl border-l border-[#dcd8cc]"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif text-2xl font-medium text-[#717f65]">
                    Ink <span className="italic text-[#32612d]">&</span> Print
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#000000]/70 hover:text-[#32612d] transition-colors"
                  >
                    <X className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xl text-[#000000] hover:text-[#32612d] transition-colors font-medium font-serif"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <p className="text-[#717f65] text-sm text-center font-medium opacity-80">
                    Design . Print . Create
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
