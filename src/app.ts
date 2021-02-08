import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import dbconnection from './startup/db';
import swagger from './startup/swagger';

class App {
    public app: express.Application;
    public port: number | string;

    constructor({ routes }) {
        this.app = express();
        this.port = process.env.port;

        this.initializeMiddlewares();
        this.initializeRoutes({ routes });
        this.onStartup();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private initializeRoutes({ routes }) {
        routes.forEach((route) => {
            this.app.use(`/api${route.path}`, route.router);
        });
    }

    private async onStartup() {
        dbconnection();
        swagger(this.app);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;