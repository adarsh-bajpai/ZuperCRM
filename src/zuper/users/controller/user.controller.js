const userSchema = require("../model/user.model");
const response = require("../../../helper/httpResposne");
const { generateUniqueID } = require("../../../utils/uniqueID");
const { isEmailValid } = require("../../../utils/validator");
const { userRoles } = require('../../../utils/validator');
const { employeeCode } =  require('../../../utils/increment');

// Create user

exports.createUser = async (req, res) => {
  const {
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

    const isRolesValid = userRoles(req.body.roleId)

    if(!isRolesValid){
      throw new Error("Invalid Role")
    }

    const nextEmpCode = await employeeCode();

    const userdetails = new userSchema({
      roleId: isRolesValid == true ? req.body.roleId: "Error",
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

    userdetails.empCode = nextEmpCode;
    await userdetails.save();
    res
      .status(response.HTTP_CREATED)
      .json({
        success: true,
        message: "user sucessfully created!",
        data: userdetails,
      });
  } catch (error) {
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

// Get All Users

exports.getAllUsers = async (req, res) => {
  try {
    const getUserData = await userSchema.find({})
    console.log("-getuserData---",getUserData);
    res
      .status(response.HTTP_ACCEPTED)
      .json({
        success: true,
        message: "user details",
        total: getUserData.length,
        data: getUserData
      })
  } catch (error) {
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
}