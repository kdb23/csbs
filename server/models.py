from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt

families = db.Table('families',
    db.Column('family_id', db.Integer, db.ForeignKey('members.id'), primary_key=True),
    db.Column('families_id', db.Integer, db.ForeignKey('members.id'), primary_key=True)
)

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
    

class Member(db.Model, SerializerMixin):
    __tablename__ = "members"

    serialize_rules = ('-created_at','-updated_at','-linked_members','-mpinstances','-prayers')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    phone = db.Column(db.Integer, nullable=False)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())
    linked_members = db.relationship(
        'Member',
        secondary=families,
        primaryjoin=(families.c.family_id == id),
        secondaryjoin=(families.c.families_id == id),
        backref=db.backref('linked_by', lazy='dynamic'),
        lazy='dynamic'
    )

    mpinstances = db.relationship('MPInstance', backref='members')
    prayers = association_proxy('mpinstances', 'prayer')

    @validates('first_name')
    def validate_first_name(self, key, value):
        if not value:
            raise ValueError('First Name is required to create member')
        return value
    
    @validates('last_name')
    def validate_last_name(self, key, value):
        if not value:
            raise ValueError('Last Name is required to create member')
        return value
    
    @validates('phone')
    def validate_phone(self, key, value):
        if not value:
            raise ValueError('Phone number is required to create member')
        return value

class Prayer(db.Model, SerializerMixin):
    __tablename__ = "prayers"

    serialize_rules = ('-updated_at', '-created_at', '-mpinstances', '-members')

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())

    mpinstances = db.relationship('MPInstance', backref='prayer')
    members = association_proxy('mpinstances', 'member')


class MPInstance(db.Model, SerializerMixin):
    # mpinstance: member-prayer instance (one instance between a prayer and a member)
    __tablename__ = 'mpinstances'

    serialize_rules = ('-member.mpinstances', '-prayer.mpinstances')

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'))
    prayer_id = db.Column(db.Integer, db.ForeignKey('prayers.id'))


