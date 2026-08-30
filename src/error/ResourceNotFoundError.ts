export class ResourceNotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ResourceNotFoundError';
  }
}
