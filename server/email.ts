export class EmailService {
  private adminEmail: string;

  constructor() {
    this.adminEmail = process.env.ADMIN_EMAIL || "ayoubjiki101@gmail.com";
  }

  /**
   * Simulates sending an email notification to the administrator.
   * In a production environment, this would integrate with a service like SendGrid, Resend, or AWS SES.
   * This implementation demonstrates the separation of concerns and object-oriented design.
   */
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

    // Simulation of network latency for a real API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("------------------------------------------");
    console.log("TO:", this.adminEmail);
    console.log("SUBJECT: New Portfolio Contact Message");
    console.log("BODY:", emailBody);
    console.log("------------------------------------------");
    console.log("[EmailService] Notification sent successfully.");
  }
}

export const emailService = new EmailService();
