import { NextRequest, NextResponse } from 'next/server';
import { contactSubmissionSchema } from '@/lib/validation';

// Simple in-memory rate limiter using a Token Bucket algorithm
// Note: In a real distributed deployment (like Vercel serverless), 
// you would use Redis (e.g., Upstash) for rate limiting.
interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const rateLimitStore = new Map<string, TokenBucket>();
const MAX_TOKENS = 5; // Max 5 requests
const REFILL_RATE = 1; // 1 token
const REFILL_INTERVAL = 60 * 1000; // per 60 seconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || { tokens: MAX_TOKENS, lastRefill: now };

  // Refill tokens
  const timePassed = now - bucket.lastRefill;
  const refillAmount = Math.floor(timePassed / REFILL_INTERVAL) * REFILL_RATE;
  
  if (refillAmount > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + refillAmount);
    bucket.lastRefill = now;
  }

  // Check if we have tokens
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    rateLimitStore.set(ip, bucket);
    return true; // Allowed
  }

  rateLimitStore.set(ip, bucket);
  return false; // Rate limited
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting by IP
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Body
    const body = await req.json();
    const validatedData = contactSubmissionSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error.format() },
        { status: 400 }
      );
    }

    // 3. Log the successful validation
    console.log('Received valid contact submission:', validatedData.data);

    // TODO: insert into Supabase leads table + send via Resend
    
    // 4. Return success response
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
