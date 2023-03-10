import express from 'express';
import bodyParser from 'body-parser';
import Avatar from './app/avatar.js';
export class SetupApplication {

  constructor(port = 3000, app = express()) { 
    this.port = port;
    this.express = app;
  }

  init() {
    this.app = express()
    
    this.setupExpress();
    this.setupRoutes();

  }

  setupRoutes() {
    this.app.get("/avatar/:hash", async (req, res) => {
      // res.send("Browser return")
      // console.log("Terminal return")

        return await new Avatar().renderImage(req, res);
      
    });
  }

  setupExpress() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }


  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port} 🚀`);
    });
  }
}