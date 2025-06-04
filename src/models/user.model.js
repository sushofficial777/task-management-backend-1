const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      sparse: true  
    },
    gender: { type: String, required: false },
    password: { type: String, required: true },
    profileImageUrl: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", 
    },
  },
  {timestamps: true,}
);
UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("users", UserSchema);

module.exports = User;
