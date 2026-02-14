"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'Wedding Cards', href: '/products?category=wedding-cards' },
    { label: 'Visiting Cards', href: '/products?category=visiting-cards' },
    { label: 'Photo Frames', href: '/products?category=photo-frames' },
    { label: 'Albums', href: '/products?category=albums' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1a3317] text-white/90 border-t border-[#32612d]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl font-medium text-[#f2efe6] tracking-wide group-hover:text-[#717f65] transition-colors">
                  Ink <span className="italic text-[#717f65]">&</span> Print
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#717f65] uppercase font-medium mt-1">
                  Studio
                </span>
              </div>
            </Link>
            <p className="text-[#f2efe6]/60 text-sm leading-relaxed mb-8 font-light max-w-xs">
              Crafting premium wedding invitations and printing services with elegance and precision since 2010.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-[#32612d]/50 flex items-center justify-center hover:bg-[#717f65] transition-colors text-[#f2efe6]"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-[#32612d]/50 flex items-center justify-center hover:bg-[#717f65] transition-colors text-[#f2efe6]"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#f2efe6]">Products</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f2efe6]/60 hover:text-[#717f65] transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#f2efe6]">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f2efe6]/60 hover:text-[#717f65] transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#f2efe6]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#f2efe6]/60 font-light">
                <MapPin className="w-5 h-5 mt-0.5 text-[#717f65] shrink-0" />
                <span>123 Wedding Lane, Print District,<br /> Mumbai 400001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-[#f2efe6]/60 hover:text-[#717f65] transition-colors font-light"
                >
                  <Phone className="w-5 h-5 text-[#717f65]" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@inkprintstudio.com"
                  className="flex items-center gap-3 text-sm text-[#f2efe6]/60 hover:text-[#717f65] transition-colors font-light"
                >
                  <Mail className="w-5 h-5 text-[#717f65]" />
                  hello@inkprintstudio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#32612d] mt-16 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#f2efe6]/40 font-light">
              © 2024 Ink & Print Studio. All rights reserved.
            </p>
            <p className="text-sm text-[#f2efe6]/40 font-light">
              Designed by <span className="text-[#717f65] font-medium">ZYXEN</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
