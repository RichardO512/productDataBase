USE registration;
CREATE TABLE product (
  `id` int(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `song` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE users RENAME product;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
  
  SELECT * FROM registration WHERE product;

