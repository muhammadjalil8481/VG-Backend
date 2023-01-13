const mongoose = require("mongoose");

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
    embodyingYourFullness: {
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
      thumbnail: {
        type: String,
        required: true,
      },
    },
    comingHomeTogether: {
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
      thumbnail: {
        type: String,
        required: true,
      },
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
    sampleToolsHeading: {
      type: String,
      required: true,
    },
    sampleTools1: {
      heading: {
        type: String,
        required: true,
      },
      icon: {
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

      thumbnail: {
        type: String,
        required: true,
      },
    },
    sampleTools2: {
      heading: {
        type: String,
        required: true,
      },
      icon: {
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
      thumbnail: {
        type: String,
        required: true,
      },
    },
    moreVGHeading: {
      type: String,
      required: true,
    },
    creationStory: {
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
      buttonText: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },
    },
    vibeBloomApp: {
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
      buttonText: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    teacher: {
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
      buttonText: {
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
