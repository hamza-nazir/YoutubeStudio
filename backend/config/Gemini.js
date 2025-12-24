const axios = require("axios");

 async function Gemini(tags) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${tags}, this is an array, make an array of similar keywords and make length of array in 20 exact, send me response in json form only send response in json form, no other words except than array` }],
        }
      ]
    };

    const res = await axios.post(url, body);

    const reply = res.data.candidates[0].content.parts[0].text;

    return reply;

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
  }
}

module.exports=Gemini;
