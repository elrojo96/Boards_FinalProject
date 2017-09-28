CREATE TABLE users(
    firstName   VARCHAR(50) NOT NULL,
    lastName    VARCHAR(50) NOT NULL,
    username    VARCHAR(50) NOT NULL,
    passwrd     VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (username)
);

INSERT INTO users(firstName, lastName, username, passwrd)
VALUES ('Luis Alfonso', 'Rojo Sánchez', 'rojo', '12345');

CREATE TABLE publicaciones(
    ID          INT          NOT NULL AUTO_INCREMENT,
    username    VARCHAR(50)  NOT NULL,
    etiqueta    VARCHAR(50)  NOT NULL,
    contenido   VARCHAR(200) NOT NULL,
    
    PRIMARY KEY (ID),
    FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO publicaciones(ID, username, etiqueta, contenido)
VALUES  (1, 'rojo', '#comida', 'En la cafetería centrales es clásico pedir chilaquiles.'),
        (2, 'rojo', '#Tarea', 'En el centro de copiado de CIAP atienden muy rápido.'),
        (3, 'Prueba4', '#transporte', 'Es más eficiente tomar Uber que Taxi');

CREATE TABLE likes(
    ID              INT         NOT NULL AUTO_INCREMENT,
    ID_PUBLICACION  INT         NOT NULL,
    ID_USUARIO      VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_PUBLICACION) REFERENCES publicaciones(ID),
    FOREIGN KEY (ID_USUARIO) REFERENCES users(username)
);

INSERT INTO likes(ID, ID_PUBLICACION, ID_USUARIO)
VALUES (1, 3, 'rojo');

#Query para seleccionar las publicaciones que le han gustado a los usuarios
SELECT p.username, etiqueta, contenido, ID_USUARIO
FROM likes l
    JOIN publicaciones p
        ON l.ID_PUBLICACION = p.ID
    JOIN users u
        ON l.ID_USUARIO = u.username;