import { Webhook } from "svix";
import userModel from "../models/userModel";
// API Controller dunction to manage clerk user with database
// http://localhost:6002/api/user/webhooks

const clerkWebhooks = async (req, res) => {
  try {
    // create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestam"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.ast_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        res.json({});

        break;
      case "user.updated":
        const userUpdateData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.ast_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userUpdateData);
        res.json({});
        break;
      case "user.deleted":
        await userModel.findByIdAndDelete({ clerkId: data.id });
        res.json({});
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    re.json({ success: false, message: error.messsage });
  }
};

export {clerkWebhooks}
