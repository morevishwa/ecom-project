const bcrypt = require("bcrypt");
const encryptPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    // console.log("encryptPassword  req.body:", req.body);

    // console.log("encryptPassword  password:", password);

    // console.log("encryptPassword  password:", password);
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // console.log("encryptPassword  hashedPassword:", hashedPassword);
    // (async () => {
      // Technique 1 (generate a salt and hash on separate function calls):
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Store hash in your password DB.
      res.locals.hashedPassword = hashedPassword;

      // Technique 2 (auto-gen a salt and hash):
      // const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
      // Store hash in your password DB.
    // })();

    next();
  } catch (error) {
    console.error("Error encrypting password:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = encryptPassword;
