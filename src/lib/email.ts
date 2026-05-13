import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendTicketEmailProps {
  email: string;
  name: string;
  eventTitle: string;
  date: string;
  qrUrl: string;
  partySize: number;
}

export async function sendTicketEmail({
  email,
  name,
  eventTitle,
  date,
  qrUrl,
  partySize,
}: SendTicketEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "La Grotte <reservations@lagrotte.com>",
      to: [email],
      subject: `Confirmation — ${eventTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0F0F14; color: #FFFFFF; padding: 40px; border-radius: 20px;">
          <h1 style="color: #C62828; text-align: center;">La Grotte du Pêcheur</h1>
          <p style="text-align: center; color: #AAAAAA;">Votre réservation est confirmée !</p>
          
          <div style="margin: 30px 0; padding: 20px; border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; background: rgba(255,255,255,0.03);">
            <h2 style="margin: 0; color: #D4A853;">${eventTitle}</h2>
            <p style="margin: 10px 0 0 0; color: #FFFFFF;">${date}</p>
            <p style="margin: 5px 0 0 0; color: #888888;">${partySize} personne${partySize > 1 ? "s" : ""}</p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #888888; font-size: 14px;">Présentez votre QR code à l'entrée :</p>
            <a href="${qrUrl}" style="display: inline-block; padding: 15px 30px; background: #C62828; color: #FFFFFF; text-decoration: none; border-radius: 10px; font-weight: bold; margin-top: 10px;">Voir mon ticket QR</a>
          </div>

          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #555555; text-align: center;">
            La Grotte du Pêcheur — Alger, Algérie<br/>
            Ce ticket est à usage unique.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email exception:", err);
    return { success: false, error: err };
  }
}
