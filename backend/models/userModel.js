const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    EMAIL: {
      type: String,
      required: true,
      unique: true,
    },
    PASSWORD: {
      type: String,
      required: true,
    },
  },
  { collection: "user" },
  { timestamps: true }
);

userSchema.statics.signup = async function (EMAIL, PASSWORD, PROFIL, NOM, CLE) {
  // validation
  if (!EMAIL || !PASSWORD) {
    throw Error("Tous les champs obligatoires doivent être remplis!");
  }
  if (!validator.isEmail(EMAIL)) {
    throw Error("E-mail non valide");
  }
  const exists = await this.findOne({ EMAIL });
  if (exists) {
    throw Error("E-mail déjà utilisé, essayez avec un autre e-mail");
  }

  if (!validator.isStrongPassword(PASSWORD)) {
    throw Error("Mot de passe pas assez fort"); // à optimiser
  }

  //adding some character to the PASSWORD //10: saltRounds
  const salt = await bcrypt.genSalt(10);

  //hashing user PASSWORD
  const hash = await bcrypt.hash(PASSWORD, salt);

  //create new user with the email and the hashed PASSWORD
  const user = await this.create({ EMAIL, PASSWORD: hash, PROFIL, NOM, CLE });

  return user;
};

//validation à optimiser (email valide)
userSchema.statics.login = async function (EMAIL, PASSWORD) {
  if (!EMAIL || !PASSWORD) {
    throw Error("Tous les champs doivent être remplis.");
  }
  const user = await this.findOne({ EMAIL });
  if (!user) {
    throw Error("E-mail ou mot de passe incorrecte.");
  }
  const match = await bcrypt.compare(PASSWORD, user.PASSWORD);
  if (!match) {
    throw Error("E-mail ou mot de passe incorrecte.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
