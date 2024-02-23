const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  addTableData,
  updateTableData,
} = require("../controller/index");


router.post("/user-signup", registerUser);
router.get("/fetchuserbyid/:userId", getUser);
router.post("/add-tabledata", addTableData);
router.patch("/update-tabledata/:dataObjId", updateTableData);

module.exports = router;
