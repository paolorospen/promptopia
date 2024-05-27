import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists!"],
    required: [true, "email is required!"],
  },
  username: {
    type: String, // Usa il tipo di dati String
    validate: {
      validator: function (username) {
        if (!username) {
          return true; // Non fare la validazione se il campo è vuoto
        }

        const regex =
          /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._]+(?<![_.])$/u;

        return regex.test(username); // Esegui la validazione con l'espressione regolare Unicode
      },
      message:
        "Username invalid, it should contain 8-20 alphanumeric letters and be without special characters!",
    },
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
