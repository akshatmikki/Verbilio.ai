'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const { error } = await supabase.from('contacts').insert([form]);

        if (!error) {
            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
        } else {
            console.error(error);
        }

        setSubmitting(false);
    };

    return (
        <div>
            <div className="mx-auto max-w-2xl lg:text-center">
                <motion.h2
                    className="text-3xl font-bold tracking-tight sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Contact Us
                </motion.h2>
            </div>
            <div className="py-10 bg-black/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        className="mx-auto max-w-4xl bg-black rounded-2xl p-8 shadow-[0_0_30px_rgba(0,172,255,0.2)] border border-white/10"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {(['name', 'email'] as Array<keyof typeof form>).map((field, i) => (
                                <motion.input
                                    key={field}
                                    name={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    value={form[field]}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                />
                            ))}
                            <motion.textarea
                                name="message"
                                placeholder="Your Message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />
                            <motion.button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition w-full sm:w-auto"
                                disabled={submitting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {submitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                            {success && (
                                <motion.p
                                    className="text-green-400 mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    ✅ Message sent successfully!
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
