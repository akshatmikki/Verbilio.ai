'use client'; // if you're using app router and need interactivity

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface PerkCardProps {
  item: {
    icon: string;
    title: string;
    text: string;
  };
  i: number;
}

export default function PerkCard({ item, i }: PerkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative group bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.2 }}
      viewport={{ once: true }}
    >
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.6), transparent 80%)`,
          mixBlendMode: 'screen',
        }}
      />
      <div className="relative z-10">
        <div className="text-blue-400 text-3xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-xl text-white font-medium">{item.text}</p>
      </div>
    </motion.div>
  );
}
