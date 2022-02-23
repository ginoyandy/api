import User, { UserDocument } from '../data/models/user.model';

export async function createUser(input: UserDocument) {
  try {
    // MyModel.create(docs) does new MyModel(doc).save() for every doc in docs
    return await User.create(input);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function loginUser(user : {username: string, password: string}) {
  try {
    const findUser: UserDocument | null = await User.findOne({
      $or: [
        { username: user.username },
        { email: user.username },
      ],
    });

    const validationLogin = findUser === null
      ? false
      : await findUser.comparePassword(user.password);

    if (!validationLogin) {
      throw new Error('User or password invalid');
    }

    // This if conditional is not necesary but TypeScript.
    if (findUser) {
      const token = await findUser.generateToken();
      return token;
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
