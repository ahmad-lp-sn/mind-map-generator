export class CustomError {
  _code: string;
  message: string;
  status: number;

  constructor({ _code, message, status = 400 }: CustomError) {
    this._code = _code;
    this.message = message;
    this.status = status;
  }
}
