// Logo component – using the provided image.
import Image from "next/image";

export function Logo({ className = "", isFooter = false }: { className?: string; isFooter?: boolean }) {
    return (
        <div className={`relative flex items-center shrink-0 ${className}`}>
            <Image
                src="/images/logo.png"
                alt="Ink & Print Studio Logo"
                width={240}
                height={80}
                className="object-contain"
                priority
            />
        </div>
    );
}

