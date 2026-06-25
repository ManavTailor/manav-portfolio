import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Create transporter — configure via environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_USER, // Your Gmail address
        pass: process.env.SMTP_PASS, // Gmail App Password (not your real password)
      },
    })

    // Email to Manav (notification)
    const mailToManav = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'tailormanav68@gmail.com',
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', sans-serif; background: #05050f; color: #f3f0ff; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #0a0a1a; border: 1px solid rgba(139,92,246,0.2); border-radius: 16px; overflow: hidden; }
              .header { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 32px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 1.5rem; }
              .body { padding: 32px; }
              .field { margin-bottom: 24px; }
              .label { font-size: 0.75rem; color: #7c6fa0; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
              .value { font-size: 0.95rem; color: #e9d5ff; }
              .message-box { background: rgba(124,58,237,0.1); border: 1px solid rgba(139,92,246,0.2); border-radius: 10px; padding: 16px; }
              .footer { padding: 20px 32px; border-top: 1px solid rgba(139,92,246,0.1); text-align: center; font-size: 0.75rem; color: #7c6fa0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✉️ New Portfolio Message</h1>
              </div>
              <div class="body">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name} &lt;${email}&gt;</div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box value">${message.replace(/\n/g, '<br/>')}</div>
                </div>
              </div>
              <div class="footer">
                Received via manav-portfolio contact form
              </div>
            </div>
          </body>
        </html>
      `,
    }

    // Auto-reply to sender
    const autoReply = {
      from: `"Manav Tailor" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Got your message! — Manav Tailor`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', sans-serif; background: #f8f4ff; color: #1a0533; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(124,58,237,0.1); }
              .header { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 40px 32px; text-align: center; }
              .header h1 { color: white; margin: 0 0 8px; font-size: 1.5rem; }
              .header p { color: rgba(255,255,255,0.8); margin: 0; font-size: 0.9rem; }
              .body { padding: 36px 32px; line-height: 1.7; color: #374151; }
              .highlight { background: linear-gradient(135deg, #7c3aed, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
              .footer { padding: 24px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 0.8rem; color: #9ca3af; }
              a { color: #7c3aed; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thanks, ${name}! 🙌</h1>
                <p>I've received your message and will get back to you soon.</p>
              </div>
              <div class="body">
                <p>Hi <strong>${name}</strong>,</p>
                <p>
                  Thank you for reaching out! I've received your message regarding 
                  "<strong>${subject}</strong>" and will get back to you as soon as possible — 
                  usually within <span class="highlight">24–48 hours</span>.
                </p>
                <p>In the meantime, feel free to explore:</p>
                <ul>
                  <li>My <a href="https://github.com/Manav Tailor">GitHub</a> for open-source projects</li>
                  <li>My <a href="https://linkedin.com/in/manav-tailor">LinkedIn</a> for professional updates</li>
                </ul>
                <p>Best regards,<br/><strong>Manav Tailor</strong><br/>Software Developer</p>
              </div>
              <div class="footer">
                tailormanav68@gmail.com &nbsp;|&nbsp; Udaipur, India &nbsp;|&nbsp; +91 7727045534
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(mailToManav)
    await transporter.sendMail(autoReply)

    return NextResponse.json({ success: true, message: 'Emails sent successfully!' })
  } catch (error: unknown) {
    console.error('Email error:', error)
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to send email. Please check server configuration.', details: errMsg },
      { status: 500 }
    )
  }
}
