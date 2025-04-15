'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Contact Us
                </h2>
            </div>
            <div className="py-10 bg-black/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl bg-black rounded-2xl p-8 shadow-[0_0_30px_rgba(200,200,200,0.2)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition"
                                disabled={submitting}
                            >
                                {submitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {success && (
                                <p className="text-green-400 mt-2">Message sent successfully!</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
