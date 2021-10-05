import { DatabaseRepositoryFactory } from './infra/factory/DatabaseRepositoryFactory';
import ExpressHttp from './infra/http/ExpressHttp';
import HapiHttp from './infra/http/HapiHttp';
import RoutesConfig from './infra/http/RoutesConfig';

const repositoryFactory = new DatabaseRepositoryFactory();
const http = new ExpressHttp();
// const http = new HapiHttp();
const routesConfig = new RoutesConfig(http, repositoryFactory);
routesConfig.build();
http.listen(3000);
