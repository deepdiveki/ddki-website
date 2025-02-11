import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/libs/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Define the email payload
    const emailPayload = {
      to: EMAIL_SERVER_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    await sendEmail(emailPayload);

    // Respond with success
    return NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
