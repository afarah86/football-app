import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Log the start
    console.log('Starting registration process');

    const data = await request.json();
    console.log('Received data:', data);

    // Test database connection
    await prisma.$connect();
    console.log('Database connected successfully');

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password // We'll add hashing back later
      }
    });

    console.log('User created successfully:', user);

    return NextResponse.json({ 
      success: true,
      message: 'User created successfully',
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    // Detailed error logging
    console.error('Registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json({ 
      success: false,
      error: error.message,
      type: error.name
    }, { status: 500 });
  }
} 