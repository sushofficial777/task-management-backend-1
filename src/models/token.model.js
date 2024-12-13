const mongoose = require("mongoose");
const {
  TOKEN_TYPE,
  DEVICE_TYPE,
  USER_TYPE,
} = require("../config/appConstants");

const tokenSchema = mongoose.Schema(
  {
    token: { type: String},
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    admin: { type: mongoose.SchemaTypes.ObjectId, ref: "admins" },
   
    role: { type: String, enum: [...Object.values(USER_TYPE)], required: true },
    type: {
      type: String,
      enum: [...Object.values(TOKEN_TYPE)],
      required: true,
    },
    expires: { type: Date, required: true },
    device: {
      type: {
        type: String,
        enum: [...Object.values(DEVICE_TYPE)],
      },
      token: { type: String },
      id: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index({ isDeleted: 1 });
tokenSchema.index({ "device.id": 1 });

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
