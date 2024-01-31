const errorsMessages = {
  globalError: 'An error has occurred on the server',
  movieNameValidationError: 'Incorrect data when creating a movie',
  movieNotFoundError: 'The movie was not found',
  movieNoRightsError: 'You cannot delete another users movie',
  userExistingDataError: 'A user with this email already exists',
  userValidationError: 'Incorrect data when creating a user',
  userNotFoundError: 'The user was not found',
  authError: 'Authorization is required',
  userWrongDataError: 'Incorrect email or password',
  pageNotFoundError: 'The page was not found',
};

module.exports = { errorsMessages };
