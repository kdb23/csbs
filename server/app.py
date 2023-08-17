from config import app, api
from models import db, User
from flask import make_response, session, request, jsonify
from flask_restful import Resource
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt( app )

class Welcome(Resource):
    def get(self):
        return 'Welcome To The Party'
api.add_resource(Welcome, '/')

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()
        session['user_id'] = user.id
        if user:
            return user.to_dict(), 200
        print(user)
        return make_response({'error': '401 Unauthroized'}, 401)

api.add_resource(Login, '/login', endpoint = 'login')

class UsersList(Resource):
    def get(self):
        list = User.query.all()
        list_dict = [l.to_dict() for l in list]
        return make_response(list_dict, 200)
    
api.add_resource(UsersList, '/users/list', endpoint='users_list')

class UserResource(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        

        if len(password) < 8:
            return make_response({'error' : 'Password must be at least 8 characters long'}, 400)

        if User.query.filter_by(username = username).first():
            return {'error' : 'Username already exists'}, 400
        
        user = User(username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id

        return user.to_dict(), 201
    
api.add_resource(UserResource, '/users', endpoint ='users')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)
    
api.add_resource(Logout, '/logout', endpoint = 'logout')
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return make_response({'error' : 'Please Sign Up to Login'}, 401)
    
api.add_resource(CheckSession, '/check_session', endpoint = 'check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)