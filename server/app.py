from config import app, api
from models import db, User
from flask import make_response, session, request, jsonify
from flask_restful import Resource

class Welcome(Resource):
    def get(self):
        return 'Welcome To The Party'
api.add_resource(Welcome, '/')

class Login(Resource):
    def post(self):
        data= request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()
        session['user_id'] = user.id
        if user and user.authenticate(password):
            return user.to_dict(), 200
        return make_response({'error': '401 Unauthroized'}, 401)

api.add_resource(Login, '/login', endpoint = 'login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)