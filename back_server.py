import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json



class ActionHandler(tornado.websocket.WebSocketHandler): 
	def open(self):
		print ('user is connected.\n')

	"""
	Types of action:
		0. Move Horizontally
		1. Move Vertically
	"""
	def on_message(self, message):
		msg = json.loads(message)
		if(msg['type']==0):
			print ('Hotizontal: %s\n' %msg['data'])
		elif(msg['type']==1):
			print ('Vertical: %s\n' %msg['data'])
		

	def on_close(self):
		print ('connection closed\n')
		
	def check_origin(self, origin):
		return True



app = tornado.web.Application([(r'/ws', ActionHandler),],xsrf_cookies=False)

if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(9999)
	tornado.ioloop.IOLoop.instance().start()

