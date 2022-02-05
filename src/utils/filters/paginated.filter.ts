import { PaginatedQuery } from "../../models/dtos/paginated-query.dto";

export class PaginatedFilter {
  skip = 0;
  limit = 10;

  constructor(query: PaginatedQuery) {
    if (Number.isInteger(+query.limit)) {
      this.limit = +query.limit;
    }

    if (!+query.page) {
      this.skip = 0;
    } else {
      this.skip = (+query.page - 1) * +query.limit;
    }
  }
}