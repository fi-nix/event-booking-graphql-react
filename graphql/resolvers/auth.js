/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const foundUser = await User.findOne({ email: args.userInput.email });
      if (foundUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
