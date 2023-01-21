const HomePage = require("../models/HomePageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const getVideoDuration = require("../helpers/videoDuration");

exports.createHomePage = async (req, res, next) => {
  try {
    const {
      embodyingYourFullness,
      comingHomeTogether,
      hiw1,
      hiw2,
      hiw3,
      hiw4,
      sampleTools1,
      sampleTools2,
      creationStory,
      vibeBloomApp,
      teacher,
    } = req.body;

    const headerImage = req.files["headerImage"][0].path;
    // const headerImage2 = req.files["headerImage2"][0].path;

    let embodyingYourFullnessVideo =
      req.files["embodyingYourFullness[video]"][0].path;
    let embodyingYourFullnessThumbnail =
      req.files["embodyingYourFullness[thumbnail]"][0].path;

    let comingHomeTogetherVideo =
      req.files["comingHomeTogether[video]"][0].path;
    let comingHomeTogetherThumbnail =
      req.files["comingHomeTogether[thumbnail]"][0].path;

    let hiw1Image = req.files["hiw1[image]"][0].path;
    let hiw2Image = req.files["hiw2[image]"][0].path;
    let hiw3Image = req.files["hiw3[image]"][0].path;
    let hiw4Image = req.files["hiw4[image]"][0].path;

    let sampleTools1Video = req.files["sampleTools1[video]"][0].path;
    let sampleTools1Thumbnail = req.files["sampleTools1[thumbnail]"][0].path;
    let sampleTools1Icon = req.files["sampleTools1[icon]"][0].path;

    let sampleTools2Video = req.files["sampleTools2[video]"][0].path;
    let sampleTools2Thumbnail = req.files["sampleTools2[thumbnail]"][0].path;
    let sampleTools2Icon = req.files["sampleTools2[icon]"][0].path;

    let creationStoryVideo = req.files["creationStory[video]"][0].path;
    let creationStoryThumbnail = req.files["creationStory[thumbnail]"][0].path;

    let vibeBloomAppVideo = req.files["vibeBloomApp[video]"][0].path;
    let vibeBloomAppThumbnail = req.files["vibeBloomApp[thumbnail]"][0].path;

    let teacherVideo = req.files["teacher[video]"][0].path;
    let teacherThumbnail = req.files["teacher[thumbnail]"][0].path;

    const checkHomePage = await HomePage.find();
    if (checkHomePage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Homepage already exists ? you can't create another but update though"
      );

    const homePage = await HomePage.create({
      ...req.body,
      headerImage,

      embodyingYourFullness: {
        heading: embodyingYourFullness.heading,
        text: embodyingYourFullness.text,
        buttonText: embodyingYourFullness.buttonText,
        video: embodyingYourFullnessVideo,
        thumbnail: embodyingYourFullnessThumbnail,
      },
      comingHomeTogether: {
        heading: comingHomeTogether.heading,
        text: comingHomeTogether.text,
        buttonText: comingHomeTogether.buttonText,
        video: comingHomeTogetherVideo,
        thumbnail: comingHomeTogetherThumbnail,
      },
      hiw1: {
        heading: hiw1.heading,
        text: hiw1.text,
        image: hiw1Image,
      },
      hiw2: {
        heading: hiw2.heading,
        text: hiw2.text,
        image: hiw2Image,
      },
      hiw3: {
        heading: hiw3.heading,
        text: hiw3.text,
        image: hiw3Image,
      },
      hiw4: {
        heading: hiw4.heading,
        text: hiw4.text,
        image: hiw4Image,
      },
      sampleTools1: {
        heading: sampleTools1.heading,
        icon: sampleTools1Icon,
        text: sampleTools1.text,
        video: sampleTools1Video,
        thumbnail: sampleTools1Thumbnail,
      },
      sampleTools2: {
        heading: sampleTools2.heading,
        icon: sampleTools2Icon,
        text: sampleTools2.text,
        video: sampleTools2Video,
        thumbnail: sampleTools2Thumbnail,
      },
      creationStory: {
        heading: creationStory.heading,
        text: creationStory.text,
        buttonText: creationStory.buttonText,
        video: creationStoryVideo,
        thumbnail: creationStoryThumbnail,
      },
      vibeBloomApp: {
        heading: vibeBloomApp.heading,
        text: vibeBloomApp.text,
        buttonText: vibeBloomApp.buttonText,
        video: vibeBloomAppVideo,
        thumbnail: vibeBloomAppThumbnail,
      },
      teacher: {
        heading: teacher.heading,
        text: teacher.text,
        buttonText: teacher.buttonText,
        video: teacherVideo,
        thumbnail: teacherThumbnail,
      },
    });

    return res.status(201).json({
      status: "success",
      homePage,
    });
    //   /******************* */
  } catch (err) {
    next(err);
  }
};

exports.updateHomePage = async (req, res, next) => {
  try {
    const homePage = await HomePage.find();
    let {
      headerImage,
      embodyingYourFullness,
      comingHomeTogether,
      hiw1,
      hiw2,
      hiw3,
      hiw4,
      sampleTools1,
      sampleTools2,
      creationStory,
      vibeBloomApp,
      teacher,
    } = homePage[0];

    // Header Image
    if (req.files["headerImage"]) {
      headerImage = `uploads/${
        path.parse(headerImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(headerImage);
      headerImage = req.files["headerImage"][0]?.path;
    }

    // Embodying Your Fullness
    let embodyingYourFullnessVideo = null;
    if (req.files["embodyingYourFullness[video]"]) {
      embodyingYourFullnessVideo = `uploads/${
        path.parse(embodyingYourFullness?.video?.split("uploads/")[1]).name
      }`;
      console.log("embody video", embodyingYourFullness);
      deleteFromCloduinary(embodyingYourFullnessVideo, "video");
      embodyingYourFullnessVideo =
        req.files["embodyingYourFullness[video]"][0]?.path;
    } else {
      embodyingYourFullnessVideo = homePage[0].embodyingYourFullness.video;
    }
    let embodyingYourFullnessThumbnail = null;
    if (req.files["embodyingYourFullness[thumbnail]"]) {
      // console.log("embody thumbnail", embodyingYourFullness);
      embodyingYourFullnessThumbnail = `uploads/${
        path.parse(embodyingYourFullness?.thumbnail?.split("uploads/")[1]).name
      }`;
      console.log("embodying thumbnail", embodyingYourFullnessThumbnail);
      deleteFromCloduinary(embodyingYourFullnessThumbnail);
      embodyingYourFullnessThumbnail =
        req.files["embodyingYourFullness[thumbnail]"][0]?.path;
    } else {
      embodyingYourFullnessThumbnail =
        homePage[0].embodyingYourFullness.thumbnail;
    }
    let embodyingYourFullnessText = req?.body?.embodyingYourFullness?.text
      ? req?.body?.embodyingYourFullness.text
      : homePage[0].embodyingYourFullness.text;

    // Coming Home Together
    let comingHomeTogetherVideo = null;
    if (req.files["comingHomeTogether[video]"]) {
      console.log("cmng home video", comingHomeTogether);
      comingHomeTogetherVideo = `uploads/${
        path.parse(comingHomeTogether?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(comingHomeTogetherVideo, "video");
      comingHomeTogetherVideo = req.files["comingHomeTogether[video]"][0]?.path;
    } else {
      comingHomeTogetherVideo = homePage[0].comingHomeTogether.video;
    }
    let comingHomeTogetherThumbnail = null;
    if (req.files["comingHomeTogether[thumbnail]"]) {
      comingHomeTogetherThumbnail = `uploads/${
        path.parse(comingHomeTogether?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(comingHomeTogetherThumbnail);
      comingHomeTogetherThumbnail =
        req.files["comingHomeTogether[thumbnail]"][0]?.path;
    } else {
      comingHomeTogetherThumbnail = homePage[0].comingHomeTogether.thumbnail;
    }
    let comingHomeTogetherText = req?.body?.comingHomeTogether?.text
      ? req?.body?.comingHomeTogether.text
      : homePage[0].comingHomeTogether.text;

    // hiw1
    let hiw1Image = null;
    if (req.files["hiw1[image]"]) {
      hiw1Image = `uploads/${
        path.parse(hiw1?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(hiw1Image);
      hiw1Image = req.files["hiw1[image]"][0]?.path;
    } else {
      hiw1Image = homePage[0].hiw1.image;
    }
    let hiw1Text = req?.body?.hiw1?.text
      ? req?.body?.hiw1.text
      : homePage[0].hiw1.text;

    // hiw2
    let hiw2Image = null;
    if (req.files["hiw2[image]"]) {
      hiw2Image = `uploads/${
        path.parse(hiw2?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(hiw2Image);
      hiw2Image = req.files["hiw2[image]"][0]?.path;
    } else {
      hiw2Image = homePage[0].hiw2.image;
    }
    let hiw2Text = req?.body?.hiw2?.text
      ? req?.body?.hiw2.text
      : homePage[0].hiw2.text;

    // hiw3
    let hiw3Image = null;
    if (req.files["hiw3[image]"]) {
      hiw3Image = `uploads/${
        path.parse(hiw3?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(hiw3Image);
      hiw3Image = req.files["hiw3[image]"][0]?.path;
    } else {
      hiw3Image = homePage[0].hiw3.image;
    }
    let hiw3Text = req?.body?.hiw3?.text
      ? req?.body?.hiw3.text
      : homePage[0].hiw3.text;

    // hiw4
    let hiw4Image = null;
    if (req.files["hiw4[image]"]) {
      hiw4Image = `uploads/${
        path.parse(hiw4?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(hiw4Image);
      hiw4Image = req.files["hiw4[image]"][0]?.path;
    } else {
      hiw4Image = homePage[0].hiw4.image;
    }
    let hiw4Text = req?.body?.hiw4?.text
      ? req?.body?.hiw4.text
      : homePage[0].hiw4.text;

    // Sample Tools 1
    // let sampleTools1Video = null;
    let sampleTools1Video = null;
    if (req.files["sampleTools1[video]"]) {
      sampleTools1Video = `uploads/${
        path.parse(sampleTools1?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(sampleTools1Video, "video");
      sampleTools1Video = req.files["sampleTools1[video]"][0]?.path;
    } else {
      sampleTools1Video = homePage[0].sampleTools1.video;
    }
    let sampleTools1Thumbnail = null;
    if (req.files["sampleTools1[thumbnail]"]) {
      sampleTools1Thumbnail = `uploads/${
        path.parse(sampleTools1?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(sampleTools1Thumbnail);
      sampleTools1Thumbnail = req.files["sampleTools1[thumbnail]"][0]?.path;
    } else {
      sampleTools1Thumbnail = homePage[0].sampleTools1.thumbnail;
    }
    let sampleTools1Text = req?.body?.sampleTools1?.text
      ? req?.body?.sampleTools1.text
      : homePage[0].sampleTools1.text;

    // Sample Tools 2
    let sampleTools2Video = null;
    if (req.files["sampleTools2[video]"]) {
      sampleTools2Video = `uploads/${
        path.parse(sampleTools2?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(sampleTools2Video, "video");
      sampleTools2Video = req.files["sampleTools2[video]"][0]?.path;
    } else {
      sampleTools2Video = homePage[0].sampleTools2.video;
    }
    let sampleTools2Thumbnail = null;
    if (req.files["sampleTools2[thumbnail]"]) {
      sampleTools2Thumbnail = `uploads/${
        path.parse(sampleTools2?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(sampleTools2Thumbnail);
      sampleTools2Thumbnail = req.files["sampleTools2[thumbnail]"][0]?.path;
    } else {
      sampleTools2Thumbnail = homePage[0].sampleTools2.thumbnail;
    }
    let sampleTools2Text = req?.body?.sampleTools2?.text
      ? req?.body?.sampleTools2.text
      : homePage[0].sampleTools2.text;

    // Creation Story
    let creationStoryVideo = null;
    if (req.files["creationStory[video]"]) {
      creationStoryVideo = `uploads/${
        path.parse(creationStory?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(creationStoryVideo, "video");
      creationStoryVideo = req.files["creationStory[video]"][0]?.path;
    } else {
      creationStoryVideo = homePage[0].creationStory.video;
    }
    let creationStoryThumbnail = null;
    if (req.files["creationStory[thumbnail]"]) {
      creationStoryThumbnail = `uploads/${
        path.parse(creationStory?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(creationStoryThumbnail);
      creationStoryThumbnail = req.files["creationStory[thumbnail]"][0]?.path;
    } else {
      creationStoryThumbnail = homePage[0].creationStory.thumbnail;
    }
    let creationStoryText = req?.body?.creationStory?.text
      ? req?.body?.creationStory.text
      : homePage[0].creationStory.text;

    // VibeBloom App
    let vibeBloomAppVideo = null;
    if (req.files["vibeBloomApp[video]"]) {
      vibeBloomAppVideo = `uploads/${
        path.parse(vibeBloomApp?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(vibeBloomAppVideo, "video");
      vibeBloomAppVideo = req.files["vibeBloomApp[video]"][0]?.path;
    } else {
      vibeBloomAppVideo = homePage[0].vibeBloomApp.video;
    }
    let vibeBloomAppThumbnail = null;
    if (req.files["vibeBloomApp[thumbnail]"]) {
      vibeBloomAppThumbnail = `uploads/${
        path.parse(vibeBloomApp?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(vibeBloomAppThumbnail);
      vibeBloomAppThumbnail = req.files["vibeBloomApp[thumbnail]"][0]?.path;
    } else {
      vibeBloomAppThumbnail = homePage[0].vibeBloomApp.thumbnail;
    }
    let vibeBloomAppText = req?.body?.vibeBloomApp?.text
      ? req?.body?.vibeBloomApp.text
      : homePage[0].vibeBloomApp.text;

    // Teacher
    // let teacherVideo = null;
    let teacherVideo = null;
    if (req.files["teacher[video]"]) {
      teacherVideo = `uploads/${
        path.parse(teacher?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(teacherVideo, "video");
      teacherVideo = req.files["teacher[video]"][0]?.path;
    } else {
      teacherVideo = homePage[0].teacher.video;
    }
    let teacherThumbnail = null;
    if (req.files["teacher[thumbnail]"]) {
      teacherThumbnail = `uploads/${
        path.parse(teacher?.thumbnail?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(teacherThumbnail);
      teacherThumbnail = req.files["teacher[thumbnail]"][0]?.path;
    } else {
      teacherThumbnail = homePage[0].teacher.thumbnail;
    }
    let teacherText = req?.body?.teacher?.text
      ? req?.body?.teacher.text
      : homePage[0].teacher.text;

    const updatedHomePage = await HomePage.findByIdAndUpdate(
      homePage[0]._id,
      {
        ...req.body,
        headerImage,
        embodyingYourFullness: {
          text: embodyingYourFullnessText,
          video: embodyingYourFullnessVideo,
          thumbnail: embodyingYourFullnessThumbnail,
        },
        comingHomeTogether: {
          text: comingHomeTogetherText,
          video: comingHomeTogetherVideo,
          thumbnail: comingHomeTogetherThumbnail,
        },
        hiw1: {
          text: hiw1Text,
          image: hiw1Image,
        },
        hiw2: {
          text: hiw2Text,
          image: hiw2Image,
        },
        hiw3: {
          text: hiw3Text,
          image: hiw3Image,
        },
        hiw4: {
          text: hiw4Text,
          image: hiw4Image,
        },
        sampleTools1: {
          text: sampleTools1Text,
          video: sampleTools1Video,
          thumbnail: sampleTools1Thumbnail,
        },
        sampleTools2: {
          text: sampleTools2Text,
          video: sampleTools2Video,
          thumbnail: sampleTools2Thumbnail,
        },
        creationStory: {
          text: creationStoryText,
          video: creationStoryVideo,
          thumbnail: creationStoryThumbnail,
        },
        vibeBloomApp: {
          text: vibeBloomAppText,
          video: vibeBloomAppVideo,
          thumbnail: vibeBloomAppThumbnail,
        },
        teacher: {
          text: teacherText,
          video: teacherVideo,
          thumbnail: teacherThumbnail,
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedHomePage,
    });
    // \&sjoqskqo
  } catch (err) {
    next(err);
  }
};

exports.getHomePage = async (req, res, next) => {
  try {
    const homePage = await HomePage.find();
    if (!homePage)
      return generateError(req, res, 400, "failed to find homepage");

    return res.status(200).json({
      status: "success",
      data: homePage[0],
    });
  } catch (err) {
    next(err);
  }
};
