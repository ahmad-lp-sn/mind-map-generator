import { config } from "../../app/config";
import { pagination } from "../../app/middlewares/pagination";

describe('pagination middleware', () => {
  let req: any, next: any;

  beforeEach(() => {
    req = {
      query: {},
    };
    next = jest.fn();
  });

  it('should set default values when query parameters are not provided', () => {
    pagination(req, {}, next);

    expect(req.query.limit).toBe(config.defaultPageSize);

    expect(next).toHaveBeenCalled();
  });
});
