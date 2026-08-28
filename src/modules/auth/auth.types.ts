type RegistrationInput = {
  username: string,
  email: string,
  password: string
};

type LoginInput = {
  identifier: string,  // email or username
  password: string
};

// Full information about user
type User = {
  id: string,
  username: string,
  email: string,
  password_hash: string,
  created_at: Date,
  updated_at: Date
};

// Public information about user
type PublicUser = {
  id: string,
  username: string, 
  email: string,
  created_at: Date
};

export {
  RegistrationInput,
  LoginInput,
  User,
  PublicUser,
}