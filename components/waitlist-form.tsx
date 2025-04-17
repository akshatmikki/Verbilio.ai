import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const WaitlistForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccess(false); // Reset on each submit
    
        try {
            const res = await fetch('/api/join-waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                setSuccess(true);
                setEmail('');
            } else if (res.status === 409 && data.message === 'User already registered') {
                alert('You are already on the waitlist!');
            } else {
                console.error('API error:', data.error);
                alert('User already registered or there was an error.');
            }
        } catch (err) {
            console.error('Network error:', err);
            alert('Something went wrong.');
        }
    
        setSubmitting(false);
    };
          

    return (
        <div className="text-white text-center mt-8 space-y-6">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <p>LEFT UNTIL FULL RELEASE</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row justify-center items-center gap-4"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Your mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 rounded-full w-80 bg-white text-black placeholder-gray-800 border border-[#333]"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#3B5BFF] hover:bg-[#2F4EDC] text-white w-60 py-2 rounded-md shadow-lg transition duration-200"
                >
                    {submitting ? 'Joining...' : 'Join waitlist'}
                </button>

            </form>

            {success && (
                <p className="text-green-400 text-sm">You’ve been added to the waitlist!</p>
            )}
        </div>
    );
};

export default WaitlistForm;
