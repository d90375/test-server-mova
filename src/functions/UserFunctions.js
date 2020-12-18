import { sign } from "jsonwebtoken";

import { SECRET } from "../config";

const keys = ["id", "username", "email", "firstName", "lastName"];

export const issueToken = async user => {
  let token = await sign(user, SECRET, { expiresIn: 60 * 60 * 24 });
  return `Bearer ${token}`;
};

export const serializeUser = user => {
  return keys.reduce((obj, key) => {
    if (user && user.hasOwnProperty(key)) {
      obj[key] = user[key];
    }
    return obj;
  }, {});
};
