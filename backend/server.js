require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Gemini=require('./config/Gemini')
const passport = require('passport');
const Videos=require('./models/Videos')
const cors = require("cors");
const SanitizeString=require('./config/SanitizeString');
const connection=require('./connection/db');
const History=require('./models/History')
const multer  = require('multer');
// const redis=require('./connection/redis')
const generateRandomString=require('./config/RandomString')
const storage=require('./connection/cloudinary')
const upload = multer({ storage })
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const app = express();




require('./auth/Google'); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connection();
const store = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  crypto: { secret: "hamzaSecret" },
  touchAfter: 24 * 3600
});
app.use(cors({ origin: 'https://youtube-studio-clone.vercel.app',credentials: true,}));
app.use(session({ store,secret: "hamzaSecret", resave: false,saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 * 30  }}));
app.use(passport.initialize());
app.use(passport.session());
app.get( "/auth/google",passport.authenticate("google", { scope: ["profile", "email"],   prompt: 'select_account'   }));



app.get( "/auth/google/callback",
     passport.authenticate("google", {
    failureRedirect: process.env.FRONT_END,
    successRedirect: process.env.FRONT_END,
  })
);






app.get("/user", (req, res) => {
  try{

    if (req.isAuthenticated()) {
      res.json(req.user); 
    } else {
      res.json({ message: "Not logged in" });
    }
  }catch(err){
    res.json({success:false,error:err.message})
  }
});




app.post('/videos',upload.single('video'),async(req,res)=>{
  try{

    const originalVideoName=req.file.originalname;
    const videoUrl=req.file.path;
      const duration = req.body.duration; 
    const token = generateRandomString();
    const videoInstance=new Videos({videoLink:token,originalVideoName,url:videoUrl,duration,owner:req.user?._id})
    await videoInstance.save();
    res.json(videoInstance);
  }catch(err){
    res.json({success:false,error:err.message})
  }
})







app.get("/", (req, res) => {
  
  res.send("Welcome Homw");
});



app.post('/get-videos',async (req,res)=>{
try{
  
  
  const {page}=req.body;
  const skip=(page-1)*5;
  const owner = req.user?._id;
  const videos=await Videos.find({ owner }).sort({ createdAt:-1 }).skip(skip).limit(5)
  res.json(videos)
}catch(err){
  res.json({success:false,error:err.message})
}


})

app.get('/get-videos-count',async(req,res)=>{
  try{
    
    const count=await Videos.estimatedDocumentCount({owner:req.user._id})
    res.json(count);
  }catch(err){
    res.json({success:false,error:err.message})
  }
})



app.post('/saving-video',async(req,res)=>{
  try{
    
    const  {   title,  description,  category,  moderation,  sortBy,  visibility,  tagsString,  forKids,  restrictOverEighteen,comments:commentStatus,  showLikeCount,videoLink,isDraft}=req.body;
    console.log(commentStatus);
    if(!videoLink) return res.json({success:false});
    const tags=SanitizeString(tagsString)
    const video= await Videos.findOneAndUpdate( { videoLink: videoLink },{title,description,category,moderation,sortBy,visibility,forKids,restrictOverEighteen,commentStatus,showLikeCount,tags,isDraft},{new:true})
    console.log(video); 
    res.json({success:true,video});
  }catch(err){
    res.json({success:false,error:err.message})
  }
  
})

app.post('/save-edited-video',async(req,res)=>{
  const {videoLink,originalVideoName,isDraft,category,commentStatus,description,forKids,moderation,restrictOverEighteen,showLikeCount,sortBy,title,visibility,tagsString}=req.body;
    const tags=SanitizeString(tagsString)
  const updatedVideo=await Videos.findOneAndUpdate({ videoLink: videoLink },{originalVideoName,isDraft,category,commentStatus,description,forKids,moderation,restrictOverEighteen,showLikeCount,sortBy,title,visibility,tags})
  res.json({success:true,updatedVideo});
  
})

app.post('/get-draft-data',async(req,res)=>{
  try{
    const {draftVideoLinkWithPopUp:videoLink}=req.body;
    const videoData= await Videos.findOne({videoLink})
    res.json(videoData)
  }catch(err){
    res.json({success:false,error:err.message})
  }

})

