import Http from './Http';
import GetOrder from '../../application/GetOrder';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class RouteConfig {
  http: Http;
  repositoryFactory: RepositoryFactory;

  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    this.http = http;
    this.repositoryFactory = repositoryFactory;
  }

  build() {
    this.http.on('get', '/orders/${code}', async (params: any, body: any) => {
      const getOrder = new GetOrder(this.repositoryFactory);
      const order = await getOrder.execute(params.code);
      return order;
    });
  }
}
