import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const response = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "jappierefilwe@gmail.com",
      subject: `Portfolio Contact Form - ${name}`,
      html: `
        <h2>New Portfolio Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}