import { ApolloError } from "apollo-server-express";
import { hash, compare } from "bcryptjs";

import { issueToken, serializeUser } from "../../functions";

export default {
  Query: {
    authUserProfile: async (_, {}, { user }) => {
      return user;
    },
    authenticateUser: async (_, { username, password }, { User }) => {
      try {
        // Find user by username
        let user = await User.findOne({ username });
        if (!user) {
          throw new ApolloError("Username not found.", "403");
        }

        // Check for the password
        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new ApolloError("Invalid password.", "403");
        }

        // Serialize User
        user = user.toObject();
        user.id = user._id;
        // user = { ...user, id: user._id };
        user = serializeUser(user);

        // Issues new Authentication Token
        let token = await issueToken(user);

        return {
          user,
          token
        };
      } catch (err) {
        throw new ApolloError(err.message, "403");
      }
    },
    getAllUsers: async (_, {}, { User }) => {
      return await User.find();
    },
    getUserId: async (_, { id }, { User }) => {
      let user = await User.findById(id).exec();
      if (!user) {
        throw new ApolloError("User not found.", "400");
      }
      return user;
    }
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      let { username, email } = newUser;

      // First Check if the username is already taken
      let user;
      user = await User.findOne({ username: username });
      if (user) {
        throw new ApolloError("Username is already taken.", "400");
      }

      // If the email taken
      email = await User.findOne({ email });
      if (email) {
        throw new ApolloError("Email is already registered.", "400");
      }

      // Create new User Instance
      user = new User(newUser);

      // Hash the password
      user.password = await hash(newUser.password, 10);

      // The Save the user to the database
      let result = await user.save();
      result = result.toObject();
      result.id = result._id;
      result = serializeUser(result);

      // Issue the Authentication Token
      let token = await issueToken(result);
      return {
        token,
        user: result
      };
    },
    deleteUserById: async (_, { id }, { User }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new ApolloError("ID not found.", "400");
      }
      return {
        success: true,
        id: deletedUser.id,
        message: "User is deleted."
      };
    }
  }
};
