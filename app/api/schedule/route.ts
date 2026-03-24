import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, unavailableSlots, pin } = body;

    if (!name || !unavailableSlots || !pin) {
      return NextResponse.json({ error: 'Missing name, pin, or slots' }, { status: 400 });
    }

    const existingData = await kv.get<{ name: string; unavailableSlots: string[]; pin?: string }>(`schedule:${name}`);

    if (existingData && existingData.pin && String(existingData.pin) !== String(pin)) {
      return NextResponse.json({ error: 'Unauthorized: PIN mismatch' }, { status: 401 });
    }

    // Save to Vercel KV with 'schedule:name' pattern
    await kv.set(`schedule:${name}`, { name, unavailableSlots, pin });

    return NextResponse.json({ success: true, name, unavailableSlots });
  } catch (error) {
    console.error('KV POST Error:', error);
    return NextResponse.json({ error: 'Failed to save schedule' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const pin = searchParams.get("pin");

    if (name) {
      const userData = await kv.get<{ name: string; unavailableSlots: string[]; pin?: string }>(`schedule:${name}`);
      if (userData) {
        if (userData.pin && String(userData.pin) !== String(pin)) {
          return NextResponse.json({ error: "Unauthorized: PIN mismatch" }, { status: 401 });
        }
        // Exclude PIN when sending data back
        return NextResponse.json({ name: userData.name, unavailableSlots: userData.unavailableSlots });
      }
      return NextResponse.json(null);
    }

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
