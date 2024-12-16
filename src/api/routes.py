"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Singup

@api.route('/signup', methods=['POST'])
def register():

    body = request.json
    name = body.get("name")
    email = body.get("email")
    password = body.get("password")
    
    existing_user = User.query.filter ((User.email == email)).first()

    if existing_user:

        return jsonify ({"msg": "User alredy exist"})

    new_user = User(name, email, password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created succes"})

    

#Login

@api.route('/login', methods=['POST'])
def login():
    
    body = request.json
    
    email = body.get("email", None)
    password = body.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()

    if user == None:
        return jsonify ({"msg":"Bad email or password"}), 401
    
    if user.password != password:
        return jsonify ({"msg": "Bad email or password"}), 401
    
    accse_token = create_access_token(identity=email)
    return jsonify (accse_roken=accse_token), 201

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200
