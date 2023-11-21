from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

# 5. Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:2304@localhost:3306/librotopia'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 6. Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)
ma = Marshmallow(app)

class librosRes(ma.Schema):
    class Meta:
        fields=('IDLibro','Titulo','Genero','Estado','Autor','Resumen','Portada')

libros_resultado=librosRes(many=True)

@app.route("/libros", methods=['GET'])
def get_libros():
    pass