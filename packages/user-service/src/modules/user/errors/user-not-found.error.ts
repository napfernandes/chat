export class UserNotFoundError extends Error {
  constructor(userIdOrEmail: string) {
    super(`User ${userIdOrEmail} does not exist.`);
  }
}
