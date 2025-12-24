const mongoose = require("mongoose");
const Videos = require("./models/Videos");
const connection=require('./connection/db')

connection();
const sampleVideos = Array.from({ length: 50 }, (_, i) => {
  const categories = ["education", "food", "vlog", "DIY", "gaming", "travel", "music", "fitness"];
  const titles = [
    "Learning coding",
    "Cooking pasta",
    "Plating desserts",
    "Enjoying a day at the park",
    "DIY Home Decoration",
    "Family gaming night",
    "Travel vlog",
    "Guitar practice",
    "Morning workout",
    "Baking cookies",
    "Painting tutorial",
    "Photography tips",
    "Meditation guide",
    "Street food tour",
    "Language learning",
    "Tech review",
    "Movie review",
    "Makeup tutorial",
    "Gardening tips",
    "Unboxing gadgets"
  ];

  const tags = [
    ["coding"], ["cooking", "food"], ["plating", "desserts"], ["fun", "family", "outdoors"],
    ["DIY", "home"], ["gaming", "fun"], ["travel", "vlog"], ["music", "practice"],
    ["fitness", "workout"], ["baking", "cookies"], ["art", "painting"], ["photography", "tips"],
    ["meditation", "mindfulness"], ["streetfood", "travel"], ["language", "learning"], ["tech", "review"],
    ["movie", "review"], ["makeup", "tutorial"], ["gardening", "tips"], ["unboxing", "gadgets"]
  ];

  const titleIndex = i % titles.length;
  const categoryIndex = i % categories.length;

  return {
    title: `${titles[titleIndex]} - Part ${Math.floor(i / titles.length) + 1}`,
    description: `This is a video about ${titles[titleIndex].toLowerCase()} - sample video number ${i + 1}`,
    category: categories[categoryIndex],
    tags: tags[titleIndex],
    url: "https://res.cloudinary.com/duthfpky2/video/upload/v1765977411/drafts/xnruj5ndpvmkvrzkiq8u.mp4",
    videoLink: Math.random().toString(36).substring(2, 10) + (i + 1),
    originalVideoName: "WIN_20251129_20_02_55_Pro.mp4",
    owner: "692b0af1fad4e000b2a1f797",
    isDraft: false,
    duration: parseFloat((Math.random() * 10 + 1).toFixed(2)), // 1 - 11 mins
    visibility: "Public",
    commentStatus: Math.random() > 0.2,
    forKids: Math.random() > 0.5,
    moderation: "basic",
    restrictOverEighteen: null,
    showLikeCount: true,
    sortBy: "top",
    createdAt: new Date(2025, 11, Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date(2025, 11, Math.floor(Math.random() * 28) + 1).toISOString(),
    __v: 0
  };
});

// Insert into MongoDB
const initDb = async () => {
  try {
    await Videos.deleteMany(); // Optional: clear collection first
    await Videos.insertMany(sampleVideos);
    console.log("50 sample videos inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting videos:", err);
  }
};

initDb();
