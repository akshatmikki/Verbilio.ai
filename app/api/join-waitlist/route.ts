import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if email already exists
    const { data: existing, error: selectError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (selectError) {
      console.error('Supabase select error:', selectError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ message: 'User already registered' }, { status: 409 });
    }

    // Insert if not found
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: 'Supabase insert failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Joined waitlist' }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
