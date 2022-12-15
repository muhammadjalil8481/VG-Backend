const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    embodyingYourFullness: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    comingHomeTogether: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    hiw1: {
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
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    headline1: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    headline2: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    headline3: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    headline4: {
      heading: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    sampleTools1: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
    sampleTools2: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
    creationStory: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
    vibeBloomApp: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
    teacher: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const HomePage = mongoose.model("HomePage", homepageSchema);
module.exports = HomePage;
