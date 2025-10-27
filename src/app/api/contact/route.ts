import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      message,
      phone,
      subject,
      contactMethod,
      timeframe,
      propertyType,
      priceRange,
      isFirstTimeBuyer,
      listingId,
      listingAddress,
      listingPrice,
    } = data;

    console.log("name", name);
    console.log("message", message);

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Build email content with additional details
    let emailContent = `From: ${name} <${email}>\n`;

    if (phone) {
      emailContent += `Phone: ${phone}\n`;
    }

    if (contactMethod) {
      emailContent += `Preferred Contact: ${contactMethod}\n`;
    }

    // Add listing-specific info if present
    if (listingId) {
      emailContent += `\n--- PROPERTY INQUIRY ---\n`;
      emailContent += `Listing ID: ${listingId}\n`;
      emailContent += `Property: ${listingAddress}\n`;
      if (listingPrice) {
        emailContent += `Price: ${listingPrice}\n`;
      }
    }

    // Add buyer preferences if present
    if (timeframe || propertyType || priceRange) {
      emailContent += `\n--- BUYER PREFERENCES ---\n`;
      if (timeframe) emailContent += `Timeframe: ${timeframe}\n`;
      if (propertyType) emailContent += `Property Type: ${propertyType}\n`;
      if (priceRange) emailContent += `Price Range: ${priceRange}\n`;
      if (isFirstTimeBuyer) emailContent += `First-time buyer: Yes\n`;
    }

    emailContent += `\nMessage:\n${message}`;

    // Determine subject line
    const emailSubject = subject || `New contact form submission from ${name}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM as string,
      to: process.env.RESEND_TO as string,
      subject: emailSubject,
      text: emailContent,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
