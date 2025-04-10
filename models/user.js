const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = require("mongoose");

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is new/modified
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
      next();
    } catch (err) {
      next(err);
    }
  });
  
module.exports = mongoose.model("User", userSchema);

