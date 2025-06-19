import * as express from "express";

import contactRoute from "./contact/contact.route";

const router = express.Router();

router.use("/", contactRoute);

export default router;
