"use client";

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "919999999999";
    const message = encodeURIComponent("Hello! I would like to know more about your services.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    if (!isVisible) return null;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg whatsapp-btn group"
            aria-label="Chat on WhatsApp"
        >
            {/* Pulsing rings */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-ring" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-ring-delayed" />

            {/* Icon */}
            <MessageCircle className="w-8 h-8 text-white fill-current relative z-10" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#2D2926] text-sm font-medium rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-[#dcd8cc]/50">
                Chat with us
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-r border-b border-[#dcd8cc]/50 rotate-[-45deg]" />
            </span>
        </a>
    );
}
