import React from 'react';
import { Calendar, X, Instagram, Facebook } from 'lucide-react';

const WaitlistForm: React.FC = () => (
    <div className="text-white text-center mt-8 space-y-6">
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} />
            <p>LEFT UNTIL FULL RELEASE</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
                type="email"
                placeholder="Your mail address"
                className="px-4 py-3 rounded-full w-80 bg-[#1A1A1A] text-white placeholder-gray-500 border border-[#333]"
            />
            <button className="bg-[#3B5BFF] hover:bg-[#2F4EDC] text-white w-40 py-3 rounded-full shadow-lg transition duration-200">
                Join waitlist
            </button>
        </div>
    </div>
);

export default WaitlistForm;
