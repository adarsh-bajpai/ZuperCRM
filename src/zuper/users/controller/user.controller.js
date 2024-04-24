const userSchema = require("../model/user.model");
const response = require("../../../helper/httpResposne");
const { generateUniqueID } = require("../../../utils/uniqueID");
const { isEmailValid } = require("../../../utils/validator");

exports.createUser = async (req, res) => {
  const {
    roleId,
    empCode,
    firstName,
    lastName,
    designation,
    password,
    confirmPassword,
    workPhoneNumber,
    homePhoneNumber,
    mobilePhoneNumber,
  } = req.body;
  try {

    const emailIsValid = isEmailValid(req.body.email);
    const externalLoginIdIsValid = isEmailValid(req.body.externalLoginId);

    if (!emailIsValid || !externalLoginIdIsValid) {
      throw new Error("Invalid email format.");
    }

    const userdetails = new userSchema({
      roleId,
      empCode,
      firstName,
      lastName,
      email: emailIsValid == true ? req.body.email: "Error",
      designation,
      password,
      confirmPassword,
      workPhoneNumber,
      homePhoneNumber,
      mobilePhoneNumber,
      externalLoginId: externalLoginIdIsValid == true ? req.body.email: "Error",
      teamUid: generateUniqueID(),
    });
    await userdetails.save();
    res
      .status(response.HTTP_CREATED)
      .json({
        success: true,
        message: "user sucessfully created!",
        data: userdetails,
      });
  } catch (error) {
    console.log("Error ---", error)
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};
