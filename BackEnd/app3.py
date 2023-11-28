from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from sqlalchemy import MetaData
from datetime import datetime

app = Flask(__name__)
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:2304@localhost:3306/librotopia'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

########################################## Definiendo tablas #################################################
class Cliente(db.Model):
    Email = db.Column(db.String(50), primary_key=True, nullable=False)
    Contraseña = db.Column(db.String(50), nullable=False)
    Nombre = db.Column(db.String(50))
    Apellido = db.Column(db.String(50))
    DNI = db.Column(db.BigInteger)
    Direccion = db.Column(db.String(100))
    FechaDeNacimiento = db.Column(db.Date)
    Alias = db.Column(db.String(60))
    TipoCuenta = db.Column(db.Integer)

    def __init__(self, Email, Contraseña, Nombre, Apellido, DNI, Direccion, FechaDeNacimiento, Alias, TipoCuenta):
        self.Email = Email
        self.Contraseña = Contraseña
        self.Nombre = Nombre
        self.Apellido = Apellido
        self.DNI = DNI
        self.Direccion = Direccion
        self.FechaDeNacimiento = FechaDeNacimiento
        self.Alias = Alias
        self.TipoCuenta = TipoCuenta

class Genero(db.Model):
    IDGenero = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Descripcion = db.Column(db.String(100), nullable=False)

    def __init__(self, Descripcion):
        self.Descripcion = Descripcion

class Libro(db.Model):
    IDLibro = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Titulo = db.Column(db.String(100), nullable=False)
    Genero = db.Column(db.Integer, db.ForeignKey('genero.IDGenero'), nullable=False)
    Estado = db.Column(db.Integer, default=1, nullable=False)
    Autor = db.Column(db.String(100), nullable=False)
    Resumen = db.Column(db.String(3000), nullable=False)
    Portada = db.Column(db.String(500), nullable=False)

    def __init__(self, Titulo, Genero, Autor, Resumen, Portada):
        self.Titulo = Titulo
        self.Genero = Genero
        self.Autor = Autor
        self.Resumen = Resumen
        self.Portada = Portada

class Comentarios(db.Model):
    IDComentario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    IDLibro = db.Column(db.Integer, db.ForeignKey('libro.IDLibro'), nullable=False)
    Email = db.Column(db.String(50), db.ForeignKey('cliente.Email'))
    Comentario = db.Column(db.String(300))
    FechaComentario = db.Column(db.Date, nullable=False)

    def __init__(self, IDLibro, Email, Comentario, FechaComentario):
        self.IDLibro = IDLibro
        self.Email = Email
        self.Comentario = Comentario
        self.FechaComentario = FechaComentario

class Calificaciones(db.Model):
    IDCalificacion = db.Column(db.Integer, primary_key=True, autoincrement=True)
    IDLibro = db.Column(db.Integer, db.ForeignKey('libro.IDLibro'), nullable=False)
    Estrella1 = db.Column(db.Integer)
    Estrella2 = db.Column(db.Integer)
    Estrella3 = db.Column(db.Integer)
    Estrella4 = db.Column(db.Integer)
    Estrella5 = db.Column(db.Integer)

    def __init__(self, IDLibro, Estrella1, Estrella2, Estrella3, Estrella4, Estrella5):
        self.IDLibro = IDLibro
        self.Estrella1 = Estrella1
        self.Estrella2 = Estrella2
        self.Estrella3 = Estrella3
        self.Estrella4 = Estrella4
        self.Estrella5 = Estrella5

class GeneroxCliente(db.Model):
    IDSeleccion = db.Column(db.Integer, primary_key=True, autoincrement=True)
    IDGenero = db.Column(db.Integer, db.ForeignKey('genero.IDGenero'))
    Email = db.Column(db.String(50), db.ForeignKey('cliente.Email'))

    def __init__(self, IDGenero, Email):
        self.IDGenero = IDGenero
        self.Email = Email

class Favoritos(db.Model):
    IDFavoritos = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(50), db.ForeignKey('cliente.Email'))
    IDLibro = db.Column(db.Integer, db.ForeignKey('libro.IDLibro'))

    def __init__(self, Email, IDLibro):
        self.Email = Email
        self.IDLibro = IDLibro

# Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()

########################################## Rutas #################################################

# / Ruta de inicio
@app.route("/")
def index():
    return f'App Web para Librotopía'

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

# Ruta para agregar libro a favoritos
@app.route('/agregar_favorito/<int:IDLibro>/<email>', methods=['POST'])
def agregarFavorito(IDLibro, email):
    nuevo_favorito = Favoritos(IDLibro=IDLibro, Email=email)
    db.session.add(nuevo_favorito)
    db.session.commit()

    return jsonify({"mensaje":"Libro agregado a tus favoritos"},200)

# Ruta para obtener todos los libros
@app.route('/libros', methods=['GET'])
def obtener_libros():
    # Consultamos todos los libros utilizando el modelo
    libros = Libro.query.all()

    # Convertimos los objetos Libro a formato JSON
    libros_json = []
    for libro in libros:
        libro_dict = {    
            'IDLibro': libro.IDLibro,
            'Titulo': libro.Titulo,
            'Genero': libro.Genero,
            'Estado': libro.Estado,
            'Autor': libro.Autor,
            'Resumen': libro.Resumen,
            'Portada': libro.Portada
        }
        libros_json.append(libro_dict)

    return jsonify(libros_json)

# Ruta para obtener todos los Géneros
@app.route('/generos', methods=['GET'])
def obtener_generos():
    generos = Genero.query.all()
    
    generos_json = []
    for genero in generos:
        genero_dict = {    
            'IDGenero': genero.IDGenero,
            'Descripcion': genero.Descripcion
        }
        generos_json.append(genero_dict)
    
    return jsonify(generos_json)

# Ruta para obtener todos los Cientes
@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    try:
        clientes = Cliente.query.all()

        clientes_json = []
        for cliente in clientes:
            cliente_dict = {
                'Email': cliente.Email,
                'Contraseña': cliente.Contraseña,
                'Nombre': cliente.Nombre,
                'Apellido': cliente.Apellido,
                'DNI': cliente.DNI,
                'Direccion': cliente.Direccion,
                'FechaDeNacimiento': cliente.FechaDeNacimiento.strftime('%Y-%m-%d') if cliente.FechaDeNacimiento else None,
                'Alias': cliente.Alias,
                'TipoCuenta': cliente.TipoCuenta
            }
            clientes_json.append(cliente_dict)

        return jsonify(clientes_json)
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para registrar un nuevo usuario
@app.route('/registrar_cliente', methods=['POST'])
def registrar_cliente():
    try:
        data = request.get_json()

        email = data['email']
        contraseña = data['contraseña']

        # Crear una instancia del modelo Cliente
        nuevo_cliente = Cliente(Email=email, Contraseña=contraseña, 
        Nombre='', Apellido='', DNI=0, Direccion='',
        FechaDeNacimiento='1970-01-01', Alias='', TipoCuenta=1)


        # Agregar el nuevo cliente a la sesión y realizar la confirmación
        db.session.add(nuevo_cliente)
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

        # Consultar el cliente por correo electrónico
        cliente = Cliente.query.filter_by(Email=email).first()

        if cliente:
            if data['contraseña'] == cliente.Contraseña:
                return jsonify({'mensaje': 'Iniciando sección'})
            else:
                return jsonify({'mensaje': 'La contraseña es incorrecta'})
        else:
            return jsonify({'mensaje': 'El cliente no existe'})

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para obtener un cliente por su correo electrónico
@app.route('/obtener_cliente', methods=['GET'])
def obtener_cliente():
    try:
        email = request.args.get('email')

        cliente = Cliente.query.filter_by(Email=email).first()

        if cliente:
            cliente_dict = {
                'Email': cliente.Email,
                'Contraseña': cliente.Contraseña,
                'Nombre': cliente.Nombre,
                'Apellido': cliente.Apellido,
                'DNI': cliente.DNI,
                'Direccion': cliente.Direccion,
                'FechaDeNacimiento': cliente.FechaDeNacimiento.strftime('%Y-%m-%d'),
                'Alias': cliente.Alias,
                'TipoCuenta': cliente.TipoCuenta
            }

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
        email = data['email']

        cliente = Cliente.query.filter_by(Email=email).first()

        cliente.Nombre = data['Nombre']
        cliente.Apellido = data['Apellido']
        cliente.DNI = data['DNI']
        cliente.Direccion = data['Direccion']
        cliente.FechaDeNacimiento = datetime.strptime(data['FechaDeNacimiento'], '%Y-%m-%d').date()
        cliente.Alias = data['Alias']

        db.session.commit()

        return jsonify({'mensaje': 'Datos actualizados exitosamente'})

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para eliminar un cliente
@app.route('/eliminar_cliente', methods=['DELETE'])
def eliminar_cliente():
    try:
        email = request.args.get('email')

        cliente = Cliente.query.filter_by(Email=email).first()

        db.session.delete(cliente)
        db.session.commit()

        return jsonify({'mensaje': 'Cliente eliminado exitosamente'})

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para obtener las calificaciones de un libro por su ID
@app.route('/calificaciones/<id_libro>', methods=['GET'])
def obtener_calificaciones(id_libro):
    try:
        # Convertir el ID del libro a entero
        id_libro = int(id_libro)

        calificaciones = Calificaciones.query.filter_by(IDLibro=id_libro).first()

        if calificaciones:
            calificaciones_json = {
                'IDLibro': calificaciones.IDLibro,
                'Estrella1': calificaciones.Estrella1,
                'Estrella2': calificaciones.Estrella2,
                'Estrella3': calificaciones.Estrella3,
                'Estrella4': calificaciones.Estrella4,
                'Estrella5': calificaciones.Estrella5
            }
        else:
            # Si no hay calificaciones, devolver valores predeterminados
            calificaciones_json = {
                'IDLibro': id_libro,
                'Estrella1': 0,
                'Estrella2': 0,
                'Estrella3': 0,
                'Estrella4': 0,
                'Estrella5': 0
            }

        return jsonify(calificaciones_json)

    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500


