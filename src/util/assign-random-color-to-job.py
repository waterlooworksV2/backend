import pymongo
import random

client = pymongo.MongoClient("mongodb://localhost:27017/")

jobs_f19 = client["jobs_f19"]

jobs_complete = jobs_f19["jobs_complete"]

for x in jobs_complete.find():
    jobs_complete.update_one({'_id': x['_id']}, {"$set": {"color": "#{:06x}".format(random.randint(0, 0xFFFFFF))}})