"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import React, { MouseEvent, useRef } from "react";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center bg-[#fdfbf7] overflow-hidden px-6 sm:px-8 lg:px-12 pt-32 lg:pt-0">
            {/* Elegant Background Gradients for Depth */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#e6e2d6] rounded-full blur-[120px] md:blur-[180px] -translate-y-1/3 translate-x-1/3 opacity-70" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-[#d3e0ce] rounded-full blur-[120px] md:blur-[150px] translate-y-1/3 -translate-x-1/3 opacity-60" />
            </div>

            {/* Architectural Grid Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: "linear-gradient(#32612d 1px, transparent 1px), linear-gradient(90deg, #32612d 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
            />

            {/* High-performance Fine Art Paper Texture Noise */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.5] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px 150px'
                }}
            />

            {/* Botanical Line Art Graphic (Top Right) */}
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] pointer-events-none opacity-[0.05] z-0">
                <svg viewBox="0 0 500 500" className="w-full h-full text-[#32612d]" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="rotate(10 250 250)">
                        {/* Elegant swooping main stems */}
                        <path d="M400,100 C350,150 300,250 150,450" />
                        <path d="M400,100 C380,120 330,220 180,450" />
                        <path d="M350,150 C380,200 420,300 300,480" />

                        {/* Intricate leaves */}
                        <path d="M360,170 C330,120 270,100 240,130 C250,170 310,200 360,170 Z" />
                        <path d="M360,170 C400,130 460,150 470,190 C450,220 390,210 360,170 Z" />
                        
                        <path d="M300,250 C260,190 190,170 160,210 C180,260 250,290 300,250 Z" />
                        <path d="M300,250 C350,200 420,220 440,270 C410,310 340,290 300,250 Z" />
                        
                        <path d="M240,330 C200,270 140,250 110,290 C130,340 190,370 240,330 Z" />
                        <path d="M240,330 C280,280 340,300 350,340 C330,380 270,370 240,330 Z" />

                        <path d="M350,150 C320,110 280,100 260,120 C270,150 310,170 350,150 Z" />
                        
                        <path d="M380,200 C420,170 470,180 480,210 C460,240 410,230 380,200 Z" />
                        <path d="M380,200 C350,170 300,180 290,210 C310,240 360,230 380,200 Z" />
                        
                        {/* Leaf veins */}
                        <path d="M360,170 C320,140 280,130 240,130" strokeWidth="0.2" />
                        <path d="M360,170 C410,150 450,160 470,190" strokeWidth="0.2" />
                        <path d="M300,250 C250,210 200,200 160,210" strokeWidth="0.2" />
                        <path d="M300,250 C360,220 410,240 440,270" strokeWidth="0.2" />
                        <path d="M240,330 C200,290 150,280 110,290" strokeWidth="0.2" />
                        
                        {/* Delicate bud details */}
                        <circle cx="210" cy="110" r="4" fill="currentColor" fillOpacity="0.5" />
                        <circle cx="200" cy="95" r="2.5" fill="currentColor" fillOpacity="0.5" />
                        <path d="M240,130 C220,120 210,110 210,110" strokeWidth="0.3" />
                        <path d="M210,110 C205,100 200,95 200,95" strokeWidth="0.2" />
                        
                        <circle cx="450" cy="130" r="4" fill="currentColor" fillOpacity="0.5" />
                        <circle cx="465" cy="120" r="2.5" fill="currentColor" fillOpacity="0.5" />
                        <path d="M470,190 C460,150 450,130 450,130" strokeWidth="0.3" />
                        <path d="M450,130 C455,125 465,120 465,120" strokeWidth="0.2" />
                    </g>
                </svg>
            </div>

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">

                {/* Left Side: Rich Typography & Actions */}
                <div className="flex flex-col justify-center space-y-10 max-w-2xl order-2 lg:order-1 pb-20 lg:pb-0 relative">
                    
                    {/* Floating Authentic Stamp */}
                    <div className="hidden sm:flex absolute -left-6 md:-left-20 -top-16 md:-top-24 items-center justify-center pointer-events-none opacity-80 z-0">
                        <CircularStamp />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                    >
                        <h1
                            className="text-[#2a3028] text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Quincy CF', 'Quincy', 'Playfair Display', serif" }}
                        >
                            <span className="block text-[#5e7154] text-sm md:text-base uppercase tracking-[0.3em] font-light mb-6 font-sans">
                                Bespoke Design Studio
                            </span>
                            Timeless Artistry <br className="hidden sm:block" />
                            <span className="italic font-light text-[#5e7154]">In Every Detail.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[#515151] text-lg md:text-xl leading-relaxed max-w-md relative z-10"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                        Discover our collection of handcrafted wedding stationery. From exquisite letterpress to elegant foil stamping, we create authentic heirlooms that tell your unique story.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-5 pt-4 relative z-10"
                        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
                    >
                        <Link
                            href="/products?category=wedding-cards"
                            className="px-10 py-[18px] bg-[#32612d] text-[#f2efe6] text-center rounded-sm hover:bg-[#20401d] transition-colors duration-500 relative overflow-hidden group uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-[#32612d]/20"
                        >
                            View Collections
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-[18px] bg-transparent text-[#32612d] text-center rounded-sm border-[1.5px] border-[#32612d] hover:bg-[#32612d]/5 transition-colors duration-500 uppercase tracking-widest text-xs md:text-sm"
                        >
                            Book a Consultation
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side: Interactive Floating Stationery Suite */}
                <div
                    className="flex items-center justify-center w-full h-[500px] md:h-[600px] lg:h-[750px] order-1 lg:order-2 mt-4 lg:mt-0 relative"
                    style={{ perspective: "1500px" }}
                >
                    <StationerySuite />
                </div>
            </div>
        </section>
    );
}

