import { Schema, model } from "mongoose";

const AccountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    funds: { type: Number, default: 0 },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Account = model("Account", AccountSchema);

export default Account;
