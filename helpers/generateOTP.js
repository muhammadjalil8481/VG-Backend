module.exports = function generateOTP() {
  // Declare a string variable which stores all string
  let string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let otp = "";

  // Find the length of string
  // let len = string.length;
  for (let i = 0; i < 6; i++) {
    otp += string[Math.floor(Math.random() * string.length)];
  }
  return otp;
};
