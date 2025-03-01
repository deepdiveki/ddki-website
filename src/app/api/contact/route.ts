import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/libs/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, school, email, phone, students, website, licenses, message, training } = data;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Define the email payload
    const emailPayload = {
      to: 'info@deepdive-ki.de',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Schule/Institution:</strong> ${school}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefonnummer:</strong> ${phone || "Nicht angegeben"}</p>
        <p><strong>Schüler:innen-Anzahl:</strong> ${students || "Nicht angegeben"}</p>
        <p><strong>Website der Schule:</strong> ${website || "Nicht angegeben"}</p>
        <p><strong>Anzahl Lizenzen:</strong> ${licenses || "Nicht angegeben"}</p>
        <p><strong>Kostenlose Fortbildung gebucht:</strong> ${training === "yes" ? "Ja" : "Nein"}</p>
        <hr/>
        <p><strong>Nachricht:</strong></p>
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
