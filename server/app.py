from config import app, api
from flask import make_response, session, request, jsonify
from flask_restful import Resource

class Welcome(Resource):
    def get(self):
        return 'Welcome To The Party'
api.add_resource(Welcome, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)