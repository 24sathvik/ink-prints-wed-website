"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { MouseEvent, useRef } from "react";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-[#f2efe6] overflow-hidden px-6 sm:px-8 lg:px-12 pt-28 lg:pt-0">
            {/* Premium Background Image */}
            <div className="absolute inset-0 z-0 opacity-50 mix-blend-multiply">
                <Image
                    src="/images/hero-bg.png"
                    alt="Elegant Wedding Stationery Texture"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f2efe6] via-[#f2efe6]/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">

                {/* Left Side: Typography & Actions */}
                <div className="flex flex-col justify-center space-y-8 max-w-xl order-2 lg:order-1 pb-20 lg:pb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1
                            className="text-[#32612d] text-[2.75rem] md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Quincy CF', 'Quincy', 'Playfair Display', serif" }}
                        >
                            Your Love Story, <br className="hidden sm:block" />
                            <span className="italic font-light">Pressed in Ink.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[#000000] text-lg md:text-xl leading-relaxed max-w-md"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                        Experience the tactile beauty of our modern wedding stationery. Move your cursor to see the light catch the foil and texture.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-5 pt-4"
                        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
                    >
                        <Link
                            href="/products?category=wedding-cards"
                            className="px-8 py-4 bg-[#32612d] text-[#f2efe6] text-center rounded hover:bg-[#717f65] transition-colors duration-300 relative overflow-hidden group uppercase tracking-widest text-sm"
                        >
                            Explore Collection
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-transparent text-[#32612d] text-center rounded border-[2px] border-[#32612d] hover:border-[#717f65] hover:text-[#717f65] transition-colors duration-300 uppercase tracking-widest text-sm"
                        >
                            Custom Inquiry
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side: 3D Interactive Component */}
                <div
                    className="flex items-center justify-center w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2 mt-8 lg:mt-0"
                    style={{ perspective: "1000px" }}
                >
                    <InteractiveCard />
                </div>
            </div>

            {/* Background decorative blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#717f65]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#32612d]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        </section>
    );
}

function InteractiveCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Spring physics configuration for smooth tilt
    const springConfig = { damping: 20, stiffness: 100, mass: 1 };

    // Raw motion values default to center
    const mouseX = useMotionValue(0.5); // 0 to 1
    const mouseY = useMotionValue(0.5); // 0 to 1

    // Spring-animated values
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Mapped rotation values (-15 to +15 degrees for X and Y)
    // RotateX is inverted so looking down tilts the top towards user
    const rotateX = useMotionTemplate`calc((${springY} - 0.5) * -30deg)`;
    const rotateY = useMotionTemplate`calc((${springX} - 0.5) * 30deg)`;

    // Calculate glare position based on cursor tracking
    const glareX = useMotionTemplate`calc(${springX} * 100%)`;
    const glareY = useMotionTemplate`calc(${springY} * 100%)`;

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate relative position (0 to 1) constrained inside card bounds
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Reset to center smoothly when mouse leaves
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10, rotateX: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
            className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[4/5] md:aspect-[3/4] rounded-sm bg-white shadow-[0_20px_50px_rgba(50,97,45,0.15)] cursor-crosshair border border-[#e6e2d6] z-10"
        >
            {/* Inner Content to simulate actual stationery design */}
            <div
                className="absolute inset-[12px] md:inset-[16px] border border-[#32612d]/20 p-8 flex flex-col items-center justify-center text-center bg-[#faf9f6]/95"
                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} // Pop out effect
            >
                <div className="w-12 h-12 mb-6 opacity-80" style={{ transform: "translateZ(20px)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#32612d" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>

                <h3
                    className="text-[#32612d] text-2xl md:text-3xl mb-4"
                    style={{ fontFamily: "'Quincy CF', 'Playfair Display', serif", transform: "translateZ(30px)" }}
                >
                    A <span className="text-[#717f65] font-light italic">&amp;</span> J
                </h3>

                <div className="w-16 h-[1px] bg-[#32612d] mb-6 opacity-30" style={{ transform: "translateZ(10px)" }} />

                <p
                    className="text-[#32612d] text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-80 leading-relaxed"
                    style={{ fontFamily: "'Quicksand', sans-serif", transform: "translateZ(20px)" }}
                >
                    You are invited<br />to celebrate with us
                </p>

                <p
                    className="mt-8 text-[#717f65] text-sm md:text-base italic"
                    style={{ fontFamily: "'Quincy CF', 'Playfair Display', serif", transform: "translateZ(20px)" }}
                >
                    Twenty-Fourth of October
                </p>
            </div>

            {/* Dynamic Glare Overlay - mimics light reflecting on foil/paper */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay rounded-sm"
                style={{
                    background: useMotionTemplate`radial-gradient(
                        circle at ${glareX} ${glareY},
                        rgba(255, 255, 255, 1) 0%,
                        rgba(255, 255, 255, 0.2) 30%,
                        rgba(255, 255, 255, 0) 70%
                    )`
                }}
            />

            {/* Simulated gold foil accent on the edges that catches the glare */}
            <motion.div
                className="absolute inset-[12px] md:inset-[16px] pointer-events-none border border-yellow-600/20 rounded-sm mix-blend-color-burn"
                style={{
                    opacity: useMotionTemplate`calc(0.3 + (${springX} * 0.5))`
                }}
            />
        </motion.div>
    );
}
