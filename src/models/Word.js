import { Schema, model } from "mongoose";

const WordSchema = new Schema(
  {
    title: {
      type: String,
      required: true
      // createIndexes: { unique: true }
    },
    value: {
      type: String,
      required: true
      // createIndexes: { unique: true }
    },
    // correctValue: {
    //   type: String,
    //   required: true
    // },
    detailedDescription: {
      type: String,
      default: ""
    },
    place: {
      type: String,
      default: ""
    },
    tags: {
      type: String,
      default: ""
    },
    likeCount: {
      type: Number,
      default: 0
    },
    dislikeCount: {
      type: Number,
      default: 0
    },
    uncensored: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: String,
      default: ""
    },
    updatedAt: {
      type: String,
      default: ""
    },
    author: {
      ref: "users",
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

const Word = model("words", WordSchema);

export default Word;
