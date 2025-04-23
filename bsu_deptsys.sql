-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2025 at 06:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsu_deptsys`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'BSUmalvar@g.batstate-u.admin', 'BSUJPLPC');

-- --------------------------------------------------------


--
-- Table structure for table `tbl_curriculum`
--

CREATE TABLE `tbl_curriculum` (
  `id` int(11) NOT NULL,
  `department` varchar(255) NOT NULL,
  `curriculum` varchar(255) DEFAULT NULL,
  `date_upload` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_curriculum`
--

INSERT INTO `tbl_curriculum` (`id`, `department`, `curriculum`, `date_upload`) VALUES
(1, 'CET', 'time frame alba and pancho.pdf', '2025-04-22'),
(2, 'CICS', 'CICS-List-of-Student-Smart-ID-Card-2025.pdf', '2025-04-22'),
(3, 'CTE', 'CICS-List-of-Student-Smart-ID-Card-2025.pdf', '2025-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT 'N/A',
  `logo` varchar(255) DEFAULT 'N/A',
  `description` text,
  `qr` varchar(255) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `name`, `logo`, `description`, `qr`) VALUES
(2, 'College of Engineering Technology (CET)', 'CET_LOGO.png', 'The College of Industrial Technology (CIT) is one of the premier departments in Batangas State University-JPLPC Malvar. The college offers Bachelor of Industrial Technology (BIT) since 2001. It delivers Dual Training System (DTS) which provides Vocational, Technical, and Technician training programs. The DTS is a special type of vocational training that combines two places of learning: the school and the factory. It is called the Dual System since learning takes place both in the classroom and in the company. The Republic Act No. 7686 or the Dual Training System Act of 1994 was signed into Law by Pres. Fidel V. Ramos on February 25, 1994.', 'qr_sample.png'),
(8, 'College of Informatics and Computing Sciences (CICS)', 'CICS LOGO.png', 'The College of Informatics and Computing Sciences offers undergraduate programs, facilitated by highly competent professionals and innovative faculty members that serve as academic advisors, Professors, Instructors and Mentors catering to one thousand and fifteen (1,015) Information Technology and Computer Science students. The broad expertise of the facilitators is invaluable to the students, organization, and community. They focus on attending relevant seminars, trainings and workshops for the continuous professional enhancement of knowledge and skills. They are also active in research and development activities.\r\n\r\nThe college focuses on the technical aspects and real-world applications of Business Analytics, Artificial Intelligence, Machine Learning, Deep Learning, IoT and Security Protocols. The college also prepares the graduate to address various user needs including the selection, creation, application, development, evaluation, integration and management of computing technologies within the administration of the computing-based system.', 'qr sample.png'),
(9, 'College of Teacher Education (CTE)', 'CICS LOGO.png', 'The College of Informatics and Computing Sciences offers undergraduate programs, facilitated by highly competent professionals and innovative faculty members that serve as academic advisors, Professors, Instructors and Mentors catering to one thousand and fifteen (1,015) Information Technology and Computer Science students. The broad expertise of the facilitators is invaluable to the students, organization, and community. They focus on attending relevant seminars, trainings and workshops for the continuous professional enhancement of knowledge and skills. They are also active in research and development activities.\r\n\r\nThe college focuses on the technical aspects and real-world applications of Business Analytics, Artificial Intelligence, Machine Learning, Deep Learning, IoT and Security Protocols. The college also prepares the graduate to address various user needs including the selection, creation, application, development, evaluation, integration and management of computing technologies within the administration of the computing-based system.', 'qr sample.png'),
(10, 'College of Engineering Technology (CET)', 'CET_LOGO.png', 'The College of Industrial Technology (CIT) is one of the premier departments in Batangas State University-JPLPC Malvar. The college offers Bachelor of Industrial Technology (BIT) since 2001. It delivers Dual Training System (DTS) which provides Vocational, Technical, and Technician training programs. The DTS is a special type of vocational training that combines two places of learning: the school and the factory. It is called the Dual System since learning takes place both in the classroom and in the company. The Republic Act No. 7686 or the Dual Training System Act of 1994 was signed into Law by Pres. Fidel V. Ramos on February 25, 1994.', 'qr_sample.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_laboratory`
--

CREATE TABLE `tbl_laboratory` (
  `id` int(11) NOT NULL,
  `department` varchar(255) NOT NULL,
  `laboratory_image` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_laboratory`
--

INSERT INTO `tbl_laboratory` (`id`, `department`, `laboratory_image`, `description`, `room_name`) VALUES
(1, 'CET', 'Post OJT REQ - CHECKLIST.png', 'The room facility for Food Technology is equipped with specialized workstations and modern equipment to conduct experiments and activities related to food preservation, product development, and nutrition analysis. It provides a controlled environment with necessary safety measures and storage options to support both academic research and practical applications in the field.', 'FOODTECH'),
(2, 'CICS', 'R.jpg', 'Food tech sample', 'CHEMLAB');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profile`
--

CREATE TABLE `tbl_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_profile`
--

INSERT INTO `tbl_profile` (`id`, `name`, `position`, `image`, `department`, `description`, `category`) VALUES
(1, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', 'A 4th Year BSIT Intern, I love to seek professional guidance and professional skills that hone and nurture myself for future events ', 'College Officials, Staff'),
(4, 'Rodelyn Pancho', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(5, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(6, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(7, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(8, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(9, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(10, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(11, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(12, 'Jene Russel R. Alba', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(13, 'Lorna Novilla', 'OJT / INTERN', '8a994607-89a0-4680-9c04-50f2b4214d66.jpg', 'CET', '4th Year BSIT Student', 'College Officials, Staff, Non-Teaching'),
(14, 'jene', 'hahah', 'profile_1745376755773_fa68b3ea-5280-4941-a666-e090bdbb31b6.jpg', 'CET', 'hahaha', 'College Officials, Non-Teaching');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


--
-- Indexes for table `tbl_curriculum`
--
ALTER TABLE `tbl_curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_laboratory`
--
ALTER TABLE `tbl_laboratory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


--
-- AUTO_INCREMENT for table `tbl_curriculum`
--
ALTER TABLE `tbl_curriculum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_laboratory`
--
ALTER TABLE `tbl_laboratory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
