import { Router } from "express";
import { generateResponse } from "../services/openrouter.service";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const aiResponse = await generateResponse(message);

    return res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
