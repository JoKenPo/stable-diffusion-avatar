import dotenv from 'dotenv';
dotenv.config();

import { SetupApplication } from './app.js';


class Server {
    static start() {
        const app = new SetupApplication(process.env.PORT);
        app.init();

        app.start();
    }
}

Server.start();