# Ruta para guardar las calificaciones
@app.route('/guardar_calificaciones', methods=['POST'])
def guardar_calificaciones():
    try:
        data = request.get_json()

        id_libro = data['IDLibro']
        estrella1 = data['Estrella1']
        estrella2 = data['Estrella2']
        estrella3 = data['Estrella3']
        estrella4 = data['Estrella4']
        estrella5 = data['Estrella5']

        # Verificar si ya existe una entrada para este libro en Calificaciones
        calificaciones = Calificaciones.query.filter_by(IDLibro=id_libro).first()

        if calificaciones:
            # Actualizar calificaciones existentes
            calificaciones.Estrella1 = estrella1
            calificaciones.Estrella2 = estrella2
            calificaciones.Estrella3 = estrella3
            calificaciones.Estrella4 = estrella4
            calificaciones.Estrella5 = estrella5
        else:
            # Crear nuevas calificaciones
            calificaciones = Calificaciones(
                IDLibro=id_libro,
                Estrella1=estrella1,
                Estrella2=estrella2,
                Estrella3=estrella3,
                Estrella4=estrella4,
                Estrella5=estrella5
            )
            db.session.add(calificaciones)

        db.session.commit()

        return jsonify({'mensaje': 'Calificaciones guardadas exitosamente'})
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500


# Ruta para obtener todos los comentarios para un libro
@app.route('/comentarios/<id_libro>', methods=['GET'])
def obtener_comentarios(id_libro):
    id_libro = int(id_libro)

    comentarios = Comentarios.query.filter_by(IDLibro=id_libro).all()

    comentarios_json = []
    for comentario in comentarios:
        comentarios_json.append({
            'IDComentario': comentario.IDComentario, 
            'IDLibro': comentario.IDLibro,
            'Email': comentario.Email,
            'Comentario': comentario.Comentario,
            'FechaComentario': comentario.FechaComentario.strftime('%Y-%m-%d') if comentario.FechaComentario else None, 
        })
    return jsonify(comentarios_json)

if __name__ == '__main__':
    app.run(debug=True)