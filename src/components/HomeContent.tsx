"use client";

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Clock, Award } from 'lucide-react';
import { ProductCard } from "@/components/ProductCard";
import { BackgroundShapes } from "@/components/BackgroundShapes";
import { Product } from '@/lib/products';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { HeroSection } from '@/components/HeroSection';

interface HomeContentProps {
    featuredProducts: Product[];
    allProducts: Product[];
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }
    })
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export function HomeContent({ featuredProducts, allProducts }: HomeContentProps) {
    return (
        <main className="min-h-screen bg-[#f2efe6] selection:bg-[#717f65] selection:text-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Collections */}
            <section className="py-24 bg-white relative">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f2efe6] to-white" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer as any}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                    >
                        <motion.div variants={fadeUp as any} custom={0} className="max-w-2xl">
                            <span className="text-[#717f65] font-medium tracking-wider text-sm uppercase mb-2 block">Curated Selection</span>
                            <h2 className="font-serif text-4xl md:text-5xl text-[#000000] mb-4 tracking-tight">
                                Featured Collections
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 80 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-1 bg-[#32612d] rounded-full"
                            />
                        </motion.div>
                        <motion.div variants={fadeUp as any} custom={1}>
                            <Link
                                href="/products"
                                className="text-[#32612d] font-medium flex items-center gap-2 hover:gap-3 transition-all group pb-2 border-b border-transparent hover:border-[#32612d]"
                            >
                                View All Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-[#f2efe6] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#717f65]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer as any}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.h2 variants={fadeUp as any} custom={0} className="font-serif text-4xl md:text-5xl text-[#000000] mb-6 tracking-tight">
                            Why Choose Ink & Print
                        </motion.h2>
                        <motion.p variants={fadeUp as any} custom={1} className="text-[#6B6462] text-lg">
                            We combine traditional craftsmanship with modern artistic vision.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Premium Quality", desc: "Finest cardstock and materials for a luxury feel." },
                            { icon: Clock, title: "Timely Delivery", desc: "Quick turnaround times to meet your deadlines." },
                            { icon: Award, title: "Exquisite Craft", desc: "Every design is crafted with artistic precision." },
                            { icon: Star, title: "Personalized", desc: "Custom designs tailored to your unique vision." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center p-8 rounded-3xl bg-white hover:bg-white/80 transition-all duration-500 shadow-sm hover-lift group border border-[#dcd8cc]/50"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f2efe6] text-[#32612d] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 rotate-3">
                                    <item.icon className="w-8 h-8" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-xl text-[#000000] mb-3">{item.title}</h3>
                                <p className="text-[#6B6462] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            <RecentlyViewed />

            {/* Testimonials */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:w-1/2"
                        >
                            <span className="text-[#717f65] font-medium tracking-wider text-sm uppercase mb-4 block">Client Love</span>
                            <h2 className="font-serif text-4xl md:text-6xl text-[#000000] mb-8 tracking-tight leading-[1.1]">
                                Memories Made <br />
                                <span className="text-gradient-brand italic">Beautiful</span>
                            </h2>
                            <div className="relative">
                                <div className="text-8xl font-serif text-[#f2efe6] absolute -top-10 -left-6 -z-10">&ldquo;</div>
                                <p className="text-xl text-[#2D2926] leading-relaxed mb-8 relative z-10 font-light italic">
                                    The wedding cards we received were beyond our expectations. The gold foil work was stunning and the card quality was truly premium. Everyone loved them!
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#f2efe6] border border-[#dcd8cc]" />
                                    <div>
                                        <p className="font-semibold text-[#000000]">Priya & Rahul</p>
                                        <p className="text-xs text-[#717f65] uppercase tracking-wider">Happy Couple</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-elegant rotate-2 hover:rotate-0 transition-transform duration-700">
                                <Image
                                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800"
                                    alt="Wedding Couple"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[#32612d]/10 mix-blend-multiply" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#f2efe6]">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={scaleIn as any}
                        className="bg-[#32612d] rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#717f65] rounded-full blur-[80px] opacity-40 mix-blend-screen" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#717f65] rounded-full blur-[80px] opacity-40 mix-blend-screen" />

                        <div className="relative z-10">
                            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">
                                Ready to create something <br />
                                <span className="text-[#f2efe6] italic opacity-90">truly unique?</span>
                            </h2>
                            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
                                Visit our studio or explore our digital collection to find the perfect invitations for your special occasion.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="px-10 py-5 bg-[#f2efe6] text-[#32612d] rounded-full hover:bg-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Contact Us Now
                                </Link>
                                <Link
                                    href="/products"
                                    className="px-10 py-5 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 w-full sm:w-auto font-medium"
                                >
                                    Browse Catalog
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
