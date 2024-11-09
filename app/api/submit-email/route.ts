import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection first
    await sql`SELECT 1`;
    
    const result = await sql`
      SELECT id, email, comment, created_at 
      FROM email_submissions 
      ORDER BY created_at DESC
    `;
    
    // Log for debugging
    console.log('Database query successful:', result.rows.length, 'rows');
    
    if (!result?.rows) {
      throw new Error('No rows returned from database');
    }
    
    return NextResponse.json(result.rows);
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email, comment } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email required' }, 
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO email_submissions (email, comment)
      VALUES (${email}, ${comment})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to submit' }, 
      { status: 500 }
    );
  }
}