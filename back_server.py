import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web



class ActionHandler(tornado.websocket.WebSocketHandler): 
	"""
	Types of action:
		0. Move Horizontally
		1. Move Vertically
	"""
	def open(self):
		print ('user is connected.\n')

	def on_message(self, message):
		print(message[0])
		print ('received message: %s\n' %message)
		self.write_message(message + ' OK')

	def on_close(self):
		print ('connection closed\n')
		
	def check_origin(self, origin):
		return True



app = tornado.web.Application([(r'/ws', ActionHandler),],xsrf_cookies=False)

if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(9999)
	tornado.ioloop.IOLoop.instance().start()

