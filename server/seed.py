from faker import Faker
from random import choice as rc
from config import app
from models import db, Prayer, Member
import random

fake = Faker()

def make_member():
    Member.query.delete()

    members = []

    for i in range(25):
        member = Member(
            name = fake.name(),
            address = fake.address(),
            phone = fake.phone_number(),
        )
        members.append(member)
    db.session.add_all(members)
    db.session.commit()

def make_prayers():
    Prayer.query.delete()

    members = Member.query.all()
    prayers = []

    description = ["Unspoken", "Family Support", "Martial Issues", "Financial Concern", "Health Concern" ]
    
    for member in members:
        if not Prayer.query.filter_by(member_id = member.id).first():
            prayer = Prayer(
                member_id = member.id,
                description = random.choice(description)
            )
            prayers.append(prayer)
    db.session.add_all(prayers)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_member()
        make_prayers()