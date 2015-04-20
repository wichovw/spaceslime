import os
import cherrypy

PATH = os.path.abspath(os.path.dirname(__file__))



class Root(object): 
	"""
	Types of action:
		0. Move Horizontally
		1. Move Vertically
	"""
	@cherrypy.expose
	def action(self,type=None,data=None):
		if type=='0':
			return "H"
		elif type==1:
			return "V"
		


config={
	'/': {
					'tools.staticdir.on': True,
					'tools.staticdir.dir': PATH,
					'tools.staticdir.index': 'index.html',
			},
}

cherrypy.quickstart(Root(),'/',config)
