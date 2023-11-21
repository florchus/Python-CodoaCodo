from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
from sqlalchemy import MetaData

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:2304@localhost:3306/librotopia'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)   
CORS(app)                                   


# Ruta para obtener todos los libros
@app.route('/libros', methods=['GET'])
def obtener_libros():
    # Realiza una consulta SQL directa para obtener todos los libros
    result = db.session.execute(text("SELECT * FROM libro"))
    
    # Convertir el resultado a formato JSON
    libros_json = []
    for row in result:
        libros_json.append({
            'IDLibro': row[0],  
            'Titulo': row[1],
            'Genero': row[2],
            'Estado': row[3],
            'Autor': row[4],
            'Resumen': row[5],
            'Portada': row[6]
        })

    return jsonify({'libros': libros_json})

# Ruta para obtener todos los Géneros
@app.route('/generos', methods=['GET'])
def obtener_generos():
    result = db.session.execute(text("SELECT * FROM genero"))
    
    generos_json = []
    for row in result:
        generos_json.append({
            'IDGenero': row[0],   # Cambiar a índices en lugar de claves
            'Descripcion': row[1]
        })

    return jsonify({'generos': generos_json})



# Ruta para registrar un nuevo usuario
@app.route('/registrar_cliente', methods=['POST'])
def registrar_cliente():
    try:
        data = request.get_json()

        email = data['email']
        contraseña = data['contraseña']
        
        db.session.execute(text("INSERT INTO cliente (Email, Contraseña) VALUES (:email, :contraseña)"), {'email': email, 'contraseña': contraseña})
        db.session.commit()

        return jsonify({'mensaje': 'Usuario registrado exitosamente'})
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500
    
# Ruta para verificar la existencia del usuario y la contraseña
@app.route('/verificar_cliente', methods=['POST'])
def verificar_cliente():
    try:
        data = request.get_json()

        email = data['email']

        result = db.session.execute(text("SELECT * FROM cliente WHERE Email = :email"), {'email': email})
        cliente = result.fetchone()

        if cliente:
            contraseña_db = cliente[1]

            if data['contraseña'] == contraseña_db:
                return jsonify({'mensaje': 'Iniciando sección'})
            else:
                return jsonify({'mensaje': 'La contraseña es incorrecta'})
        else:
            return jsonify({'mensaje': 'El cliente no existe'})

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500





if __name__ == '__main__':
    app.run(debug=True)
