const router = require("express").Router();
const {
  registerUser,
  getUser,
  addTableData,
  updateTableData
} = require("../controller/index");


router.route("/user-signup").post(registerUser);
router.route("/fetchuserbyid/:userId").get(getUser);
router.route("/add-tabledata").post(addTableData);
router.route("/update-tabledata/:dataObjId").patch(updateTableData);




module.exports = router;
