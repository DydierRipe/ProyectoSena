-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-09-2023 a las 23:50:25
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `capymusic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumenttype`
--

CREATE TABLE `instrumenttype` (
  `type` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `discount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `instrumenttype`
--

INSERT INTO `instrumenttype` (`type`, `name`, `discount`) VALUES
(1, 'string', 0),
(2, 'percussion', 0),
(3, 'woodwind', 0),
(4, 'brass', 0),
(5, 'electric', 0),
(6, 'parts', 0),
(7, 'other', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissionlevel`
--

CREATE TABLE `permissionlevel` (
  `id` int(11) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permissionlevel`
--

INSERT INTO `permissionlevel` (`id`, `description`) VALUES
(0, '\r\nCommon user, they can use the page normally, the can watch, report, sell and buy products. including everything that goes with that\r\n'),
(1, '\r\nthey have, in addition to the common user permissions, the ability of watching the purchase, sending, and everyting implied in the relationship between the buyer and the seller, they can also delete reported products.\r\n'),
(2, '\r\nbasically the admin of everything, they can do what level 0 and 1 user can, and they can modify the users data along with delete the user itself.\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `instrumentType` int(1) DEFAULT NULL,
  `filters` longtext DEFAULT NULL,
  `seller` varchar(120) DEFAULT NULL,
  `owner` varchar(320) DEFAULT 'no-owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `instrumentType`, `filters`, `seller`, `owner`) VALUES
(37, 'Capybara', 20000, 'un hermoso capybara que nos permite ver la belleza de la vida con su música, de capymusic para ti, te queremos', 7, 'hermoso,capybara,belleza,guitarra,Other,Brown', 'dydierripe@gmail.com', 'dydierripe@gmail.com'),
(64, 'Electric guitar', 120000, 'a very cool electric guitar, the best of the best, no damage, I used it 20 years.', 1, 'electric,cool,rad,best,String,Red', 'dydierripe@gmail.com', 'no-owner'),
(65, 'Banjo', 60000, 'A lovely banjo inherited by my grandpa, I don\'t want it anymore since his death, it just reminds me of him.', 1, 'old,beautiful,String,White', 'dydierripe@gmail.com', 'no-owner'),
(66, 'Ukelin', 150000, 'A collection piece of a Ukelin, a kind of hybrid I cant understand, I dont want it', 1, 'odd,Ukelin,worthy,String,Brown', 'dydierripe@gmail.com', 'no-owner'),
(68, 'Vendo puas', 10000, 'vendo puas de todo tipo, solo vienen 5 al azar, pero puedes ver cuales te pueden salir', 7, 'puas,guitarra,multicolor,llamativo,Other', 'dydierripe@gmail.com', 'no-owner'),
(70, 'Fonografo antiguo', 40000, 'un antiguo fonógrafo que vi por ahi en la basura, lo prometo. ', 7, 'fonografo,viejo,old,odd,extrano,Other,Brown', 'dydierripe@gmail.com', 'no-owner'),
(71, 'Schone geigen ', 60000, 'diese geigen sind meines opa, sagen sie nichts ihm bitte.', 1, 'geige,musik,schon,String,Red', 'dydierripe@gmail.com', 'no-owner'),
(72, 'flauta traversa', 40000, 'es gris, me la regalaron, pero no se como se toca, tampoco se como es escribe', 4, 'plateada,rara,odd,Brass,Gray', 'dydierripe@gmail.com', 'no-owner'),
(73, 'noisy battery', 100000, 'my son has been playing it several times, but I don\'t get the point of it, I\'d rather him to study geography.', 2, 'noisy,stupid,anti-sleep,weird,useless,Percussion,White', 'dydierripe@gmail.com', 'no-owner'),
(74, 'saxofon en buen estado', 78000, 'mi padre me lo compro cuando era niña, pero ahora paso necesidad y debo venderlo', 4, 'hermoso,preciado,amor,Brass,White', 'dydierripe@gmail.com', 'no-owner'),
(75, 'Trombon', 91200, 'I used to make youtube videos with it, but now that I moved away of my mother, my youtube channel hast lost its sense.', 4, 'used,beautiful,odd,Brass,Yellow', 'dydierripe@gmail.com', 'no-owner'),
(76, 'beautiful bass', 200000, 'I used to play with a band, the band fell apart and now I need money.', 5, 'Girly,odd,great,Electric,Purple', 'dydierripe@gmail.com', 'no-owner'),
(77, 'clarinete', 84500, 'el intrumento tocado por calamardo, que mas quieres, que lo toque patricio?', 4, 'elegante,gracia,belleza,Brass,Black', 'dydierripe@gmail.com', 'no-owner'),
(78, 'cello', 40000, 'someone else\'s trash is other\'s treasure I guess, I really suffered tryna play this, I was never able.', 1, 'awful,String,Red', 'dydierripe@gmail.com', 'no-owner'),
(79, 'Una mandolina', 110000, 'un producto raro para quien le gusten los desafios', 1, 'mandolina,odd,raro,desafiante,String,Brown', 'dydierripe@gmail.com', 'no-owner'),
(80, 'acordeon azul hermoso bello precioso', 70000, 'un bello acordeón el cual amo y quiero pasarle a alguien mas como símbolo de amor', 3, 'amor,hermoso,mar,brisa,playa,Woodwind,Blue', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(81, 'harpa o arpa', 70000, 'una hermosa harpa, o arpa ya que la busque en google y decia que se escribia con h', 1, 'hermosa,odd,griego,String,Orange', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(82, 'xilofono insano', 10000, 'el mas insano brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 2, 'insanidad,wazaaaa,esquizofrenia,raro,odd,Percussion,Gray', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(83, 'Marimba', 140000, 'a beautiful marimba just for u and everyone else in your house', 2, 'beautiful,odd,melody,Percussion,Orange', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(84, 'Oboe for everyone', 87000, 'I thought this oboe was a clarinete, but it looks like not, I wanted to play clarinete, not oboe', 3, 'odd,oboe,schwarz,weird,:(,Woodwind,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(85, 'flute for the school', 5000, 'I used this flute, my friend too, also did my boyfriend, I have not washed it.', 3, 'dirty,used,overused,school,Woodwind,White', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(86, 'Fagot wtfffff', 6000, 'es un chiste en ingles, resulta que este instrumento se llama fagot, en ingles no es muy bonita la palabra, si eres el que lo compra, te dejo este mensaje: \n????????????', 4, 'faggot,odd,funny,Brass,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `seller` varchar(120) DEFAULT NULL,
  `reason` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solditems`
--

CREATE TABLE `solditems` (
  `id` int(11) NOT NULL,
  `price` float DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `seller` varchar(120) DEFAULT NULL,
  `owner` varchar(120) DEFAULT NULL,
  `adress` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solditems`
--

INSERT INTO `solditems` (`id`, `price`, `name`, `seller`, `owner`, `adress`) VALUES
(63, 0, '90000', 'dydierripe@gmail.com', 'yeikmauriciopulidoquitian@gmail.com', 'sdsfdgdfbgfvvxdfx'),
(69, 0, '1000000', 'dydierripe@gmail.com', 'yeikmauriciopulidoquitian@gmail.com', 'sdsdfgbvdcdfs'),
(87, 0, '5000', 'yeikmauriciopulidoquitian@gmail.com', 'yeikmauriciopulidoquitian@gmail.com', 'sdfghjkljhgfdfghjk');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(120) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(60) DEFAULT NULL,
  `permissionlevel` int(11) NOT NULL DEFAULT 0,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `username`, `passwrd`, `permissionlevel`, `points`) VALUES
('anthonellam14@gmail.com', 'anthoxo', '$2b$10$ofjseIHqUVweRtefUC6rOuLjt6CLonfbyFAwArAI/gwKIKapHQSsO', 1, 0),
('carlosjripe@gmail.com', 'carloos', '$2b$10$f6PHxwTXt5P1U4sNvZ8GNOeju/ZSvTohdSVSWlZjgGF/dky.omJLK', 0, 0),
('dydierripe@gmail.com', 'dydierripe', '$2b$10$fkZT3FDLm1pQFwcgxEKjDuGqx50DX3b29rs3WVefVVeHGbo.zjWtK', 1, 0),
('fernandezfabianafernandez1@gmail.com', 'sofiua', '$2b$10$lqA0uU/NZeytI3n4Zzejp.os5iYau3LFpnPqPlgWN5IkrCTYkfTQG', 0, 0),
('lacanastasegura@gmail.com', 'Canasta', '$2b$10$DHVLKsmQB2BrFitlFdV.GOqd/tVxk3xgv/1iV/aR2vU1gvq/rnCkK', 0, 0),
('yeikmauriciopulidoquitian@gmail.com', 'Jake', '$2b$10$qeBbZ1CDJ.Pv5hsvvrkVZ.Pim2gAU5gn9GlwzimPiPYBMOscfOZES', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `waitlist`
--

CREATE TABLE `waitlist` (
  `email` varchar(120) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(256) DEFAULT NULL,
  `verifyCode` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `instrumenttype`
--
ALTER TABLE `instrumenttype`
  ADD PRIMARY KEY (`type`);

--
-- Indices de la tabla `permissionlevel`
--
ALTER TABLE `permissionlevel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrumentType` (`instrumentType`),
  ADD KEY `seller` (`seller`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller` (`seller`);

--
-- Indices de la tabla `solditems`
--
ALTER TABLE `solditems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller` (`seller`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD KEY `permissionlevel` (`permissionlevel`);

--
-- Indices de la tabla `waitlist`
--
ALTER TABLE `waitlist`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `instrumenttype`
--
ALTER TABLE `instrumenttype`
  MODIFY `type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `permissionlevel`
--
ALTER TABLE `permissionlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`instrumentType`) REFERENCES `instrumenttype` (`type`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`seller`) REFERENCES `users` (`email`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`seller`) REFERENCES `users` (`email`);

--
-- Filtros para la tabla `solditems`
--
ALTER TABLE `solditems`
  ADD CONSTRAINT `solditems_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `users` (`email`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permissionlevel`) REFERENCES `permissionlevel` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
