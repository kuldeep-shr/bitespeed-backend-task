import express from "express";
import { celebrate } from "celebrate";

import { ContactController } from "../../controllers/contact.controller";
import userSchema from "../../../schemas/user.schema";

const router = express.Router();

router.post(
  "/identify",
  // celebrate(userSchema.register),
  ContactController.identify
);

export default router;
