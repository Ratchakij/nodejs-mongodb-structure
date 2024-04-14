// Manage user information in the database such as MongoDB, MySQL, PostgreSQL, etc
const User = require("../models/User");

exports.findUserByEmail = (email) => User.findOne({ email: email });

// save() ต้องสร้างอ็อบเจ็กต์โมเดลด้วย new ก่อน const newUser = new User(userData); newUser.save()
// create() จะสร้างและบันทึกอ็อบเจ็กต์ในขั้นตอนเดียวกัน
exports.createUser = (newUser) => User.create(newUser);

exports.findUserById = (id) => User.findById(id);

exports.updateUserById = (id, updateUser) =>
  User.findByIdAndUpdate(id, updateUser, { new: true }); // { new: true } Return date after updated
