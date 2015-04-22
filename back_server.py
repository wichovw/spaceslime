import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json
import datetime

"""
Types of message:
    0. Move Horizontally
    1. Move Vertically
    2. Ball Position
    3. Player joined
    4. Started game
"""

class player():
    def __init__(self):
        self.x = 600
        self.y = 0
        
players = []
        
class ActionHandler(tornado.websocket.WebSocketHandler): 
    
    def open(self):
        print ('user is connected.\n')
        self.player = player()
        players.append(self)
        self.write_message(json.dumps({
                    'type': 3,
                    'players': len(players)
                }))
        self.playerno = len(players)
        if self.playerno == 2:
            for p in players:
                p.write_message(json.dumps({
                            'type': 4
                        }))
        elif self.playerno > 2:
            self.close()
        
    def on_message(self, message):
        msg = json.loads(message)
#        if(msg['type']==0):
#            print ('Hotizontal: %s\n' %msg['data'])
#            self.player.x_vel+=msg['data']
#            self.player.dir = 1 if self.player.x_vel >= 0 else -1
#        elif(msg['type']==1):
#            print ('Vertical: %s\n' %msg['data'])
#            self.player.y_vel+=msg['data']
            
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

