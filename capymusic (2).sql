-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2023 at 05:42 AM
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
  `productImage` longtext DEFAULT NULL,
  `filters` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(320) DEFAULT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(60) DEFAULT NULL,
  `permissionlevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `username`, `passwrd`, `permissionlevel`) VALUES
('anthonellam14@gmail.com', 'anthoxo', 'toxoponga2909', 0),
('lacanastasegura@gmail.com', 'Canasta', 'dadadadadadadada', 0),
('dydierripe@gmail.com', 'dydierripe', 'Dydier10347804261', 1),
('fernandezfabianafernandez1@gmail.com', 'sofiua', '1518151815', 0),
('yeikmauriciopulidoquitian@gmail.com', 'Jake', '123456789', 0);

-- --------------------------------------------------------

--
-- Table structure for table `waitlist`
--

CREATE TABLE `waitlist` (
  `email` varchar(320) DEFAULT NULL,
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
  ADD KEY `instrumentType` (`instrumentType`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`instrumentType`) REFERENCES `instrumenttype` (`type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
