"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function GlobalBackgroundArt() {
    const pathname = usePathname();

    // The Hero section on the homepage has its own distinct artwork.
    // We optionally fade this global artwork out on the home page if desired, 
    // or keep it visible but positioned differently. 
    // For now, we'll keep it globally visible but very subtle.
    const isHome = pathname === "/";

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            
            {/* High-performance global noise texture (no SVG filters for zero latency) */}
            <div 
                className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px 150px'
                }}
            />

            {/* Bottom Left Botanical Element - Hidden on Hero (Home) Page */}
            {!isHome && (
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.12] text-[#32612d] rotate-12">
                <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="translate(50, 50)">
                        {/* Main Branch */}
                        <path d="M50,450 C100,350 150,250 250,100" />
                        <path d="M50,450 C80,380 120,280 220,100" />
                        
                        {/* Secondary Branch */}
                        <path d="M120,310 C180,260 250,220 350,150" />
                        
                        {/* Fern/Palm Style Leaves */}
                        {/* Lower Left */}
                        <path d="M100,350 C60,320 20,330 10,360 C40,380 80,360 100,350 Z" />
                        <path d="M110,320 C60,280 10,290 0,330 C40,360 90,340 110,320 Z" />
                        
                        {/* Middle Left */}
                        <path d="M140,260 C90,210 30,220 20,270 C60,300 120,280 140,260 Z" />
                        <path d="M150,230 C100,170 30,180 20,230 C70,270 130,250 150,230 Z" />
                        
                        {/* Upper Left */}
                        <path d="M180,180 C130,120 60,130 50,190 C100,230 160,200 180,180 Z" />
                        <path d="M200,150 C150,80 80,90 60,150 C120,200 180,170 200,150 Z" />
                        
                        {/* Lower Right */}
                        <path d="M130,320 C180,300 230,320 240,360 C190,380 140,340 130,320 Z" />
                        <path d="M150,280 C210,250 270,280 280,320 C220,350 160,300 150,280 Z" />
                        
                        {/* Middle Right */}
                        <path d="M170,230 C240,190 310,220 320,270 C250,310 180,250 170,230 Z" />
                        <path d="M190,190 C270,140 350,180 370,230 C290,280 200,210 190,190 Z" />
                        
                        {/* Veins for a few key leaves */}
                        <path d="M110,320 C60,300 30,310 10,330" strokeWidth="0.3" />
                        <path d="M150,230 C90,200 50,210 20,230" strokeWidth="0.3" />
                        <path d="M150,280 C210,285 240,300 280,320" strokeWidth="0.3" />
                        <path d="M190,190 C270,195 310,215 370,230" strokeWidth="0.3" />

                        {/* Additional loose falling petals/leaves */}
                        <path d="M350,350 C380,320 420,340 400,380 C360,390 340,360 350,350 Z" fill="currentColor" fillOpacity="0.05" />
                        <path d="M420,250 C440,230 470,240 460,270 C430,280 410,260 420,250 Z" fill="currentColor" fillOpacity="0.05" />
                        <path d="M280,100 C300,80 330,90 320,120 C290,130 270,110 280,100 Z" fill="currentColor" fillOpacity="0.05" />
                    </g>
                </svg>
            </div>
            )}
            
        </div>
    );
}
