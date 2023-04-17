const errorsMessages = {
  globalError: 'На сервере произошла ошибка',
  movieNameValidationError: 'Некорретные данные при создании фильма',
  movieNotFoundError: 'Фильм не найден',
  movieNoRightsError: 'Вы не можете удалить фильм другого пользователя',
  userExistingDataError: 'Пользователь с таким email уже существует',
  userValidationError: 'Некорретные данные при создании пользователя',
  userNotFoundError: 'Пользователь не найден',
  authError: 'Необходима авторизация',
  userWrongDataError: 'Неправильные почта или пароль',
  pageNotFoundError: 'Страница не найдена',
};

module.exports = { errorsMessages };
