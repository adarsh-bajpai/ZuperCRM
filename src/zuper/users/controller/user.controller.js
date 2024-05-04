const userSchema = require("../model/user.model");
const response = require("../../../helper/httpResposne");
const { generateUniqueID } = require("../../../utils/uniqueID");
const { isEmailValid } = require("../../../utils/validator");
const { userRoles } = require("../../../utils/validator");
const { employeeCode } = require("../../../utils/increment");

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

    const isRolesValid = userRoles(req.body.roleId);

    if (!isRolesValid) {
      throw new Error("Invalid Role");
    }
    const roleId = req.body.roleId;
    let roleDetails;

    switch (roleId) {
      case 1:
        roleDetails = { roleName: "Admin", roleID: "A1" };
        break;
      case 2:
        roleDetails = { roleName: "Employee", roleID: "A2" };
        break;
      default:
        roleDetails = { roleName: "Visitor", roleID: "A3" };
    }

    const nextEmpCode = await employeeCode();

    const userdetails = new userSchema({
      roleId: isRolesValid == true ? req.body.roleId : "Error",
      roleDetails,
      firstName,
      lastName,
      email: emailIsValid == true ? req.body.email : "Error",
      designation,
      password,
      confirmPassword,
      workPhoneNumber,
      homePhoneNumber,
      mobilePhoneNumber,
      externalLoginId:
        externalLoginIdIsValid == true ? req.body.email : "Error",
      teamUid: generateUniqueID(),
      accountActivation: true,
      profilePicture: `http://${
        process.env.IMAGE_LOCAL
      }${req.file.path.replaceAll("\\", "/")}`,
    });

    userdetails.empCode = nextEmpCode;
    await userdetails.save();
    res.status(response.HTTP_CREATED).json({
      success: true,
      message: "user successfully created!",
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
    const getUserData = await userSchema.find({ accountActivation: true });
    res.status(response.HTTP_ACCEPTED).json({
      success: true,
      message: "user details",
      total: getUserData.length,
      data: getUserData,
    });
  } catch (error) {
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

// Update Specific User - get the id of the user and rest

/*  PUT is used for full updates, where you replace the entire resource with a new representation, while PATCH is used for partial updates, where you modify specific parts of the resource while leaving the rest unchanged */

exports.updateSpecificUser = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    designation,
    workPhoneNumber,
    homePhoneNumber,
    mobilePhoneNumber,
  } = req.body;

  try {
    const getUserDetails = await userSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
          designation,
          workPhoneNumber,
          homePhoneNumber,
          mobilePhoneNumber,
        },
      },
      { new: true }
    );
    res.status(response.HTTP_ACCEPTED).json({
      success: true,
      message: "user updated successfully!",
      data: getUserDetails,
    });
  } catch (error) {
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

// Remove Specific User

exports.deactivateUser = async (req, res) => {
  const { id } = req.body;

  try {
    const fetchDetailsOfUser = await userSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          accountActivation: false,
        },
      },
      { new: true }
    );
    res.status(response.HTTP_ACCEPTED).json({
      success: true,
      message: "user removed successfully!",
    });
  } catch (error) {
    res
      .status(response.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};
