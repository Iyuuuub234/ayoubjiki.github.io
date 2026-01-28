import { Resend } from 'resend';

export class EmailService {
  private resend: Resend | null = null;
  private adminEmail: string;

  constructor() {
    this.adminEmail = process.env.ADMIN_EMAIL || "ayoubjiki101@gmail.com";
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
  }

  async notifyAdmin(contactData: { name: string; email: string; message: string }): Promise<void> {
    console.log(`[EmailService] Preparing notification for admin: ${this.adminEmail}`);
    
    const emailBody = `
      New Contact Message from Portfolio:
      
      From: ${contactData.name} (${contactData.email})
      Message:
      ${contactData.message}
      
      ---
      Sent at: ${new Date().toLocaleString()}
    `;

    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>',
          to: this.adminEmail,
          subject: 'New Portfolio Contact Message',
          text: emailBody,
        });
        console.log("[EmailService] Real email sent via Resend.");
      } catch (error) {
        console.error("[EmailService] Failed to send real email:", error);
        throw error;
      }
    } else {
      // Fallback to simulation if no API key
      console.log("------------------------------------------");
      console.log("SIMULATION (No API Key found)");
      console.log("TO:", this.adminEmail);
      console.log("SUBJECT: New Portfolio Contact Message");
      console.log("BODY:", emailBody);
      console.log("------------------------------------------");
      console.log("[EmailService] Notification simulation complete.");
    }
  }
}

export const emailService = new EmailService();
