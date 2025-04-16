import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { error } = await supabase.from('waitlist_entries').insert([{ email }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Supabase insert failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Joined waitlist' }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
