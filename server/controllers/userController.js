import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API Controller function to manage Clerk user with MongoDB
const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"], // Fixed typo
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name, // Fixed typo
          photo: data.image_url,
        };
        await userModel.create(userData);
        break;

      case "user.updated":
        const userUpdateData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name, // Fixed typo
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userUpdateData);
        break;

      case "user.deleted":
        await userModel.findOneAndDelete({ clerkId: data.id }); // Fixed method
        break;

      default:
        return res.status(400).json({ success: false, message: "Invalid event type" });
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ success: false, message: error.message }); // Fixed error response
  }
};

export { clerkWebhooks };

