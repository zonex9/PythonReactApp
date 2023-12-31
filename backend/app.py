#C:\flask_dev\flaskreact\app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow https://pypi.org/project/flask-marshmallow/
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
 
app = Flask(__name__)
CORS(app)
 
# Databse configuration                                  Username:password@hostname/databasename
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/cabinetmedical'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
 
ma=Marshmallow(app)
 
class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer,primary_key=True)
    nom = db.Column(db.String(100))
    prenom = db.Column(db.String(100))
    age = db.Column(db.Integer)
    email = db.Column(db.String(100))
    region = db.Column(db.String(100))
    ville = db.Column(db.String(100))
    adresse = db.Column(db.String(100))
    date = db.Column(db.DateTime,default=datetime.datetime.now)
 
    def __init__(self,nom,prenom,age,email,region,ville,adresse):
        self.nom=nom
        self.prenom=prenom
        self.age=age
        self.email=email
        self.region=region
        self.ville=ville
        self.adresse=adresse

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','nom','email','prenom','age','region','ville','adresse')
 
user_schema = UserSchema()
users_schema = UserSchema(many=True)
 
@app.route('/listusers',methods =['GET'])
def listusers():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)
 
@app.route('/userdetails/<id>',methods =['GET'])
def userdetails(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)
 
@app.route('/userupdate/<id>',methods = ['PUT'])
def userupdate(id):
    user = Users.query.get(id)
 
    nom = request.json['nom']
    prenom = request.json['prenom']
    age = request.json['age']
    email = request.json['email']
    region = request.json['region']
    ville = request.json['ville']
    adresse = request.json['adresse']

    user.nom = nom
    user.prenom = prenom
    user.age = age
    user.email = email
    user.region = region
    user.ville = ville
    user.adresse = adresse

    db.session.commit()
    return user_schema.jsonify(user)
 
@app.route('/userdelete/<id>',methods=['DELETE'])
def userdelete(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)
 
@app.route('/useradd',methods=['POST'])
def useradd():
    nom = request.json['nom']
    prenom = request.json['prenom']
    age = request.json['age']
    email = request.json['email']
    region = request.json['region']
    ville = request.json['ville']
    adresse = request.json['adresse']
 
    users = Users(nom,prenom,age,email,region,ville,adresse)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)
 
if __name__=='__main__':
    app.run(debug=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"