// Sub-components

function StationerySuite() {
    const containerRef = useRef<HTMLDivElement>(null);
    const springConfig = { damping: 30, stiffness: 100, mass: 1 };
    
    // Mouse tracking for parallax
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    // Calculate rotation for the entire group to give a 3D float effect
    const rotateX = useMotionTemplate`calc((${smoothY} - 0.5) * -20deg)`;
    const rotateY = useMotionTemplate`calc((${smoothX} - 0.5) * 20deg)`;

    return (
        <motion.div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.85, rotateX: 10, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group cursor-crosshair"
        >
            {/* Back Layer: Textured Envelope */}
            <motion.div 
                className="absolute w-[280px] md:w-[360px] aspect-[4/3] bg-[#d5cfc4] rounded shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-8 group-hover:-rotate-6"
                style={{ 
                    x: useMotionTemplate`calc((${smoothX} - 0.5) * -40px)`,
                    y: useMotionTemplate`calc((${smoothY} - 0.5) * -40px)`,
                    rotateZ: -8,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(-40px)" // Push back
                }}
            >
                {/* Envelope Flap */}
                <div 
                    className="absolute inset-x-0 top-0 h-[60%] bg-[#c6bfae] shadow-sm transform origin-top"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />
            </motion.div>

            {/* Middle Layer: Details / RSVP Card */}
            <motion.div 
                className="absolute w-[160px] md:w-[200px] aspect-[3/4] bg-[#f8f6f0] rounded-sm shadow-xl p-6 border border-[#e8e4db] flex flex-col items-center justify-start text-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-16 group-hover:translate-y-4 group-hover:rotate-12"
                style={{
                    x: useMotionTemplate`calc((${smoothX} - 0.5) * -15px)`,
                    y: useMotionTemplate`calc((${smoothY} - 0.5) * -15px)`,
                    left: "5%",
                    bottom: "10%",
                    rotateZ: -5,
                    transform: "translateZ(10px)",
                    transformStyle: "preserve-3d"
                }}
            >
                <div className="w-5 h-5 mb-3 opacity-60">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#717f65" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </div>
                <h4 className="text-[#32612d] font-serif text-lg md:text-xl mb-2 italic">Details</h4>
                <div className="w-8 h-[1px] bg-[#32612d] opacity-20 mb-3" />
                <p className="text-[7px] md:text-[9px] uppercase font-sans tracking-widest text-[#515151] leading-relaxed">
                    Dinner &amp; Dancing<br/>To Follow
                </p>
                {/* Simulated ribbon draped over RSVP */}
                <div className="absolute top-1/2 -right-6 w-8 h-40 bg-[#9fb393]/80 -rotate-[15deg] blur-[0.5px] rounded-full shadow-lg" style={{ transform: "translateZ(-5px)" }} />
            </motion.div>

            {/* Front Layer: Main Invitation Card */}
            <motion.div 
                className="absolute w-[240px] md:w-[320px] aspect-[4/5] bg-[#ffffff] rounded-sm shadow-[0_30px_60px_rgba(50,97,45,0.15)] p-8 flex flex-col items-center justify-center text-center border border-[#ece9e0] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-6 group-hover:-translate-y-4 group-hover:-rotate-2"
                style={{
                    x: useMotionTemplate`calc((${smoothX} - 0.5) * 30px)`,
                    y: useMotionTemplate`calc((${smoothY} - 0.5) * 30px)`,
                    rotateZ: 3,
                    transform: "translateZ(50px)", // Pop out
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Beautiful arched inner border */}
                <div className="absolute inset-3 md:inset-4 border-[1px] border-[#32612d]/20 rounded-t-[100px] pointer-events-none" />
                
                <p className="text-[#717f65] text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-sans mb-6 mt-4 opacity-80">
                    Together with their families
                </p>
                <h3 className="text-[#2a3028] text-4xl md:text-5xl font-serif leading-tight">
                    Eleanor <br/> <span className="italic font-light text-[#717f65] text-3xl md:text-4xl">&amp;</span> <br/> Theodore
                </h3>
                <p className="text-[#515151] text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-sans mt-8 leading-loose opacity-80">
                    Request the pleasure<br/>of your company
                </p>

                {/* Simulated Light Glare on main card */}
                <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 rounded-sm"
                    style={{
                        background: useMotionTemplate`radial-gradient(
                            circle at calc(${smoothX} * 100%) calc(${smoothY} * 100%),
                            rgba(255, 255, 255, 1) 0%,
                            rgba(255, 255, 255, 0) 60%
                        )`
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

// Decorative spinning stamp for authentic feel
const CircularStamp = () => {
    return (
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
            <svg viewBox="0 0 200 200" className="w-[100%] h-[100%] opacity-[0.85] animate-[spin_20s_linear_infinite]">
                <defs>
                    <path id="circlePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                </defs>
                <text fill="#32612d" fontSize="16.5" fontWeight="600" letterSpacing="6" className="uppercase font-sans" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    <textPath href="#circlePath" startOffset="0%">
                        • AUTHENTIC &amp; BESPOKE • PRESSED WITH LOVE 
                    </textPath>
                </text>
            </svg>
            {/* Center icon / monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-10 md:h-10 opacity-70">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#32612d" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}
