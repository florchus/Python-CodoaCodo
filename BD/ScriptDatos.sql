INSERT INTO Genero (Descripcion)
VALUES
('Aventura'),
('Misterio'),
('Naturaleza'),
('Romance')

INSERT INTO Libro (Titulo,Genero,Autor,Resumen,Portada)
VALUES
('HEARTSTOPPER',4,'ALICE OSEMAN','Charlie y Nick van al mismo colegio; aunque nunca se habían cruzado hasta el día en que los hacen sentarse juntos en su grupo de estudio. Muy pronto se vuelven amigos y más pronto aún Charlie comienza a sentir cosas por Nick, aunque sabe que es un imposible','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/673905.jpg'),
('EL PRINCIPE',4,'ARMENTROUT, JENNIFER','Frío; letal; despiadado. Temido por los faes y los humanos por igual; no hay nadie más peligroso que el Príncipe. Atormentado por un pasado que no pudo controlar; Caden desea vengarse de aquellos que le hicieron daño y lo dejaron atrapado en una pesadilla interminable.','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/709730.jpg'),
('Y NO QUEDO NINGUNO',2,'AGATHA CHRISTIE','Diez personas que no se han visto nunca son invitadas por un huésped desconocido a pasar unos días de vacaciones en una lujosa mansión situada en una isla de la costa inglesa. Cada uno de los invitados tiene algo que esconder; y un crimen por el que debe pagar','https://www.tematika.com/media/catalog/Ilhsa/Imagenes/701139.jpg')

select * from genero