from faker import Faker
from random import choice as rc
from config import app
from models import db, Prayer, Member, MPInstance
import random

fake = Faker()

def make_member():
    Member.query.delete()

    members = []

    for i in range(25):
        member = Member(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
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

    description = ["Unspoken", "Family Support", "Martial Issues", "Financial Concern", "Health Concern"]

    for member in members:
        # Check if the member already has a prayer request
        existing_prayer = Prayer.query.filter_by(member_id=member.id).first()
        if not existing_prayer:
            # Generate a random description for the prayer request
            prayer = Prayer(
                member_id=member.id,
                description=random.choice(description)
            )
            prayers.append(prayer)

    db.session.add_all(prayers)
    db.session.commit()

def make_memberprayer():
    MPInstance.query.delete()

    members = Member.query.all()
    prayers = Prayer.query.all()

    concerns = []

    for member in members:
        random.shuffle(prayers)
        for prayer in prayers[:1]:
            # Create MPInstance only if it doesn't already exist for this member and prayer
            existing_concern = MPInstance.query.filter_by(member_id=member.id, prayer_id=prayer.id).first()
            if not existing_concern:
                concern = MPInstance(
                    member_id=member.id,
                    prayer_id=prayer.id
                )
                concerns.append(concern)

    db.session.add_all(concerns)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_member()
        make_prayers()
        make_memberprayer()