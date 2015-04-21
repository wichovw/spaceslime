import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json
import datetime

gravity = -0.5
friction = 1
fps = 60
ball_radius = 50
slime_radius = 150
slime_collition = (ball_radius + slime_radius)**2
force_factor = 0.2
ball_max_x = 1300 - ball_radius

class player():
    def __init__(self):
        self.x = 600
        self.y = 0
        self.x_vel = 0
        self.y_vel = 0
        self.dir = 0
        
class Ball():
    def __init__(self):
        self.x = 600
        self.y = 800
        self.x_vel = 0
        self.y_vel = 0
        
#    def next_second(self):
#        for _ in range(fps):
#            self.x += self.x_vel
#            self.y += self.y_vel
#            self.y_vel += gravity
#            
#            for p in players:
#                player = p.player
#                d2 = (self.x - player.x)**2 + (self.y - player.y)**2
#                if (d2 <= slime_collition):
#                    self.x_vel = (self.x - player.x) * force_factor
#                    self.y_vel = (self.y - player.y + player.y_vel) * force_factor
#                    
#                player.x += player.x_vel
#                player.y += player.y_vel
#                if player.y:
#                    player.y_vel += gravity
#                else:
#                    player.y_vel = 0
#                    player.y = 0
#                    if abs(player.x_vel):
#                        player.x_vel -= friction * player.dir
#            
#            if self.y <= ball_radius:
#                self.y_vel = abs(self.y_vel)*0.9
        
    def json(self):
        return json.dumps({
                'type': 2,
                'x': self.x,
                'y': self.y,
                'x_vel': self.x_vel,
                'y_vel': self.y_vel
            })
        
players = []
ball = Ball()
        
class ActionHandler(tornado.websocket.WebSocketHandler): 
    
    def open(self):
        print ('user is connected.\n')
        self.player = player()
        players.append(self)
        ball = Ball()
        self.ball_movement()
        
    """
    Types of action:
        0. Move Horizontally
        1. Move Vertically
    """
    def on_message(self, message):
        msg = json.loads(message)
        if(msg['type']==0):
            print ('Hotizontal: %s\n' %msg['data'])
            self.player.x_vel+=msg['data']
            self.player.dir = 1 if self.player.x_vel >= 0 else -1
        elif(msg['type']==1):
            print ('Vertical: %s\n' %msg['data'])
            self.player.y_vel+=msg['data']
            
        #send to opponent
        for p in players:
            if p != self:
                p.write_message(message)
    
    def ball_movement(self):
        pass
#        print('ball pos sent')
        self.write_message(ball.json())
        tornado.ioloop.IOLoop.instance().call_later(1, self.ball_movement)
        ball.next_second()
        
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

