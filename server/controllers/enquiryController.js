import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, courseInterest } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: "Name, email and course interest are required" });
    }

    const enquiry = await Enquiry.create({ name, email, phone, courseInterest });

    res.status(201).json({ message: "Enquiry submitted successfully", enquiry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPublicEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: null }).sort({ createdAt: -1 });
    res.status(200).json({ count: enquiries.length, enquiries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ count: enquiries.length, enquiries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const claimEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry id" });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id, claimedBy: null },
      { claimedBy: req.user.id },
      { new: true }
    );

    if (!enquiry) {
      return res.status(400).json({ message: "Enquiry not found or already claimed" });
    }

    res.status(200).json({ message: "Enquiry claimed successfully", enquiry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
