import express from "express";
import { celebrate } from "celebrate";

import { ContactController } from "../../controllers/contact.controller";
import { contactSchema } from "../../../schemas/contact.schema";

const router = express.Router();

router.post("/identify", celebrate(contactSchema), ContactController.identify);

export default router;
