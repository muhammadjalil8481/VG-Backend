const User = require("../models/UserModel");

module.exports = async () => {
  try {
    const today = new Date();
    const aMinuteLess = new Date(today.getTime() - 1000 * 60 * 20);
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const docs = await User.deleteMany({
      createdAt: { $lt: aMinuteLess },
      verified: false,
    });

    console.log(time, "deleting unverified users");
  } catch (err) {
    console.log(err.message);
  }
};
