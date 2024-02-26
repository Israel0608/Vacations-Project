-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2024 at 08:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Vactions`
--
CREATE DATABASE IF NOT EXISTS `Vactions` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Vactions`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(1, 1),
(1, 3),
(1, 7),
(1, 9),
(1, 28),
(1, 38),
(3, 2),
(3, 6),
(4, 7),
(4, 8),
(5, 28),
(20, 7),
(28, 3),
(28, 28);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` int(11) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'Bart', 'Simpson', 'Bart10@gmail.com', 1010, 2),
(2, 'Lisa', 'Simpson', 'Lisa11@gmail.com', 5050, 1),
(3, 'israel', 'sofer', 'israel00@gmail.com', 1111, 2),
(4, 'menahem', 'sofer', 'menahem10@gmail.com', 2020, 2),
(5, 'shimi', 'shimi', 'shimi10@gmail.com', 2345, 2),
(18, 'test', 'test 1', 'test10@gmail.com', 4040, 2),
(20, 'test2', 'test2', 'test@gmail.com', 1111, 2),
(21, 'shimi', 'shimi', 'shimi10@gmail.com', 2345, 2),
(24, 'israel', 'sofer', 'Bart10@gmail.com', 1010, 2),
(25, 'israel', 'sofer', 'Bart10@gmail.com', 1010, 2),
(26, 'israel', 'sofer', 'Bart10@gmail.com', 1010, 2),
(28, 'israel', 'sofer', 'test303@gmail.com', 1010, 2),
(29, 'israel', 'sofer', 'Bart10@gmail.com', 1010, 2),
(30, 'israel', 'sofer', 'israel560@gmail.com', 5672, 2),
(31, 'israel', 'sofer', 'israel560@gmail.com', 5672, 2),
(32, 'sason', 'Simpaon', 'sason55@gmail.com', 1460, 2),
(33, 'sason', 'Simpaon', 'sason55@gmail.com', 1460, 2),
(34, 'sdjfdnjn', 'njjodsmf', 'aroma34@gmail.com', 4680, 2),
(35, 'sdjfdnjn', 'njjodsmf', 'aroma34@gmail.com', 4680, 2),
(36, 'tes', 'test', 'test8080@gmail.com', 987, 2),
(37, 'tes', 'test', 'test8080@gmail.com', 987, 2),
(38, 'test', 'test 1', 'test304@gmail.com', 4653, 2),
(39, 'test', 'test 1', 'test304@gmail.com', 4653, 2),
(40, 'israel', 'sofer', 'israelsof55@gmail.com', 4520, 2),
(41, 'israel', 'sofer', 'israelsof55@gmail.com', 4520, 2),
(42, 'israel', 'test 1', 'test43@gmail.com', 3432, 2),
(43, 'israel', 'test 1', 'test43@gmail.com', 3432, 2),
(44, 'israel', 'sofer', 'dgff88@gmail.com', 6466, 2),
(45, 'israel', 'sofer', 'dgff88@gmail.com', 6466, 2),
(46, 'israel', 'sofer', 'shmii455@gmail.com', 4578, 2),
(47, 'israel', 'sofer', 'shmii455@gmail.com', 4578, 2),
(48, 'israel', 'sofer', 'dhejf88@gmail.com', 3563, 2),
(49, 'israel', 'sofer', 'dhejf88@gmail.com', 3563, 2),
(50, 'israel', 'test 1', 'Bar23@gmail.com', 1010, 2),
(51, 'israel', 'test 1', 'Bar23@gmail.com', 1010, 2),
(52, 'israel', 'sofer', 'Bat80@gmail.com', 1023, 2),
(53, 'israel', 'sofer', 'Bat80@gmail.com', 1023, 2),
(54, 'israel', 'test 1', 'Btti10@gmail.com', 5555, 2),
(55, 'israel', 'test 1', 'Btti10@gmail.com', 5555, 2),
(56, 'israel', 'test 70', 'tes50@gmail.com', 0, 2),
(57, 'israel', 'test 70', 'tes50@gmail.com', 0, 2),
(58, 'israeltest', 'israeltest', 'israelTest00@gmail.com', 5555, 2),
(59, 'israeltest', 'israeltest', 'israelTest00@gmail.com', 5555, 2),
(62, 'i', 'i', 'ysrlswpr00@gmail.com', 9087, 2),
(63, 'i', 'i', 'ysrlswpr00@gmail.com', 9087, 2),
(64, 'i', 'i', 'israel0608@gmail.com', 4686, 2),
(65, 'i', 'i', 'israel0608@gmail.com', 4686, 2),
(68, 'test101', 'test101', 'test101@gmail.com', 2105, 2),
(69, 'test101', 'test101', 'test101@gmail.com', 2105, 2),
(70, 'shimi', 'shimi2', 'avinagar500@gmail.com', 1112, 2),
(71, 'shimi', 'shimi2', 'avinagar500@gmail.com', 1112, 2),
(72, 'israel', 'sofer', 'Bart10@gmail.com', 3333, 2),
(74, 'israel', 'sofer', 'test444@gmail.com', 40978, 2),
(75, 'israel', 'sofer', 'test444@gmail.com', 40978, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `description`, `checkIn`, `checkOut`, `price`, `imageName`) VALUES
(1, 'Paris, France', 'Romantic experience in the most beautiful urban city', '2024-12-06', '2024-12-10', 3000, 'b8174f6b-c0bb-4f2b-89c6-1b405aec1d95.jpeg'),
(2, 'Barcelona, Spain', 'Beach vacation with delicious food and fascinating culture', '2024-11-01', '2024-11-06', 2500, 'd52cd9e3-eaab-4888-b0ec-aea88e9ec8bd.jpeg'),
(3, 'Cape Town, South Africa', 'Spa near the Atlantic Ocean with stunning views', '2024-08-01', '2024-08-04', 2000, 'cacf4805-203c-4c82-8dec-3e92a03ae7c9.jpeg'),
(4, 'Tokyo, Japan', 'Japanese serenity with advanced technology', '2024-10-05', '2024-10-10', 4000, 'c0b60b27-87af-4b7c-94f7-9e5443759136.jpg'),
(5, 'Rio de Janeiro, Brazil', 'New Year celebration on the Atlantic coast', '2024-12-17', '2024-12-23', 5000, '1f9e1be3-719f-4c5b-8b3d-68f229b9f20c.jpeg'),
(6, 'Kyoto, Japan', 'Snowfall in historical gardens\r\n', '2024-07-04', '2024-07-08', 7000, '7af61c97-e52f-4727-8910-c729b22d94a6.jpg'),
(7, 'asdfasdf', 'asdfasdfasdfasdf', '2024-05-06', '2024-05-06', 650, '4067447a-e71c-4b62-be97-0c2d5c729df0.avif'),
(8, 'Santorini, Greece', 'Vacation in the architecturally rich islands with historical sites', '2024-11-14', '2024-11-20', 4000, 'a65ab4d7-42b3-48b4-930f-b91b3ee7d8b5.jpeg'),
(9, 'Sydney, Australia', 'Opera house tour and Bondi Beach', '2024-10-01', '2024-10-05', 6000, '25f021e7-ee5f-45ff-9887-97934bf0fe93.jpeg'),
(10, 'New York City, USA', 'Explore Manhattan, Times Square, and Central Park', '2024-10-16', '2024-10-20', 7000, '79f5f563-a203-4fea-a318-fa7b82ed4db6.jpeg'),
(12, 'Queenstown, New Zealand', 'Thrilling adventures in the \"Adventure Capital of the World\"', '2024-12-24', '2024-12-31', 8000, '82323bde-c054-4daf-b9f7-709503319bcd.jpeg'),
(28, 'Tel Aviv israel', 'Hello', '2023-10-10', '2023-10-10', 100, 'e8dce3cf-0e14-4a08-968d-994207db0139.jpeg'),
(38, 'Tel Aviv Israel', 'Amazing place', '2024-02-18', '2024-02-23', 500, 'bfe6e24f-57bb-4ef3-b53b-3d4721abc29a.jpeg'),
(48, 'Tel Aviv Israel', 'gtkkrfeefrt vjrgthiorfrg iejrthgrefrg dijrhtgir rijthjrg iejrgthjirig eirjgthjgri ejritgergihbn', '2025-10-10', '2025-10-11', 500, '31936efd-b275-4376-b88c-f7de424afe03.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId_2` (`userId`,`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
