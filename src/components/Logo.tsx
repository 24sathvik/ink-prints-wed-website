import { motion } from 'framer-motion';

export function Logo({ className = "", isFooter = false }: { className?: string; isFooter?: boolean }) {
    // Colors based on context
    const darkGreen = isFooter ? "#717f65" : "#32612d"; // In footer, dark green becomes lighter (Sage) for contrast on dark bg? 
    // Wait, footer bg is #1a3317 (very dark green). 
    // User image shows:
    // Light bg version: Leaf is Sage/Dark Green gradient. Text "Ink & Print" is Sage (#717f65) & Dark (#32612d) mix? 
    // No, the user image shows:
    // Top block: Logo. 
    // Middle block: 
    // #717f65 (Sage) -> "Ink" (top half of text?) No, it lists distinct colors.
    // "Ink & Print" text seems to be #717f65 or #32612d depending on variant.
    // Let's stick to the main brand colors.

    // Standard (Light BG):
    // Leaf: Sage (#717f65) & Dark Green (#32612d)
    // Text "Ink": #717f65 (Sage) ?? Or #32612d?
    // User's middle block shows:
    // "Ink & Print" in #717f65
    // "Ink & Print" in #32612d
    // "STUDIO" in #000000

    // Let's implement the Leaf icon and the text.

    const textColor1 = isFooter ? "#f2efe6" : "#717f65"; // Sage or White-ish
    const textColor2 = isFooter ? "#f2efe6" : "#32612d"; // Dark Green or White-ish
    const studioColor = isFooter ? "#9ca3af" : "#000000"; // Greyish or Black

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Leaf/Fan Icon */}
            <svg
                width="48"
                height="48"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 sm:w-12 sm:h-12"
            >
                {/* Three layered leaves/fan shapes */}
                {/* Back Leaf - Lightest */}
                <path
                    d="M10 80 C 10 50, 40 20, 60 10 C 70 30, 60 60, 40 80 Z"
                    fill="#717f65"
                    opacity="0.6"
                />
                {/* Middle Leaf */}
                <path
                    d="M20 85 C 20 55, 50 25, 75 15 C 85 35, 75 65, 55 90 Z"
                    fill="#717f65"
                    opacity="0.8"
                />
                {/* Front Leaf - Darkest */}
                <path
                    d="M30 90 C 30 60, 60 30, 90 20 C 100 40, 90 80, 70 95 Z"
                    fill="#32612d"
                />
            </svg>

            <div className="flex flex-col items-start leading-none">
                <div className="flex items-baseline gap-1.5 font-serif text-2xl sm:text-3xl tracking-tight">
                    <span style={{ color: textColor1 }}>Ink</span>
                    <span style={{ color: textColor2 }} className="font-italic">&</span>
                    <span style={{ color: textColor1 }}>Print</span>
                </div>
                <span
                    className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-sans font-medium mt-1 w-full text-center"
                    style={{ color: studioColor }}
                >
                    Studio
                </span>
            </div>
        </div>
    );
}
