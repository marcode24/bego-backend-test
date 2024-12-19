export class Pagination {
  readonly page: number;
  readonly limit: number;

  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_LIMIT = 10;
  private static readonly MAX_LIMIT = 30;

  constructor(page: number = Pagination.DEFAULT_PAGE, limit: number = Pagination.DEFAULT_LIMIT) {
    this.page = page < 1 ? Pagination.DEFAULT_PAGE : page;
    this.limit =
      limit < 1
        ? Pagination.DEFAULT_LIMIT
        : limit > Pagination.MAX_LIMIT
          ? Pagination.MAX_LIMIT
          : limit;
  }
}
