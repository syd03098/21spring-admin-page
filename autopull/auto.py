import os
import http.server
import socketserver

PORT = 8888


class Handler(http.server.SimpleHTTPRequestHandler):

    def handle(self) -> None:
        os.system('git pull')
        return super().handle()


with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
