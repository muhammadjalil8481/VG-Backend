const HomePage = require("../models/HomePageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

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

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    const headerImage = req.files["headerImage"][0].filename;
    let embodyingYourFullnessVideo =
      req.files["embodyingYourFullness[video]"][0].filename;
    let embodyingYourFullnessThumbnail =
      req.files["embodyingYourFullness[thumbnail]"][0].filename;
    let comingHomeTogetherVideo =
      req.files["comingHomeTogether[video]"][0].filename;
    let comingHomeTogetherThumbnail =
      req.files["comingHomeTogether[thumbnail]"][0].filename;
    let hiw1Image = req.files["hiw1[image]"][0].filename;
    let hiw2Image = req.files["hiw2[image]"][0].filename;
    let hiw3Image = req.files["hiw3[image]"][0].filename;
    let hiw4Image = req.files["hiw4[image]"][0].filename;
    let sampleTools1Video = req.files["sampleTools1[video]"][0].filename;
    let sampleTools1Thumbnail =
      req.files["sampleTools1[thumbnail]"][0].filename;
    let sampleTools2Video = req.files["sampleTools2[video]"][0].filename;
    let sampleTools2Thumbnail =
      req.files["sampleTools2[thumbnail]"][0].filename;
    let creationStoryVideo = req.files["creationStory[video]"][0].filename;
    let creationStoryThumbnail =
      req.files["creationStory[thumbnail]"][0].filename;
    let vibeBloomAppVideo = req.files["sampleTools1[thumbnail]"][0].filename;
    let vibeBloomAppThumbnail =
      req.files["sampleTools1[thumbnail]"][0].filename;
    let teacherVideo = req.files["teacher[video]"][0].filename;
    let teacherThumbnail = req.files["teacher[thumbnail]"][0].filename;

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
        text: embodyingYourFullness.text,
        video: `${basePath}${embodyingYourFullnessVideo}`,
        thumbnail: `${basePath}${embodyingYourFullnessThumbnail}`,
      },
      comingHomeTogether: {
        text: comingHomeTogether.text,
        video: `${basePath}${comingHomeTogetherVideo}`,
        thumbnail: `${basePath}${comingHomeTogetherThumbnail}`,
      },
      hiw1: {
        text: hiw1.text,
        image: `${basePath}${hiw1Image}`,
      },
      hiw2: {
        text: hiw2.text,
        image: `${basePath}${hiw2Image}`,
      },
      hiw3: {
        text: hiw3.text,
        image: `${basePath}${hiw3Image}`,
      },
      hiw4: {
        text: hiw4.text,
        image: `${basePath}${hiw4Image}`,
      },
      sampleTools1: {
        text: sampleTools1.text,
        video: `${basePath}${sampleTools1Video}`,
        thumbnail: `${basePath}${sampleTools1Thumbnail}`,
      },
      sampleTools2: {
        text: sampleTools2.text,
        video: `${basePath}${sampleTools2Video}`,
        thumbnail: `${basePath}${sampleTools2Thumbnail}`,
      },
      creationStory: {
        text: creationStory.text,
        video: `${basePath}${creationStoryVideo}`,
        thumbnail: `${basePath}${creationStoryThumbnail}`,
      },
      vibeBloomApp: {
        text: vibeBloomApp.text,
        video: `${basePath}${vibeBloomAppVideo}`,
        thumbnail: `${basePath}${vibeBloomAppThumbnail}`,
      },
      teacher: {
        text: teacher.text,
        video: `${basePath}${teacherVideo}`,
        thumbnail: `${basePath}${teacherThumbnail}`,
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
    } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    // Header Image
    if (req.files["headerImage"]) {
      let path = homePage[0].headerImage.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      const headerImageFile = req.files["headerImage"][0].filename;
      headerImage = `${basePath}${headerImageFile}`;
    }

    // Embodying Your Fullness
    let embodyingYourFullnessVideo = null;
    if (req.files["embodyingYourFullness[video]"]) {
      let path = homePage[0].embodyingYourFullness.video
        .split("/uploads")
        .pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      embodyingYourFullnessVideo =
        req.files["embodyingYourFullness[video]"][0].filename;
      embodyingYourFullnessVideo = `${basePath}${embodyingYourFullnessVideo}`;
    } else {
      embodyingYourFullnessVideo = homePage[0].embodyingYourFullness.video;
    }
    let embodyingYourFullnessThumbnail = null;
    if (req.files["embodyingYourFullness[thumbnail]"]) {
      let path = homePage[0].embodyingYourFullness.thumbnail
        .split("/uploads")
        .pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      embodyingYourFullnessThumbnail =
        req.files["embodyingYourFullness[thumbnail]"][0].filename;
      embodyingYourFullnessThumbnail = `${basePath}${embodyingYourFullnessThumbnail}`;
    } else {
      embodyingYourFullnessThumbnail =
        homePage[0].embodyingYourFullness.thumbnail;
    }
    let embodyingYourFullnessText = embodyingYourFullness?.text
      ? embodyingYourFullness.text
      : homePage[0].embodyingYourFullness.text;

    // Coming Home Together
    let comingHomeTogetherVideo = null;
    if (req.files["comingHomeTogether[video]"]) {
      let path = homePage[0].comingHomeTogether.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      comingHomeTogetherVideo =
        req.files["comingHomeTogether[video]"][0].filename;
      comingHomeTogetherVideo = `${basePath}${comingHomeTogetherVideo}`;
    } else {
      comingHomeTogetherVideo = homePage[0].comingHomeTogether.video;
    }
    let comingHomeTogetherThumbnail = null;
    if (req.files["comingHomeTogether[thumbnail]"]) {
      let path = homePage[0].comingHomeTogether.thumbnail
        .split("/uploads")
        .pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      comingHomeTogetherThumbnail =
        req.files["comingHomeTogether[thumbnail]"][0].filename;
      comingHomeTogetherThumbnail = `${basePath}${comingHomeTogetherThumbnail}`;
    } else {
      comingHomeTogetherThumbnail = homePage[0].comingHomeTogether.thumbnail;
    }
    let comingHomeTogetherText = comingHomeTogether?.text
      ? comingHomeTogether.text
      : homePage[0].comingHomeTogether.text;

    // hiw1
    let hiw1Image = null;
    if (req.files["hiw1[image]"]) {
      let path = homePage[0].hiw1.image.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      hiw1Image = req.files["hiw1[image]"][0].filename;
      hiw1Image = `${basePath}${hiw1Image}`;
    } else {
      hiw1Image = homePage[0].hiw1.image;
    }
    let hiw1Text = hiw1?.text ? hiw1.text : homePage[0].hiw1.text;

    // hiw2
    let hiw2Image = null;
    if (req.files["hiw2[image]"]) {
      let path = homePage[0].hiw2.image.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      hiw2Image = req.files["hiw2[image]"][0].filename;
      hiw2Image = `${basePath}${hiw2Image}`;
    } else {
      hiw2Image = homePage[0].hiw2.image;
    }
    let hiw2Text = hiw2?.text ? hiw2.text : homePage[0].hiw2.text;

    // hiw3
    let hiw3Image = null;
    if (req.files["hiw3[image]"]) {
      let path = homePage[0].hiw3.image.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      hiw3Image = req.files["hiw3[image]"][0].filename;
      hiw3Image = `${basePath}${hiw3Image}`;
    } else {
      hiw3Image = homePage[0].hiw3.image;
    }
    let hiw3Text = hiw3?.text ? hiw3.text : homePage[0].hiw3.text;

    // hiw4
    let hiw4Image = null;
    if (req.files["hiw4[image]"]) {
      let path = homePage[0].hiw4.image.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      hiw4Image = req.files["hiw4[image]"][0].filename;
      hiw4Image = `${basePath}${hiw4Image}`;
    } else {
      hiw4Image = homePage[0].hiw4.image;
    }
    let hiw4Text = hiw4?.text ? hiw4.text : homePage[0].hiw4.text;

    // Sample Tools 1
    let sampleTools1Video = null;
    if (req.files["sampleTools1[video]"]) {
      let path = homePage[0].sampleTools1.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      sampleTools1Video = req.files["sampleTools1[video]"][0].filename;
      sampleTools1Video = `${basePath}${sampleTools1Video}`;
    } else {
      sampleTools1Video = homePage[0].sampleTools1.video;
    }
    let sampleTools1Thumbnail = null;
    if (req.files["sampleTools1[thumbnail]"]) {
      let path = homePage[0].sampleTools1.thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      sampleTools1Thumbnail = req.files["sampleTools1[thumbnail]"][0].filename;
      sampleTools1Thumbnail = `${basePath}${sampleTools1Thumbnail}`;
    } else {
      sampleTools1Thumbnail = homePage[0].sampleTools1.thumbnail;
    }
    let sampleTools1Text = sampleTools1?.text
      ? sampleTools1.text
      : homePage[0].sampleTools1.text;

    // Sample Tools 2
    let sampleTools2Video = null;
    if (req.files["sampleTools2[video]"]) {
      let path = homePage[0].sampleTools2.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      sampleTools2Video = req.files["sampleTools2[video]"][0].filename;
      sampleTools2Video = `${basePath}${sampleTools2Video}`;
    } else {
      sampleTools2Video = homePage[0].sampleTools2.video;
    }
    let sampleTools2Thumbnail = null;
    if (req.files["sampleTools2[thumbnail]"]) {
      let path = homePage[0].sampleTools2.thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      sampleTools2Thumbnail = req.files["sampleTools2[thumbnail]"][0].filename;
      sampleTools2Thumbnail = `${basePath}${sampleTools2Thumbnail}`;
    } else {
      sampleTools2Thumbnail = homePage[0].sampleTools2.thumbnail;
    }
    let sampleTools2Text = sampleTools2?.text
      ? sampleTools2.text
      : homePage[0].sampleTools2.text;

    // Creation Story
    let creationStoryVideo = null;
    if (req.files["creationStory[video]"]) {
      let path = homePage[0].creationStory.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      creationStoryVideo = req.files["creationStory[video]"][0].filename;
      creationStoryVideo = `${basePath}${creationStoryVideo}`;
    } else {
      creationStoryVideo = homePage[0].creationStory.video;
    }
    let creationStoryThumbnail = null;
    if (req.files["creationStory[thumbnail]"]) {
      let path = homePage[0].creationStory.thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      creationStoryThumbnail =
        req.files["creationStory[thumbnail]"][0].filename;
      creationStoryThumbnail = `${basePath}${creationStoryThumbnail}`;
    } else {
      creationStoryThumbnail = homePage[0].creationStory.thumbnail;
    }
    let creationStoryText = creationStory?.text
      ? creationStory.text
      : homePage[0].creationStory.text;

    // VibeBloom App
    let vibeBloomAppVideo = null;
    if (req.files["vibeBloomApp[video]"]) {
      let path = homePage[0].vibeBloomApp.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      vibeBloomAppVideo = req.files["vibeBloomApp[video]"][0].filename;
      vibeBloomAppVideo = `${basePath}${vibeBloomAppVideo}`;
    } else {
      vibeBloomAppVideo = homePage[0].vibeBloomApp.video;
    }
    let vibeBloomAppThumbnail = null;
    if (req.files["vibeBloomApp[thumbnail]"]) {
      let path = homePage[0].vibeBloomApp.thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      vibeBloomAppThumbnail = req.files["vibeBloomApp[thumbnail]"][0].filename;
      vibeBloomAppThumbnail = `${basePath}${vibeBloomAppThumbnail}`;
    } else {
      vibeBloomAppThumbnail = homePage[0].vibeBloomApp.thumbnail;
    }
    let vibeBloomAppText = vibeBloomApp?.text
      ? vibeBloomApp.text
      : homePage[0].vibeBloomApp.text;

    // Teacher
    let teacherVideo = null;
    if (req.files["teacher[video]"]) {
      let path = homePage[0].teacher.video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      teacherVideo = req.files["teacher[video]"][0].filename;
      teacherVideo = `${basePath}${teacherVideo}`;
    } else {
      teacherVideo = homePage[0].teacher.video;
    }
    let teacherThumbnail = null;
    if (req.files["teacher[thumbnail]"]) {
      let path = homePage[0].teacher.thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      teacherThumbnail = req.files["teacher[thumbnail]"][0].filename;
      teacherThumbnail = `${basePath}${teacherThumbnail}`;
    } else {
      teacherThumbnail = homePage[0].teacher.thumbnail;
    }
    let teacherText = teacher?.text ? teacher.text : homePage[0].teacher.text;

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
      homepage: homePage[0],
    });
  } catch (err) {
    next(err);
  }
};
