'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import CountdownTimer from '@/components/countdown-timer';
import WaitlistForm from '@/components/waitlist-form';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Boxes, Server, Bot, FileText } from "lucide-react";
import { X, Linkedin, Facebook } from 'lucide-react';
import ContactForm from '@/components/contact-form';
import PerkCard from '@/components/perk-card';
import Image from 'next/image';
import Link from 'next/link';
//import BlogSection from '@/components/BlogSection';

const perks = [
  {
    icon: '🚀',
    title: 'Priority Access',
    text: 'June 2025',
  },
  {
    icon: '🎁',
    title: 'Exclusive Discount',
    text: '30% Off',
  },
  {
    icon: '🛡️',
    title: 'Exclusive Badge',
    text: "Founder's Wall",
  },
];

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

            {/* Logo on the left */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/verbilio.webp"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="mr-2 mt-2"
                />
              </Link>
            </div>

            {/* Blog button on the right 
            <div>
              <Link
                href="/blogs"
                className="bg-black hover:bg-indigo-100 hover:text-black text-white text-xl font-medium px-4 py-2 rounded-md transition"
              >
                Blog
              </Link>
            </div>
*/}
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <main>
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden min-h-screen py-[150px]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
                Join the Future of Automation
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Be among the first to experience our revolutionary platform for AI-powered Workflows, Marketplace for MCP Servers and AI agents.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-[1fr,420px] gap-16 items-start">
              {/* Features List */}
              <div className="space-y-12">
                {/* Feature 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 p-3 flex items-center justify-center rounded-xl bg-[#8A8DFF]/10 text-[#A8A9FF] shadow-lg"
                    >
                      <Boxes className="h-6 w-6 text-indigo-600" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Workflows</h3>
                    <p className="text-white text-lg">
                      Automate complex processes with intelligent workflows that adapt and learn.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 p-3 flex items-center justify-center rounded-xl bg-[#8A8DFF]/10 text-[#A8A9FF] shadow-lg"
                    >
                      <Server className="h-6 w-6 text-indigo-600" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">MCP Servers Marketplace</h3>
                    <p className="text-white text-lg">
                      Access a curated collection of Modal Context Protocol servers.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 p-3 flex items-center justify-center rounded-xl bg-[#8A8DFF]/10 text-[#A8A9FF] shadow-lg"
                    >
                      <Bot className="h-6 w-6 text-indigo-600" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Agents</h3>
                    <p className="text-white text-lg">
                      Deploy intelligent agents that handle tasks autonomously.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 p-3 flex items-center justify-center rounded-xl bg-[#8A8DFF]/10 text-[#A8A9FF] shadow-lg"
                    >
                      <FileText className="h-6 w-6 text-indigo-600" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Template Marketplace</h3>
                    <p className="text-white text-lg">
                      Jump-start your automation with pre-built AI Agents, Workflows and MCP Servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Waitlist Form */}
              <div className="w-full max-w-xl mx-auto rounded-2xl p-4 sm:p-6 md:p-8 bg-black shadow-[0_0_30px_rgba(128,128,128,0.4)]">
                <p className="text-xs sm:text-sm text-purple-400 text-center uppercase mb-2">
                  Launches: June 15, 2025
                </p>

                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-4 text-white">
                  Join the <span className="text-blue-400">waitlist</span>
                </h1>

                <p className="text-center text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-4">
                  Obtain early access to our program and remain informed about release announcements.
                </p>

                <CountdownTimer />
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <div className="min-h-screen text-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-blue-400 text-sm font-semibold mb-4 flex items-center justify-center">
              <span className="mr-2">👤</span> Perks as a waitlist member
            </p>
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
              Get Early bird Benefits
            </h2>
            <p className="text-gray-400 text-lg">
              Obtain early access to our program and remain informed.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 text-white">
              {perks.map((item, i) => (
                <PerkCard key={i} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold mb-4">Sharing our Journey</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Follow our Journey of building a<br />
              <span className="text-gray-400">startup & innovation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left image - tilt inward (counter-clockwise) */}
            <motion.div
              className="relative aspect-[4/3] w-full transform -rotate-3 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Journey"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right image - tilt inward (clockwise) */}
            <motion.div
              className="relative aspect-[4/3] w-full transform -rotate-3 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Journey"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials 
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
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-xl font-semibold mb-8">
                "This is truly incredible and have saved us countless hours!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-800" />
                <div>
                  <p className="font-semibold">John Robert</p>
                  <p className="text-sm text-gray-400">SM Strategy</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8">
              <div className="flex gap-x-2 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-xl font-semibold mb-8">
                "Superb product with the most user friendly interface!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-800" />
                <div>
                  <p className="font-semibold">Maggie Hue</p>
                  <p className="text-sm text-gray-400">BS Growth CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        */}

      {/*<BlogSection />*}

      {/* FAQ Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold mb-4">Need Help?</p>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              We’ve Got Answers
            </h3>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: 'What is this waitlist for?',
                  answer: 'This waitlist gives you early access to our upcoming AI-powered automation and workflow platform — designed to help you build, run, and monetize intelligent apps, agents, and workflows using pre-built templates or custom logic. You will be the first to explore our Workflow Templates Marketplace and cutting-edge features that empower creators, teams, and businesses to automate anything.',
                },
                {
                  question: 'What benefits will I get if I join this waitlist?',
                  answer: (
                    <div>
                      <p className="mb-4">By joining the waitlist, you’ll get:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li><b>Early access</b> to our beta platform before public release</li>
                        <li><b>Exclusive perks</b> like free credits, premium templates, or partner tools</li>
                        <li><b>Influence over development</b> by providing feedback and requesting features</li>
                        <li><b>First-mover advantage</b> in showcasing and selling your own templates or agents on our marketplace</li>
                        <li><b>Exclusive Founder's wall badge</b></li>
                        <li><b>30% discount on launch</b></li>
                      </ul>
                    </div>
                  ),
                },
                {
                  question: 'Who should join this waitlist?',
                  answer: (
                    <div>
                      <p className="mb-4">This is for:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li><b>Developers</b> building AI-driven apps, bots, or automations</li>
                        <li><b>Productivity enthusiasts</b> and <b>no-code creators</b> looking to streamline workflows</li>
                        <li><b>Startups and teams</b> aiming to scale faster with intelligent automations</li>
                        <li><b>Agencies and consultants</b> wanting to offer workflow solutions to clients</li>
                      </ul>
                      <p className="mt-4">If you’re excited about building, using, or monetizing AI-powered automation tools — this is for you.</p>
                    </div>
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className="border border-white/10 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <ContactForm />
      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-start mt-3">
            <p className="text-gray-400">© Copyright Verbilio</p>
          </div>
          <div className="flex justify-end gap-4 sm:gap-6 text-gray-400 ">
            <Link href="https://x.com/verbilio" target="_blank" rel="noopener noreferrer">
              <X className="cursor-pointer hover:text-white" />
            </Link>
            <Link href="https://www.linkedin.com/company/verbilio" target="_blank" rel="noopener noreferrer">
              <Linkedin className="cursor-pointer hover:text-white" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61574963685631" target="_blank" rel="noopener noreferrer">
              <Facebook className="cursor-pointer hover:text-white" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}