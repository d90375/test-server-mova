export default {
  Query: {
    getAllUsers: async (_, {}, { User }) => {
      const users = await User.find();
      return users;
    },
    getUserId: async (_, { id }, { User }) => {
      let user = await User.findById(id);
      return user;
    }
  },
  Mutation: {
    createNewUser: async (_, { newUser }, { User }, info) => {
      // console.log("_", _);
      // console.log("args", args);
      // console.log("context", context);
      // console.log("info", info);
      let result = await User.create(newUser);
      return result;
    },
    editUserById: async (_, { id, updatedUser }, { User }) => {
      let editedUser = await User.findByIdAndUpdate(
        id,
        { ...updatedUser },
        { new: true }
      );
      return editedUser;
    },
    deleteUserById: async (_, { id }, { User }) => {
      let deletedUser = await User.findByIdAndDelete(id);
      return {
        success: true,
        id: deletedUser.id,
        message: "User is deleted."
      };
    }
  }
};
