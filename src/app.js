import express from 'express';
import bodyParser from 'body-parser';

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
    this.app.get("/avatar", (req, res) => {
      res.send("Browser return")
      console.log("Terminal return")
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