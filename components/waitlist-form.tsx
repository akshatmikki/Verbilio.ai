import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('waitlist').insert([
      {
        email: email,
      },
    ]);

    if (!error) {
      setSuccess(true);
      setEmail('');
    } else {
      console.error('Error:', error);
      alert('There was an error joining the waitlist.');
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
          className="bg-[#3B5BFF] hover:bg-[#2F4EDC] text-white w-40 py-3 rounded-full shadow-lg transition duration-200"
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
