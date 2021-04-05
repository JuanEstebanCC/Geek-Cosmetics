CREATE DATABASE geek_cosmetics;

USE geek_cosmetics;
DROP TABLE IF EXISTS  orders;

CREATE TABLE orders(
   order_num INT(5) AUTO_INCREMENT PRIMARY KEY,
   client_name VARCHAR(25) NOT NULL,
   item VARCHAR(100) NOT NULL,
   quantity INT(10) NOT NULL,
   subtotal INT(255) NOT NULL,
   time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



