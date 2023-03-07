const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Tous les champs doivent être remplis");
  }
  if (!validator.isEmail(email)) {
    throw Error("E-mail non valide");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("E-mail déjà utilisé, essayez avec un autre e-mail");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Mot de passe pas assez fort"); // à optimiser
  }

  //adding some character to the password //10: saltRounds
  const salt = await bcrypt.genSalt(10);

  //hashing user password
  const hash = await bcrypt.hash(password, salt);

  //create new user with the email and the hashed password
  const user = await this.create({ email, password: hash });

  return user;
};

//validation à optimiser (email valide)
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Tous les champs doivent être remplis.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("E-mail ou mot de passe incorrecte.");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("E-mail ou mot de passe incorrecte.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
