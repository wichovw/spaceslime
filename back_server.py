import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json


players = []

class player():
	def __init__(self):
		self.x = 30
		self.y = 0
	
		


class ActionHandler(tornado.websocket.WebSocketHandler): 
	def open(self):
		print ('user is connected.\n')
		self.player = player()
		players.append(self)
		

	"""
	Types of action:
		0. Move Horizontally
		1. Move Vertically
	"""
	def on_message(self, message):
		msg = json.loads(message)
		if(msg['type']==0):
			print ('Hotizontal: %s\n' %msg['data'])
			self.player.x+=msg['data']
		elif(msg['type']==1):
			print ('Vertical: %s\n' %msg['data'])
			self.player.y+=msg['data']
			
		#send to opponent
		for p in players:
			if p != self:
				p.write_message(message)

	def on_close(self):
		print ('connection closed\n')
		players.remove(self)
		
	def check_origin(self, origin):
		return True



app = tornado.web.Application([(r'/ws', ActionHandler),],xsrf_cookies=False)

if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(9999)
	tornado.ioloop.IOLoop.instance().start()

