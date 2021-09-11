import Http from './Http';
import express, { Request, Response } from 'express';

export default class ExpressHttp implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  private convertUrl(url: string) {
    return url.replace(/\$\{/g, ':').replace(/\}/g, '');
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](this.convertUrl(url), async (req: Request, res: Response) => {
      const data = await fn(req.params, req.body);
      res.json(data);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port);
  }
}
