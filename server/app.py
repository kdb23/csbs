from config import app, api
from models import db, User, Member, Prayer, MPInstance
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

        user = User.query.filter_by(username='test').first()

        if user:
            stored_hash = user.password_hash
            provided_password = 'admin123'

            # Compare the provided password with the stored hash
            if bcrypt.check_password_hash(stored_hash, provided_password.encode('utf-8')):
                print("Login Successful")
            else:
                print("Login Failed: Passwords do not match")
        else:
            print("User 'test' not found")


        # user = User.query.filter(User.username == username).first()

        # if user is None:
        #     return {'error': 'User not found'}, 404 
        
        # if user and user.authenticate(password):
        #     print(user)
        #     print(user.authenticate)
        #     session['user_id'] = user.id
        #     return user.to_dict(), 200
        # return {'error': '401 Unauthorized'}, 401
    
class UsersList(Resource):
    def get(self):
        list = User.query.all()
        list_dict = [l.to_dict() for l in list]
        return make_response(list_dict, 200)

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

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return make_response({'error' : 'Please Sign Up to Login'}, 401)


api.add_resource(Login, '/login', endpoint = 'login')
api.add_resource(UserResource, '/users', endpoint ='users')
api.add_resource(UsersList, '/users/list', endpoint='users_list')
api.add_resource(Logout, '/logout', endpoint = 'logout')
api.add_resource(CheckSession, '/check_session', endpoint = 'check_session')

class Members(Resource):
    def get(self):
        members = Member.query.all()
        member_list = []
        for m in members:
            family_names = [linked_member.name for linked_member in m.linked_members]
            m_dict = {
                'id': m.id,
                'first_name': m.first_name,
                'last_name': m.last_name,
                'address': m.address,
                'phone': m.phone,
                'families' : family_names
            }
            member_list.append(m_dict)
        return make_response(member_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_member = Member(
                first_name = data['first_name'],
                last_name = data['last_name'],
                address = data['address'],
                phone = data['phone']
            )
            db.session.add(new_member)
            db.session.commit()
        except ValueError:
            return make_response({'error' : '400 Unable to Process Request'})
        return make_response(new_member.to_dict(), 201 )
    
api.add_resource(Members, '/members')

class MemberById(Resource):
    def get(self, id):
        member = Member.query.filter_by(id=id).first()
        if not member:
            return make_response({'error': '404 Church Member Not Found'}, 404)

        # Serialize the member's information
        m_dict = {
            'id': member.id,
            'first_name': member.first_name,
            'last_name': member.last_name,
            'address': member.address,
            'phone': member.phone,
        }

        # Check if the member has any linked family members
        linked_family_names = [linked_member.name for linked_member in member.linked_members]
        if linked_family_names:
            m_dict['linked_members'] = linked_family_names

        return make_response(m_dict, 200)

    
    def patch(self, id):
        data = request.get_json()
        person = Member.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(person, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(person)
        db.session.commit()
        return make_response(person.to_dict(), 202)
    
    def delete(self, id):
        doomed = Member.query.filter_by(id = id).first()
        if not doomed:
            return make_response({'error': '404 Unable to Process Request'}, 404)
        db.session.delete(doomed)
        db.session.commit()
        return make_response( {}, 204)
    
api.add_resource(MemberById, '/members/<int:id>')

class Prayers(Resource):
    def get(self):
        prayers = Prayer.query.all()
        prayer_list = []
        for p in prayers:
            p_dict = {
                'id': p.id,
                'member_id': p.member_id,
                'description': p.description
            }
            prayer_list.append(p_dict)
        return make_response(prayer_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_prayer = Prayer(
                member_id = data['member_id'],
                description = data['description']
            )
            db.session.add(new_prayer)
            db.session.commit()
        except ValueError:
            return make_response({'error' : '400 Unable to Process Request'})
        return make_response(new_prayer.to_dict(), 201 )
    
api.add_resource(Prayers, '/prayer_request')

class PrayerById(Resource):
    def get(self, id):
        prayer = Prayer.query.filter_by(id = id).first()
        if not prayer:
            return make_response({'error': '404 Prayer Request Not Found'}, 404)
        return make_response(prayer.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        concern = Prayer.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(concern, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(concern)
        db.session.commit()
        return make_response(concern.to_dict(), 202)
    
    def delete(self, id):
        doomed = Prayer.query.filter_by(id = id).first()
        if not doomed:
            return make_response({'error': '404 Unable to Process Request'}, 404)
        db.session.delete(doomed)
        db.session.commit()
        return make_response( {}, 204)
    
api.add_resource(PrayerById, '/prayer_request/<int:id>')

class MemberPrayer(Resource):
    def get(self):
        concern = MPInstance.query.all()
        prayer_list = []
        for m in concern:
            m_dict ={
                'id' : m.id,
                'member_id' : m.member_id,
                'prayer_id' : m.prayer_id
            }
            prayer_list.append(m_dict)
        return make_response(jsonify(prayer_list), 200)

api.add_resource(MemberPrayer, '/memberprayer')

class MemberPrayerById(Resource):
    def get(self, id):
        concern = MPInstance.query.filter_by(id = id).first()
        if not concern:
            return make_response({'error' : "404 Member Prayer Rquest Not Found"}, 404)
        return make_response(concern.to_dict(), 200)

api.add_resource(MemberPrayerById, '/members/<int:id>/prayers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)