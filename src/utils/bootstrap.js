const {  Admin } = require("../models/index");
const Run = async () => {
  /*-------------------------------------------------------------------------------
   * add admin
   * -----------------------------------------------------------------------------*/
  let password = "$2a$08$8QBeUqrXcf334kMMrDS1euP5nbn00MZpP5Yi4PBucI9MIdASz8qDC";

  let adminDetails = {
    name: "SportEx Admin",
    email: "admin@test.com",
    isSubAdmin: false,
    $setOnInsert: { password },
  };
  CreateAdmin(adminDetails);
};

const CreateAdmin = async (adminDetails) => {
  try {
    let adminData = await Admin.findOneAndUpdate(
      { email: adminDetails.email },
      adminDetails,
      { lean: true, upsert: true, new: true }
    );

    console.log("=================");

    return adminData;
  } catch (err) {
    console.log(
      "**********************************************************************",
      err
    );
  }
};

module.exports = Run;
