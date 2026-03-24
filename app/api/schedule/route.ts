import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, unavailableSlots } = body;

    if (!name || !unavailableSlots) {
      return NextResponse.json({ error: 'Missing name or slots' }, { status: 400 });
    }

    // Save to Vercel KV with 'schedule:name' pattern
    await kv.set(`schedule:${name}`, { name, unavailableSlots });

    return NextResponse.json({ success: true, name, unavailableSlots });
  } catch (error) {
    console.error('KV POST Error:', error);
    return NextResponse.json({ error: 'Failed to save schedule' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Note: in a production app with huge records, scan iterator might be better.
    // get(key) returns the value
    const keys = await kv.keys('schedule:*');
    
    if (keys.length === 0) {
      return NextResponse.json([]);
    }

    const pipeline = kv.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();

    // results is an array of objects
    return NextResponse.json(results || []);
  } catch (error) {
    console.error('KV GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}
