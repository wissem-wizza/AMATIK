const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Eleveur = require("../models/eleveurModel");

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
    NOM: {
      type: String,
      required: true,
    },
    TYPE: {
      type: String,
      required: true,
      enum: ["Superviseur", "Eleveur"],
    },
    RESET_CODE: {
      type: String,
    },
    DEVICE_ID: {
      type: String,
    },
  },
  { collection: "user" },
  { timestamps: true }
);

userSchema.statics.signup = async function ({
  email: EMAIL,
  password: PASSWORD,
  nom: NOM,
  type: TYPE,
}) {
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

  // const temp_pass = `2023@${PASSWORD}`
  // if (!validator.isStrongPassword(temp_pass)) {
  //   throw Error("Mot de passe pas assez fort"); // à optimiser
  // }

  //adding some character to the PASSWORD //10: saltRounds
  const salt = await bcrypt.genSalt(10);

  //hashing user PASSWORD
  const hash = await bcrypt.hash(PASSWORD, salt);

  //create new user with the email and the hashed PASSWORD
  const user = await this.create({ EMAIL, PASSWORD: hash, NOM, TYPE });

  const { EMAIL: email, NOM: nom, TYPE: type } = user;

  let eleveur = null;

  if (type === "Eleveur") {
    try {
      eleveur = await Eleveur.findOne({ email }, { _id: 1 });
      return {
        email,
        nom,
        type,
        eleveur_id: eleveur?._id,
        cle: eleveur._doc.CLE,
      };
    } catch (error) {
      console.log("can't fetch eleveur", error.message);
    }
  } else {
    return { email, nom, type };
  }
};

//validation à optimiser (email valide)
userSchema.statics.login = async function ({
  email: EMAIL,
  password: PASSWORD,
}) {
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

  // console.log("user", user);
  const { EMAIL: email, NOM: nom, TYPE: type, _id } = user;
  let eleveur = null;

  // don't try catch the following as the error will be catched in authController
  if (type === "Eleveur") {
    eleveur = await Eleveur.findOne({ email }, { _id: 1, CLE: 1 });
    return {
      email,
      nom,
      type,
      eleveur_id: eleveur._id,
      cle: eleveur._doc.CLE,
      _id,
    };
  } else {
    return { email, nom, type, _id };
  }
};

module.exports = mongoose.model("User", userSchema);
