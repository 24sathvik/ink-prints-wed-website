"use client";

import { motion } from "framer-motion";

export function BackgroundShapes() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2 }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#717f65]/20 rounded-full blur-[100px] mix-blend-multiply filter"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#32612d]/10 rounded-full blur-[120px] mix-blend-multiply filter"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-[#D4BC94]/20 rounded-full blur-[110px] mix-blend-multiply filter"
            />
        </div>
    );
}