app.post('/get-video-details',async(req,res)=>{
  try{
    const {draftVideoLinkWithPopUp:videoLink}=req.body;
    const videoData= await Videos.findOne({videoLink}).populate('owner')
    res.json(videoData)
  }catch(err){
    res.json({success:false,error:err.message})
  }

})

app.get('/get-video-data-for-edit',async(req,res)=>{
 const { videolink } = req.query;
const video = await Videos.findOne({videoLink:videolink})

const plainVideo =video.toObject();
  plainVideo.tagsString = plainVideo.tags.join(',');
  delete plainVideo.tags;
  console.log(plainVideo);
  res.json(plainVideo)
})





app.post("/search-videos", async (req, res) => {
  try {
    const { q , page } = req.body;
    const skip=(page-1)*20;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search text required" });
    }

    const keywords = q.toLowerCase().split(" ").filter(Boolean);

    const regexArray = keywords.map(word => new RegExp(word, "i"));

   const results = await Videos.aggregate([
  {
    $match: {
      visibility: "Public",
      $or: [
        { title: { $in: regexArray } },
        { tags: { $in: regexArray } },
        { description: { $in: regexArray } }
      ]
    }
  },
  {
    $addFields: {
      relevanceScore: {
        $add: [
          {
            $size: {
              $filter: {
                input: regexArray,
                as: "r",
                cond: { $regexMatch: { input: "$title", regex: "$$r" } }
              }
            }
          },
          {
            $multiply: [
              2,
              {
                $size: {
                  $filter: {
                    input: regexArray,
                    as: "r",
                    cond: { $in: ["$$r", "$tags"] }
                  }
                }
              }
            ]
          },
          {
            $multiply: [
              0.5,
              {
                $size: {
                  $filter: {
                    input: regexArray,
                    as: "r",
                    cond: {
                      $regexMatch: {
                        input: "$description",
                        regex: "$$r"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  {
    $match: {
      relevanceScore: { $gt: 0 }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "owner"
    }
  },
  { $unwind: "$owner" },
  {
    $sort: {
      relevanceScore: -1,
      createdAt: -1
    }
  },
  { $skip: skip },      // skip documents for pagination
  { $limit: 20 }        // limit to 20 results per page
]);


if(req.user._id){
  const videoIds = results.map(video => video._id);
  const historyFound = await History.findOne({ owner: req.user._id });
if (historyFound) {
  await History.findByIdAndUpdate(historyFound._id,{ $addToSet: { videoID: { $each: videoIds } } },{ new: true });
} else {
  await History.create({ owner: req.user._id, videoID: videoIds });
}
}
 res.json({  success: true,results });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post('/watch-later', async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    if(!userId) return;
    if (!mongoose.Types.ObjectId.isValid(id)) {

      return res.status(400).json({ success: false, message: "Invalid Video ID" });
    }

    const result = await History.findOneAndUpdate(
      { owner: userId },
      { 
        $addToSet: { watchLater: id }
      },
      { 
        new: true,    
        upsert: true  
      }
    );

    res.status(200).json({ 
      success: true, 
      message: "Watch Later updated successfully", 
      data: result 
    });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get('/get-recommended-videos', async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get user's watch history
    const history = await History.findOne({ owner: userId }).populate('videoID');

    // If no history, return latest public videos
    if (!history || history.videoID.length === 0) {
      const latestVideos = await Videos.find({ visibility: 'Public' })
        .sort({ createdAt: -1 })
        .limit(10);
      return res.json(latestVideos);
    }

    // 2. Get all tags from watched videos
    const watchedVideoIds = history.videoID.map(v => v._id);
    const watchedTags = history.videoID.flatMap(v => v.tags);

    // Remove duplicates
    const uniqueTags = [...new Set(watchedTags)];

    // 3. Find recommended videos based on tags, excluding already watched
    const recommendedVideos = await Videos.find({
      _id: { $nin: watchedVideoIds },       // exclude watched
      visibility: 'Public',
      tags: { $in: uniqueTags }             // match any tag
    })
      .sort({ createdAt: -1 })              // prioritize recent uploads
      .limit(20);                           // limit recommendations

    res.json(recommendedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, ()=>{
    console.log("App Running on Port");
});
