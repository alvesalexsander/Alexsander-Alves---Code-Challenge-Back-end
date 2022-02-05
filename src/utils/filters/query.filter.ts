export class QueryFilter<Model> {

  constructor(query: Partial<Model> & Object, toDestruct?: string[]) {
    this.removeEmptyValues(query);
    
    for (const key in this.destructQuery(query, toDestruct)) {
      this[key] = query[key];
    }
  }

  private destructQuery(query: Partial<Model> & Object, toDestruct: string[]) {
    if (!toDestruct?.length) {
      return query;
    }
    
    const filteredQuery = {};
    for (const key in query) {
      if (toDestruct.includes(key)) {
        filteredQuery[key] = query[key];
      }
    }
    return filteredQuery;
  }

  private removeEmptyValues(query: Partial<Model> & Object) {
    for (const key in query) {
      if (query[key] === undefined) {
        delete query[key];
      };
    }
  }
}