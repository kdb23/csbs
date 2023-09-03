from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        stored_password_hash = self._password_hash
        print(f"Stored Password Hash: {stored_password_hash}")

        provided_password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        ).decode('utf-8')
        print(f"Provided Password Hash: {provided_password_hash}")

        is_authenticated = bcrypt.check_password_hash(
            stored_password_hash, password.encode('utf-8')
        )
        print(f"Authentication Result: {is_authenticated}")

        return is_authenticated

