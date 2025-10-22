export class EmptyUsernameAvatarError implements Error {
  message = 'Username input is required';
  name = 'EmptyUsernameAvatarError';

  constructor() {
    console.error(this);
  }
}
