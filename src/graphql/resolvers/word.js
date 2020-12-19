import { ApolloError } from "apollo-server-express";

export default {
  Query: {
    getAllWords: async (_, {}, { Word }) => {
      return await Word.find().populate("author");
    },
    getWordById: async (_, { id }, { Word }) => {
      try {
        let word = await Word.findById(id);
        if (!word) {
          throw new Error("Word not found.");
        }
        await word.populate("author").execPopulate();
        return word;
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Mutation: {
    createNewWord: async (_, { newWord }, { Word, user }) => {
      const word = await Word.create({
        ...newWord,
        author: user._id.toString()
      });
      await word.populate("author").execPopulate();
      return word;
    },
    updateWordByID: async (_, { id, updatedWord }, { Word, user }) => {
      console.log("user", user);
      try {
        let editedWord = await Word.findOneAndUpdate(
          {
            _id: id,
            author: user._id.toString()
          },
          {
            ...updatedWord
          },
          {
            new: true
          }
        );

        if (!editedWord) {
          throw new Error("Unable to edit the word.");
        }
        await editedWord.populate("author").execPopulate();
        return editedWord;
      } catch (err) {
        throw new ApolloError(err.message, "400");
      }
    },
    deleteWordByID: async (_, { id }, { Word, user }) => {
      try {
        let deletedWord = await Word.findOneAndDelete({
          _id: id,
          author: user._id.toString()
        });

        if (!deletedWord) {
          throw new Error("Unable to deleted the word.");
        }

        return {
          success: true,
          id: deletedWord.id,
          message: "Your word is deleted."
        };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  }
};
