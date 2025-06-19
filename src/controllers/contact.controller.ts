import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";

export class ContactController {
  static async identify(req: Request, res: Response): Promise<void> {
    try {
      const { email, phoneNumber } = req.body;

      const contactService = new ContactService();
      const result = await contactService.identifyContact(email, phoneNumber);

      res.status(200).json(result);
    } catch (error) {
      console.error("❌ Error in identify controller:", error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
