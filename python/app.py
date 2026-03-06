from flask import Flask, request, jsonify
import os
import uuid
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["blog_database"]
blogs_collection = db["blogs"]
app = Flask(__name__)
frontendurl=os.getenv("frontend_url")
CORS(app, origins=[frontendurl] if frontendurl else ["http://localhost:5173"])


BASE_FOLDER = "blogs"


@app.route("/send_blogs/<dep>")
def send_blogs(dep):
    blogs = list(
        blogs_collection
        .find({"department": dep}, {"_id": 0})
        .sort("created_at", -1)
    )
    return jsonify(blogs)

@app.route("/saveblog/<department>", methods=["POST"])
def save_blog(department):
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Invalid blog payload"}), 400

    blog = {
        "_id": str(uuid.uuid4()),
        "department": department,
        "content": data,
        "created_at": data.get("time")
    }

    blogs_collection.insert_one(blog)

    return jsonify({"message": "Blog saved"})
if __name__ == "__main__":
    app.run(debug=True)