import { defaultFieldResolver } from "graphql";
import { ApolloError, SchemaDirectiveVisitor } from "apollo-server-express";

export class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      let [_, {}, { isAuth }] = args;

      if (isAuth) {
        return await resolve.apply(this, args);
      } else {
        throw new ApolloError(
          "You must be authenticated user to get this information."
        );
      }
    };
  }
}
