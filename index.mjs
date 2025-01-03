import { createServer } from 'http';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

const server = createServer(
  function on_request(request, response) {
    console.log("on_request");
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(
      `<html>
         <head></head>
         <body>
         <div> Hi Mom!</div>
           <script>
             const web_socket = new WebSocket("ws://localhost:8080")
             web_socket.onopen = (event) => {
               web_socket.onmessage = (message) => {
                 console.log(JSON.stringify(message, null, 4));
               };
               web_socket.send('Hi');
             };
             web_socket.onerror = console.error;
           </script>     
         </body>
        </html>`
     )
  }
);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  console.log(`Got a connection: ${ws}`);

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

server.listen(8080);
