const User = require("../db/models/UserSchema");
const TableData = require("../db/models/TableData");

const registerUser = async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return { error: "All fields are required" };
    }
    // Create a new user
    const newUser = new User({
      userName,
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userObj = await User.findById(userId);
    if (userObj) {
      userObj.addApiCount = 0;
      userObj.updateApiCount = 0;
      await userObj.save();
      return res.status(201).json(userObj);
    } else {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTableData = async (req, res) => {
  try {
    const { firstName, lastName, userId } = req.body;
    if (!firstName || !lastName || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findById(userId);
    if (user) {
      user.addApiCount += 1;
      await user.save();
    } else {
      return res.status(404).json({ error: "user not found" });
    }
    const tableDataObj = new TableData(req.body);
    await tableDataObj.save();
    return res.status(201).json(tableDataObj);
  } catch (error) {
    console.error("Error during adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTableData = async (req, res) => {
  try {
    const { firstName, lastName, userId } = req.body;
    const tableDataObjId = req.params.dataObjId;
    if (!firstName || !lastName || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findById(userId);
    if (user) {
      user.updateApiCount += 1;
      await user.save();
    } else {
      return res.status(404).json({ error: "user not found" });
    }
    const tableDataObj = await TableData.findById(tableDataObjId);
    if (tableDataObj) {
      const updatedTableDataObj = await TableData.findByIdAndUpdate(
        tableDataObjId,
        req.body,
        { new: true }
      );
      return res.status(201).json(updatedTableDataObj);
    } else {
      return res.status(404).json({ error: "table data details not found" });
    }
  } catch (error) {
    console.error("Error during adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, getUser, addTableData, updateTableData };
