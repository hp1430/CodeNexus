import User from '../schema/user.js';

const userRepository = {
  createUser: async (userData) => {
    const user = await User.create(userData);
    return user;
  },
  findUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  deleteUserByEmail: async (email) => {
    const result = await User.deleteOne({ email });
    return result;
  }
};

export default userRepository;
