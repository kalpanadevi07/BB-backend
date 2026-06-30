const express = require("express");
const router = express.Router();
const leadRoutes = require("./routes/leadRoutes");

const Lead = require("../models/Lead");

const {
  sendLeadNotification,
  sendAutoReply,
} = require("../services/emailService");

// ==========================
// Create New Lead
// ==========================
router.post("/leads", async (req, res) => {
  try {
    const { fullName, email, phone, roles, workTypes } = req.body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !roles ||
      roles.length === 0 ||
      !workTypes ||
      workTypes.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing email
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "This email has already been submitted",
      });
    }

    // Create lead
    const lead = await Lead.create({
      fullName,
      email,
      phone,
      roles,
      workTypes,
    });

    await sendLeadNotification(lead);

    await sendAutoReply(lead);

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================
// Get All Leads
// ==========================
router.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Fetch Leads Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================
// Get Single Lead
// ==========================
router.get("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Fetch Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================
// Delete Lead
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;