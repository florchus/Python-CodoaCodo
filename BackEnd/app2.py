from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
from sqlalchemy import MetaData
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:3306/librotopia'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)   
CORS(app)                                   

class Libro(db.Model):
    IDLibro = db.Column(db.Integer, primary_key=True)
    Titulo = db.Column(db.String(100))
    Genero = db.Column(db.Integer, db.ForeignKey('genero.id'))
    Estado = db.Column(db.Integer)
    Autor = db.Column(db.String(100))
    Resumen = db.Column(db.String(3000))
    Portada = db.Column(db.String(500))

class Genero(db.Model):
    IDGenero = db.Column(db.Integer, primary_key=True)
    Descripcion = db.Column(db.String(100)) 

class Favoritos(db.Model):
    IDFavoritos = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(50), db.ForeignKey('cliente.Email'))
    IDLibro = db.Column(db.Integer, db.ForeignKey('libro.IDLibro'))

# Ruta para obtener los libros seleccionado por genero
@app.route('/libros/<genero>', methods=['GET'])
def obtenerlibros_genero(genero):
    libros = Libro.query.filter_by(Genero=genero).all()

    libros_json = []
    for libro in libros:
        libros_json.append({
            'IDLibro': libro.IDLibro,
            'Titulo': libro.Titulo,
            'Genero': libro.Genero,
            'Estado': libro.Estado,
            'Autor': libro.Autor,
            'Resumen': libro.Resumen,
            'Portada': libro.Portada
        })
    return jsonify({'libros': libros_json})

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
            'IDGenero': row[0],   
            'Descripcion': row[1]
        })

    return jsonify({'generos': generos_json})

# Ruta para agregar libro a favoritos
@app.route('/agregar_favorito/<int:IDLibro>/<email>', methods=['POST'])
def agregarFavorito(IDLibro, email):
    nuevo_favorito = Favoritos(IDLibro=IDLibro, Email=email)
    db.session.add(nuevo_favorito)
    db.session.commit()

    return jsonify({"mensaje":"Libro agregado a tus favoritos"},200)


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



@app.route('/clientes', methods=['GET'])
def clientes():
    try:
        result = db.session.execute(text("SELECT * FROM cliente"))
        # crea un diccionario con los datos generados en la consulta.
        clientes = [dict(zip(result.keys(), cliente)) for cliente in result.fetchall()]
        # transforma el formato de las fechas de nacimiento
        """ for cliente in clientes:
            cliente['FechaDeNacimiento'] = cliente['FechaDeNacimiento'].strftime('%Y-%m-%d') """
        return jsonify(clientes)
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500


@app.route('/obtener_cliente', methods=['GET'])
def obtener_cliente():
    try:
        email = request.args.get('email')

        result = db.session.execute(text("SELECT * FROM cliente WHERE Email = :email"), {'email': email})
        cliente = result.fetchone()

        if cliente:
            # Convertir el resultado a un diccionario para facilitar el envío como JSON
            cliente_dict = dict(zip(result.keys(), cliente))
            # transforma el formato de la fecha
            cliente_dict['FechaDeNacimiento'] = cliente_dict['FechaDeNacimiento'].strftime('%Y-%m-%d')

            return jsonify(cliente_dict)
        else:
            return jsonify({'error': 'Cliente no encontrado'}), 404

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para actualizar los datos del usuario
@app.route('/actualizar_cliente', methods=['PUT'])
def actualizar_cliente():
    try:
        data = request.get_json()
        data['FechaDeNacimiento'] = datetime.strptime(data['FechaDeNacimiento'], '%Y-%m-%d').date()
        db.session.execute(
            text("UPDATE cliente SET Nombre=:Nombre, Apellido=:Apellido, DNI=:DNI, Direccion=:Direccion, "
         "FechaDeNacimiento=:FechaDeNacimiento, Alias=:Alias WHERE Email=:email"),
        {
        'email': data['email'],  
        'Nombre': data['Nombre'],
        'Apellido': data['Apellido'],
        'DNI': data['DNI'],
        'Direccion': data['Direccion'],
        'FechaDeNacimiento': data['FechaDeNacimiento'],
        'Alias': data['Alias'],})

        db.session.commit()

        return jsonify({'mensaje': 'Datos actualizados exitosamente'})
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/eliminar_cliente', methods=['DELETE'])
def eliminar_cliente():
    try:
        email = request.args.get('email')

        db.session.execute(text("DELETE FROM cliente WHERE Email = :email"), {'email': email})
        db.session.commit()

        return jsonify({'mensaje': 'Cliente eliminado exitosamente'})

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True)
