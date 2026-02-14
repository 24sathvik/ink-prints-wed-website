"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Users, Sparkles } from 'lucide-react';
import { BackgroundShapes } from "@/components/BackgroundShapes";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#f2efe6]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#32612d]/40" />
                <span className="text-[#32612d] tracking-[0.3em] uppercase text-xs font-semibold">Our Story</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-[#717f65] mb-8 leading-[1.1] tracking-tight">
                Crafting Memories <br />
                <span className="text-[#32612d] italic">Since 2010</span>
              </h1>
              <p className="text-[#6B6462] text-lg leading-relaxed mb-10 font-light">
                At Ink & Print Studio, we believe every celebration deserves an invitation that speaks to its uniqueness. What started as a small printing press has grown into a premium wedding stationery studio, serving thousands of happy couples across India.
              </p>
              <div className="flex flex-wrap gap-12 border-t border-[#dcd8cc] pt-8">
                <div>
                  <p className="font-serif text-4xl text-[#32612d]">14+</p>
                  <p className="text-sm text-[#717f65] uppercase tracking-wider mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#32612d]">10K+</p>
                  <p className="text-sm text-[#717f65] uppercase tracking-wider mt-1">Happy Clients</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#32612d]">500+</p>
                  <p className="text-sm text-[#717f65] uppercase tracking-wider mt-1">Unique Designs</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-elegant border-[8px] border-white/50">
                <Image
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
                  alt="Our Studio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#717f65]/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#32612d]/10 rounded-full blur-3xl -z-10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#f2efe6] to-white" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-[#000000] mb-6">What We Stand For</h2>
            <p className="text-[#6B6462] max-w-2xl mx-auto text-lg font-light">Our core values guide everything we create</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Passion", desc: "Every design is crafted with love and dedication to perfection." },
              { icon: Award, title: "Quality", desc: "We use only premium materials and the finest printing techniques." },
              { icon: Users, title: "Service", desc: "Your satisfaction is our priority from start to finish." },
              { icon: Sparkles, title: "Innovation", desc: "Blending traditional artistry with modern design trends." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[2rem] bg-[#f2efe6]/50 hover:bg-[#f2efe6] transition-all duration-300 border border-[#dcd8cc]/30"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-[#32612d] mb-6 shadow-sm rotate-3 group-hover:rotate-6 transition-transform">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-[#000000] mb-3">{item.title}</h3>
                <p className="text-[#6B6462] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#717f65] text-[#f2efe6] relative overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Meet the Artisans</h2>
            <p className="text-white/80 text-lg font-light">The talented team behind your beautiful invitations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Rajesh Kumar", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
              { name: "Priya Sharma", role: "Lead Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
              { name: "Amit Patel", role: "Production Head", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#32612d]/30 shadow-2xl">
                  <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[#f2efe6]/70 uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f2efe6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#000000] mb-8">Ready to Create Your Perfect Invitation?</h2>
          <p className="text-[#6B6462] mb-12 text-lg font-light max-w-2xl mx-auto">Let&apos;s work together to make your special day even more memorable with designs that reflect your unique story.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#32612d] text-white rounded-full hover:bg-[#264a22] transition-all shadow-lg hover:shadow-xl font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
