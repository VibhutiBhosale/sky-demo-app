import dbConnect from "../src/lib/mongodb";
import CookieCategory from "../src/models/CookieCategory";

async function seed() {
  try {
    console.log("Connecting to database...");
    await dbConnect();

    await CookieCategory.deleteMany({});
    await CookieCategory.insertMany([
      {
        key: "essential",
        title: "Essential cookies",
        description:
          "These cookies are required for basic website functionality and cannot be disabled.",
        required: true,
      },
      {
        key: "analytics",
        title: "Analytics Storage",
        description:
          "Analytics cookies help us understand how people use the site so we can improve it.",
        required: false,
      },
      {
        key: "advertising",
        title: "Personalised advertising and content",
        description:
          "These cookies are used to deliver personalised advertising and measure performance.",
        required: false,
      },
      {
        key: "preferences",
        title: "Store and/or access information on a device",
        description: "Used to remember your choices (language, region, accessibility).",
        required: false,
      },
    ]);

    console.log("Seed completed successfully!");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    process.exit(0);
  }
}

seed();
