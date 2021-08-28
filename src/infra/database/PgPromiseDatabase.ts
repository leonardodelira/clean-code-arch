import pgPromise from 'pg-promise';
import Database from './Database';

export class PgPromiseDatabase implements Database {
  pgp: any;

  constructor() {
    this.pgp = pgPromise()('postgres://root:docker@localhost:5432/app-branas');
  }

  many(query: string, parameters: any) {
    return this.pgp.query(query, parameters);
  }

  one(query: string, parameters: any) {
    return this.pgp.oneOrNone(query, parameters);
  }
}
