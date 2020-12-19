import { Schema, model } from "mongoose";

const WordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      createIndexes: { unique: true }
    },
    value: {
      type: String,
      required: true,
      createIndexes: { unique: true }
    },
    correctValue: {
      type: String,
      required: true
    },

    detailedDescription: {
      type: String,
      required: true
    },
    placeFrom: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      required: true
    },
    dislikeCount: {
      type: Number,
      required: true
    },
    uncensored: {
      type: Boolean,
      required: Boolean
    }
  },
  {
    timestamps: true
  }
);

const Word = model("words", WordSchema);

export default Word;
