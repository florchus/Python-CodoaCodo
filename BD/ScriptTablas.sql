Drop DATABASE Librotopia

create DATABASE Librotopia

use Librotopia

create table Cliente(
    IDCliente int AUTO_INCREMENT PRIMARY KEY,
    Email varchar(50) not null,
    Nombre varchar(50) not null,
    Apellido varchar(50) not null,
    DNI bigint not null,
    Direccion varchar(100),
    FechaDeNacimiento date not null,
    Alias varchar(60) not null,
    Estado int default 1 not null
)

create Table Login(
    Email VARCHAR(50) not null PRIMARY KEY,
    Contraseña VARCHAR(50) not null,
    IDCliente int,
    Foreign Key (IDCliente) REFERENCES Cliente(IDCliente)
)

create Table Genero(
    IDGenero int AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) not null
)

create TABLE Libro(
    IDLibro int AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) not null,
    Genero INT not null,
    Estado int DEFAULT 1 not null,
    Autor VARCHAR(60) not null,
    Resumen VARCHAR(300) not null,
    Portada VARCHAR(500) not null,
    Foreign Key (Genero) REFERENCES Genero(IDGenero)
)

CREATE Table Comentarios (
    IDComentario int AUTO_INCREMENT PRIMARY KEY,
    IDLibro int not null,
    IDCliente int,
    Comentario VARCHAR(300),
    FechaComentario date not null,
    Foreign Key (IDLibro) REFERENCES Libro(IDLibro),
    Foreign Key (IDCliente) REFERENCES Cliente(IDCliente)
)

create Table Calificaciones(
    IDCalificacion int AUTO_INCREMENT PRIMARY KEY,
    IDLibro int not null,
    CantidadEstrellas int,
    Foreign Key (IDLibro) REFERENCES Libro(IDLibro)
)

CREATE table GeneroxCliente(
    IDSeleccion int AUTO_INCREMENT PRIMARY KEY,
    IDGenero int,
    IDCliente int,
    Foreign Key (IDGenero) REFERENCES Genero(IDGenero),
    Foreign Key (IDCliente) REFERENCES Cliente(IDCliente)
)

CREATE Table Favoritos(
    IDFavoritos int AUTO_INCREMENT PRIMARY KEY,
    IDCliente int,
    IDLibro int,
    Foreign Key (IDCliente) REFERENCES Cliente(IDCliente),
    Foreign Key (IDLibro) REFERENCES Libro(IDLibro)
)