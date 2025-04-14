'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/countdown-timer';
import WaitlistForm from '@/components/waitlist-form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Timer, Star, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .insert([{ email }]);

      if (error) throw error;

      toast.success('Successfully joined the waitlist!');
      setEmail('');
    } catch (error) {
      toast.error('Error joining waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold">WaitlIZ</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-300 hover:text-white">Early Benefits</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Follow My Journey</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Early Reviews</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">FAQ's</a>
              <Button>Get Template</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-white px-4 pt-[200px]">
        <p className="text-sm text-purple-400 uppercase mb-2">Launches: May 5, 2025</p>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Join the <span className="text-blue-400">waitlist</span>
        </h1>
        <p className="text-center text-gray-400 max-w-md">
          Obtain early access to our program and remain informed about release announcements.
        </p>
        <CountdownTimer />
        <WaitlistForm />

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gray-800 border-2 border-black"/>
                ))}
              </div>
              Join <span className="font-semibold">10,000+</span> others on the waitlist
            </div>
          </div>

      {/* Benefits Section */}
      <div className="py-24 bg-black/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-blue-400 text-sm font-semibold mb-4">Perks as a waitlist member</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Get Early bird Benefits
            </h2>
            <p className="text-gray-400">
              Obtain early access to our program and remain informed.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="bg-white/5 rounded-2xl p-8">
                <Timer className="h-8 w-8 text-blue-400 mb-4"/>
                <h3 className="text-lg font-semibold mb-2">Priority Access</h3>
                <p className="text-gray-400">March 2025</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-8">
                <Star className="h-8 w-8 text-blue-400 mb-4"/>
                <h3 className="text-lg font-semibold mb-2">Exclusive Discount</h3>
                <p className="text-gray-400">30% Off</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-8">
                <Star className="h-8 w-8 text-blue-400 mb-4"/>
                <h3 className="text-lg font-semibold mb-2">Founder's Wall</h3>
                <p className="text-gray-400">Special Recognition</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold mb-4">Sharing My Journey</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Follow My Journey of building a<br/>
              <span className="text-gray-400">startup & travelling world</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Journey"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Journey"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-black/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold mb-4">Trusted By Early Customers</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Early Customers Feedback
            </h2>
            <p className="mt-4 text-gray-400">
              Here's what they have to say about using our product for the first time and their thoughts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-8">
              <div className="flex gap-x-2 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current"/>
                ))}
              </div>
              <p className="text-xl font-semibold mb-8">
                "This is truly incredible and have saved us countless hours!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-800"/>
                <div>
                  <p className="font-semibold">John Robert</p>
                  <p className="text-sm text-gray-400">SM Strategy</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8">
              <div className="flex gap-x-2 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current"/>
                ))}
              </div>
              <p className="text-xl font-semibold mb-8">
                "Superb product with the most user friendly interface!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-800"/>
                <div>
                  <p className="font-semibold">Maggie Hue</p>
                  <p className="text-sm text-gray-400">BS Growth CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold mb-4">Vision Behind AtomAI</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Some Common FAQ's
            </h2>
            <p className="mt-4 text-gray-400">
              Here are some common questions that you might have about our product and how it works.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                "What is a waitlist template?",
                "Can I customize the waitlist template?",
                "Does it integrate with email marketing tools?",
                "Is the template mobile-friendly?",
                "How do I access the template after purchase?"
              ].map((question, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left">{question}</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
                    voluptates corporis error non distinctio magni.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-black/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white/5 rounded-2xl p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Have Questions?</h2>
                <p className="text-gray-400">
                  Should you require further information about our product, its features, or its
                  pricing structure, don't hesitate to get in touch with us.
                </p>
              </div>
              <Button variant="secondary" className="flex items-center gap-2">
                Mail Us <ArrowRight className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© 2024 — Copyright</p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter/ X</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}