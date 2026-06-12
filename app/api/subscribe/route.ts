import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Basic email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: false, message: 'This email is already subscribed!' },
          { status: 409 }
        );
      }
      // Re-activate if they had unsubscribed
      await prisma.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: { isActive: true },
      });
      return NextResponse.json(
        { success: true, message: 'Welcome back! You\'ve been re-subscribed.' },
        { status: 200 }
      );
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: { email: normalizedEmail },
    });

    return NextResponse.json(
      { success: true, message: 'You\'re in! Welcome to the DNA movement 🎉' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[SUBSCRIBE_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
