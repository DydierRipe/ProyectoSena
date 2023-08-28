-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2023 at 03:29 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capymusic`
--

-- --------------------------------------------------------

--
-- Table structure for table `instrumenttype`
--

CREATE TABLE `instrumenttype` (
  `type` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `discount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instrumenttype`
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `instrumentType` int(1) DEFAULT NULL,
  `filters` longtext DEFAULT NULL,
  `seller` varchar(320) DEFAULT NULL,
  `owner` varchar(320) DEFAULT 'no-owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `instrumentType`, `filters`, `seller`, `owner`) VALUES
(37, 'Capybara', 20000, 'un hermoso capybara que nos permite ver la belleza de la vida con su música, de capymusic para ti, te queremos', 7, 'hermoso,capybara,belleza,guitarra,Other,Brown', 'dydierripe@gmail.com', 'no-owner'),
(38, 'Capybara negro humano', 30000, 'figura de cuerpo completo del primer capybara convertido a la raza humana, el mejor descubrimiento del siglo', 7, 'capybara,humano,raro,Other,Black', 'dydierripe@gmail.com', 'no-owner');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(320) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(60) DEFAULT NULL,
  `permissionlevel` int(11) NOT NULL DEFAULT 0,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `username`, `passwrd`, `permissionlevel`, `points`) VALUES
('anthonellam14@gmail.com', 'anthoxo', 'toxoponga2909', 1, 0),
('carlosjripe@gmail.com', 'carlitos', 'aaaeeeiiiooouuu', 0, 0),
('dydierripe@gmail.com', 'dydierripe', 'Dydier10347804261', 1, 0),
('fernandezfabianafernandez1@gmail.com', 'sofiua', '1518151815', 0, 0),
('lacanastasegura@gmail.com', 'Canasta', 'dadadadadadadada', 0, 0),
('yeikmauriciopulidoquitian@gmail.com', 'Jake', '123456789', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `waitlist`
--

CREATE TABLE `waitlist` (
  `email` varchar(320) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(256) DEFAULT NULL,
  `verifyCode` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `instrumenttype`
--
ALTER TABLE `instrumenttype`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrumentType` (`instrumentType`),
  ADD KEY `seller` (`seller`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `waitlist`
--
ALTER TABLE `waitlist`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `instrumenttype`
--
ALTER TABLE `instrumenttype`
  MODIFY `type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`instrumentType`) REFERENCES `instrumenttype` (`type`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`seller`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
