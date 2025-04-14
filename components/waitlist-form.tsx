import React from 'react';

const WaitlistForm: React.FC = () => (
  <div className="text-white text-center mt-8">
    <p className="mb-2 text-sm">LEFT UNTIL FULL RELEASE</p>
    <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
      <input
        type="email"
        placeholder="Your mail address"
        className="px-4 py-2 rounded-full w-72 text-black"
      />
      <button className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700">
        Join waitlist
      </button>
    </div>
    <p className="mt-4 text-sm">
      Join <span className="font-semibold">15,725+</span> others on the waitlist
    </p>
  </div>
);

export default WaitlistForm;