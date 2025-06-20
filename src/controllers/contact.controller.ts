import IController from "../../types/IController";
import apiResponse from "../utilities/apiResponse";
import { ContactService } from "../services/contact.service";
import httpStatus from "http-status-codes";

export class ContactController {
  static identify: IController = async (req, res) => {
    const { email, phoneNumber } = req.body;

    try {
      const contactService = new ContactService();
      const result = await contactService.identifyContact(email, phoneNumber);

      return apiResponse.result(
        res,
        result,
        httpStatus.OK,
        "Contact identified"
      );
    } catch (error) {
      console.error("❌ Error in ContactController.identify:", error);
      return apiResponse.error(
        res,
        httpStatus.BAD_REQUEST,
        error instanceof Error ? error.message : "Unexpected error occurred"
      );
    }
  };
}
