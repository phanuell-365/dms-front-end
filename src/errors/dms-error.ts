export class DmsError extends Error {
  private date: Date;

  constructor(
    public readonly error: string,
    public readonly message: string,
    public readonly statusCode: number,
    ...props: any[]
  ) {
    super(...props);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DmsError);
    }

    this.name = "DmsError";
    this.date = new Date();
  }
}
