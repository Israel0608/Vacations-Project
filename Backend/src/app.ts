import cors from "cors";
import express from "express";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import dataController from "./6-controllers/data-controller";
import authController from "./6-controllers/auth-controller";
import { fileSaver } from "uploaded-file-saver";
import path from "path";
import expressFileUpload from "express-fileupload"

// Alt+Shift+O

// Creating the server: 
const server = express();

fileSaver.config(path.join(__dirname, "1-assets", "images"));

server.use(expressFileUpload());

// Allow CORS access: 
server.use(cors());

// Creating a request.body object containing the request body data:
server.use(express.json());

// Connect our controllers: 
server.use("/api", dataController, authController);

// Route not found: 
server.use(routeNotFound);

// Catch all middleware: 
server.use(catchAll);

// Running the server: 
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));


