import WS from "ws";
import http from "http";
import express from "express";
import path from "path";

const __dirname = path.resolve();
const resolveStatic = __dirname;

let isFirst = true,
  wss = null;

const createServer = ({ port }) => {
  const WebSocketServer = WS.Server;
  const app = express();

  app.use(express.static(resolveStatic));

  const server = http.createServer(app);
  server.listen(port);

  wss = new WebSocketServer({ server });

  // wss.on('connection', WS => (wsInstance = WS));
};

export const ReloadPlugin = (config = { port: 5000, useHMR: true }) => {
  if (isFirst) {
    isFirst = false;
    console.log("✨ WebSocketServer: listening on %d", config.port);
    createServer(config);
  }

  return {
    name: "rollup-reload-plugin",
    generateBundle(options, bundle, isWrite) {
      const file = String(options.file).replace(__dirname, "");
      wss.clients.forEach(client => {
        if (client.readyState === WS.OPEN) {
          client.send(
            JSON.stringify({
              type: "reload",
              useHMR: config.useHMR,
              file,
            }),
          );
        }
      });
    },
  };
};
