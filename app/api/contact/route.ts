import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { error } = await supabase.from('contactus').insert([
      { name, email, message }
    ]);

    if (error) {
      console.error('Supabase error:', error.message, error.details);
      return NextResponse.json({ error: 'Supabase insert failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
