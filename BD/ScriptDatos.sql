
INSERT INTO Genero (Descripcion) VALUES ('Aventura'), ('Misterio'), ('Naturaleza'), ('Romance')

INSERT INTO libro (Titulo,Genero,Autor,Resumen,Portada)
VALUES
('HEARTSTOPPER',4,'ALICE OSEMAN','Charlie y Nick van al mismo colegio; aunque nunca se habían cruzado hasta el día en que los hacen sentarse juntos en su grupo de estudio. Muy pronto se vuelven amigos y más pronto aún Charlie comienza a sentir cosas por Nick, aunque sabe que es un imposible','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/673905.jpg'),
('EL PRINCIPE',4,'ARMENTROUT, JENNIFER','Frío; letal; despiadado. Temido por los faes y los humanos por igual; no hay nadie más peligroso que el Príncipe. Atormentado por un pasado que no pudo controlar; Caden desea vengarse de aquellos que le hicieron daño y lo dejaron atrapado en una pesadilla interminable.','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/709730.jpg'),
('Y NO QUEDO NINGUNO',2,'AGATHA CHRISTIE','Diez personas que no se han visto nunca son invitadas por un huésped desconocido a pasar unos días de vacaciones en una lujosa mansión situada en una isla de la costa inglesa. Cada uno de los invitados tiene algo que esconder; y un crimen por el que debe pagar','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/701139.jpg')

INSERT INTO calificaciones (IDLibro, Estrella1, Estrella2, Estrella3, Estrella4, Estrella5) VALUES
(1, 4, 5, 3, 4, 5),
(2, 3, 4, 5, 2, 1),
(3, 5, 4, 3, 5, 4),
(4, 2, 3, 4, 5, 1),
(5, 4, 5, 2, 3, 4),
(6, 5, 4, 3, 2, 1),
(7, 3, 4, 5, 4, 3),
(8, 2, 3, 5, 4, 1),
(9, 5, 4, 3, 2, 4),
(10, 4, 5, 3, 1, 2),
(11, 3, 2, 4, 5, 1),
(12, 5, 4, 3, 2, 1),
(13, 2, 4, 5, 3, 1),
(14, 3, 5, 2, 4, 1),
(15, 4, 3, 5, 1, 2),
(16, 5, 4, 3, 2, 1),
(17, 2, 3, 5, 4, 1),
(18, 4, 5, 3, 2, 1);