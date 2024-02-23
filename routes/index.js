const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  addTableData,
  updateTableData,
  getTableDataBuUserId,
} = require("../controller/index");

// user routes
router.post("/user", registerUser);
router.get("/user/:userId", getUser);

//table data routes
router.post("/tabledata", addTableData);
router.patch("/tabledata/:tableId", updateTableData);
router.get("/tabledata/:userId", getTableDataBuUserId);

module.exports = router;
