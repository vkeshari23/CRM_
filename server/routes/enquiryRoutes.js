import express from "express";
import auth from "../middleware/auth.js";
import {
  createEnquiry,
  getPublicEnquiries,
  getMyEnquiries,
  claimEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/public", auth, getPublicEnquiries);
router.get("/private", auth, getMyEnquiries);
router.patch("/:id/claim", auth, claimEnquiry);

export default router;
