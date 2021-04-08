CREATE DATABASE geek_cosmetics;

USE geek_cosmetics;
DROP TABLE IF EXISTS  orders;
DROP TABLE IF EXISTS  items;

CREATE TABLE orders(
   order_num INT(5) AUTO_INCREMENT PRIMARY KEY,
   client_name VARCHAR(25) NOT NULL,
   subtotal INT(255 ),
   iva INT(23),
   total INT(255),
   time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items( 
   id INT(5) AUTO_INCREMENT PRIMARY KEY,
   descripcion VARCHAR(100) NOT NULL,
   precio INT(10) NOT NULL,
   existencia INT(8) NOT NULL
);


INSERT INTO items (descripcion, precio,existencia) VALUES ('Foam', 25000, 523);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Carbón Activado WIKI', 18000,300);
INSERT INTO items (descripcion, precio,existencia) VALUES ('DepilYA', 10000,1000);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Mantequilla Corporal (durazno)', 25000,1000);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Bronceador', 40000,250);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Antiestrias', 35000,300);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Despigmentante Intimo', 40000,500);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Despigmentante Facial', 35000,365);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Dermatónico', 40000,500);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Mantequilla Corporal (frutos rojos)', 25000,2000);
INSERT INTO items (descripcion, precio,existencia) VALUES ('Mantequilla Corporal (naranja)', 25000,700);
