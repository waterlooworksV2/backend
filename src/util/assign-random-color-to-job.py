import pymongo
import random
import ssl

from dotenv import dotenv_values

config = dotenv_values(".env")

client = pymongo.MongoClient(config.get("DB_URI"), ssl_cert_reqs=ssl.CERT_NONE)

jobs_f19 = client["jobs_f19"]

jobs_complete = jobs_f19["jobs_complete"]

for x in jobs_complete.find():
    jobs_complete.update_one({'_id': x['_id']}, {"$set": {"color": "#{:06x}".format(random.randint(0, 0xFFFFFF))}})