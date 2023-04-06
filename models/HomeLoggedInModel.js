const mongoose = require("mongoose");
const getVideoDuration = require("../helpers/videoDuration");

const homepageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    headerImage2: {
      type: String,
      // required: true,
    },
    headerImage3: {
      type: String,
      // required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    mainQuotation2: {
      type: String,
      // required: true,
    },
    mainQuotation3: {
      type: String,
      // required: true,
    },
    freshBloomsInfo: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    featuredTools: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    groundworkEssentials: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    gwVideo1: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    gwVideo2: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    gwVideo3: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    recentVibesHeading: {
      type: String,
      required: true,
    },
    hiw1: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    hiw2: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    hiw3: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    hiw4: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    browseByTagsHeading: {
      type: String,
      required: true,
    },
    goDeeperVibeGuides: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    featuredTeacher: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    vibeBloom: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      videoDuration: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

homepageSchema.pre("save", async function (next) {
  const freshBloomsInfoVD = await getVideoDuration(this.freshBloomsInfo.video);
  const gwVideo1VD = await getVideoDuration(this.gwVideo1.video);
  const gwVideo2VD = await getVideoDuration(this.gwVideo2.video);
  const gwVideo3VD = await getVideoDuration(this.gwVideo3.video);
  const goDeeperVibeGuidesVD = await getVideoDuration(
    this.goDeeperVibeGuides.video
  );
  const featuredTeacherVD = await getVideoDuration(this.featuredTeacher.video);
  const vibeBloomVD = await getVideoDuration(this.vibeBloom.video);

  this.freshBloomsInfo.videoDuration = freshBloomsInfoVD;
  this.gwVideo1.videoDuration = gwVideo1VD;
  this.gwVideo2.videoDuration = gwVideo2VD;
  this.gwVideo3.videoDuration = gwVideo3VD;
  this.goDeeperVibeGuides.videoDuration = goDeeperVibeGuidesVD;
  this.featuredTeacher.videoDuration = featuredTeacherVD;
  this.vibeBloom.videoDuration = vibeBloomVD;

  next();
});

const HomePageLoggedIn = mongoose.model("HomePageLoggedIn", homepageSchema);
module.exports = HomePageLoggedIn;
