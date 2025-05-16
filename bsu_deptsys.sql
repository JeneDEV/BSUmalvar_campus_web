-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 04:05 AM
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
-- Table structure for table `tbl_blog`
--

CREATE TABLE `tbl_blog` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `pictures` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `author` varchar(255) NOT NULL,
  `file_pdf` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_blog`
--

INSERT INTO `tbl_blog` (`id`, `title`, `description`, `pictures`, `date`, `author`, `file_pdf`, `department`) VALUES
(4, 'Blog Post 11', 'This is the description of blog post 1.', 'blog1.jpg', '2025-04-29 00:00:00', 'John Doe', 'blog1.pdf', 'CABEIHM'),
(9, 'asdmalsdmlk', 'alsmdlasml', '360_F_329144637_fLag9jYbaYQwo3apYr8OEzTrdUWWwXCR.jpg', '2025-04-29 00:00:00', 'asmdkasmdksm', 'CET -FUNCTIONAL-CHART-2023.pdf', 'CET'),
(10, 'asdmalsdmlk', 'alsmdlasml', '360_F_329144637_fLag9jYbaYQwo3apYr8OEzTrdUWWwXCR.jpg', '2025-04-29 00:00:00', 'asmdkasmdksm', 'CET -FUNCTIONAL-CHART-2023.pdf', 'CET'),
(11, 'Blog Post 11', 'This is the description of blog post 1.', 'blog1.jpg', '2025-04-29 00:00:00', 'John Doe', 'blog1.pdf', 'CET'),
(12, 'Blog Post 11', 'This is the description of blog post 1.', 'blog1.jpg', '2025-04-29 00:00:00', 'John Doe', 'blog1.pdf', 'CAS');

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
(1, 'CET', 'time frame alba and pancho.pdf', '2025-04-28'),
(3, 'CTE', 'CICS-List-of-Student-Smart-ID-Card-2025.pdf', '2025-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT 'N/A',
  `logo` varchar(255) DEFAULT 'N/A',
  `description` text DEFAULT 'N/A',
  `qr` varchar(255) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `name`, `logo`, `description`, `qr`) VALUES
(2, 'College of Engineering Technology (CET)', 'CET_LOGO.png', 'The College of Industrial Technology (CIT) is one of the premier departments in Batangas State University-JPLPC Malvar. The college offers Bachelor of Industrial Technology (BIT) since 2001. It delivers Dual Training System (DTS) which provides Vocational, Technical, and Technician training programs. The DTS is a special type of vocational training that combines two places of learning: the school and the factory. It is called the Dual System since learning takes place both in the classroom and in the company. The Republic Act No. 7686 or the Dual Training System Act of 1994 was signed into Law by Pres. Fidel V. Ramos on February 25, 1994.', 'qr_sample.png'),
(8, 'College of Informatics and Computing Sciences (CICS)', 'CICS LOGO.png', 'The College of Informatics and Computing Sciences offers undergraduate programs, facilitated by highly competent professionals and innovative faculty members that serve as academic advisors, Professors, Instructors and Mentors catering to one thousand and fifteen (1,015) Information Technology and Computer Science students. The broad expertise of the facilitators is invaluable to the students, organization, and community. They focus on attending relevant seminars, trainings and workshops for the continuous professional enhancement of knowledge and skills. They are also active in research and development activities.\r\n\r\nThe college focuses on the technical aspects and real-world applications of Business Analytics, Artificial Intelligence, Machine Learning, Deep Learning, IoT and Security Protocols. The college also prepares the graduate to address various user needs including the selection, creation, application, development, evaluation, integration and management of computing technologies within the administration of the computing-based system.', 'qr sample.png'),
(9, 'College of Teacher Education (CTE)', 'CICS LOGO.png', 'The College of Informatics and Computing Sciences offers undergraduate programs, facilitated by highly competent professionals and innovative faculty members that serve as academic advisors, Professors, Instructors and Mentors catering to one thousand and fifteen (1,015) Information Technology and Computer Science students. The broad expertise of the facilitators is invaluable to the students, organization, and community. They focus on attending relevant seminars, trainings and workshops for the continuous professional enhancement of knowledge and skills. They are also active in research and development activities.\r\n\r\nThe college focuses on the technical aspects and real-world applications of Business Analytics, Artificial Intelligence, Machine Learning, Deep Learning, IoT and Security Protocols. The college also prepares the graduate to address various user needs including the selection, creation, application, development, evaluation, integration and management of computing technologies within the administration of the computing-based system.', 'qr sample.png'),
(11, 'College of Arts and Sciences (CAS)', 'CICS LOGO.png', 'The College of Arts and Sciences, being the heart of the university, has always adhered to being a cradle of academic excellence. With this, everyone in the college is expected to uphold the dignity of the teaching profession by giving the students of CAS effective academic deliverables. Under the first pillar, the college shall institutionalize an induction and orientation program for its student leaders, faculty, staff and students in order to make them internalize the vision, mission and core values of the university.', 'qr sample.png'),
(12, 'College of Accountancy, Business, Economics and International Hospitality Management (CABEIHM)', 'CICS LOGO.png', 'The College of Accountancy, Business, Economics and International Hospitality Management aims to provide leadership in quality instruction, extension services, professional training in Accountancy, Business, International Hospitality Management. It also aims to produce scientifically trained, economically stable, and environmentally conscious citizens.\r\n\r\nMoreover, it is also anchored on the philosophy of providing students with humanistic education their commitment to personal growth and social transformation, thus, making them professionals possessing love and faith in the Almighty God, country, and fellowmen.', 'qr sample.png'),
(13, 'College Of Engineering (COE)', 'CET LOGO.png', '\"The campus is strategically located within various Industrial Parks that will cater to the employment of graduates of different engineering disciplines. And because of the status of Batangas State University as one of the top Engineering Universities in the country, many companies and establishments forged partnerships in the college in relation to employment, training, seminars and research and extension services. Headed by their Dean who is an ASEAN Engineer, the College of Engineering is composed of highly qualified faculty members and equipped with different laboratories.', 'qr sample.png');

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
(1, 'Dr. Glenn A. Caraig', 'Dean / Associate Professor I', 'Picture4.png', 'CET', 'PhD in Technology Management\nMaster of Arts in Information Technology Education\n\nMaster in Business Administration\n\nBachelor of Industrial Technology major in Computer Engineering Technology\n', 'College Officials, Faculty, Teaching'),
(4, 'Dr. Amado C. Gequinto', 'Chancellor/ Professor II', 'Picture1.png', 'CET', 'PhD in Technology Management\r\nMaster of Arts in Information Technology Education', 'College Officials, Faculty, Teaching'),
(5, 'Dr. Dennis B. Legaspi', 'Dean/Vice-Chancellor for Academic Affairs', 'Picture3.png', 'CABEIHM', 'PhD in Technology Management\r\nMaster of Arts in Information Technology Education', 'College Officials, Faculty, Teaching'),
(7, 'Ms. Lorna Novilla', 'Administrative Aide VI', 'Picture5.png', 'CET', 'Bachelor of Science in Hospital Management', 'Staff, Non-Teaching'),
(8, 'Mr. Jayson Mendoza', 'Laboratory Technician', 'Picture6.jpg', 'CET', 'Bachelor Degree', 'Staff, Non-Teaching'),
(9, 'Dr. Rinalyn G. Magtibay', 'Associate Dean/ Assistant Professor II', 'Picture7.jpg', 'CET', 'PhD in Food Technology\r\n', 'College Officials, Faculty, Teaching'),
(10, 'Dr. George P. Compasivo', 'Professor II/ Head, OJT/ OJT, Coordinator/ Department Chairperson', 'Picture8.png', 'CET', 'PhD in Technology Management\r\nMaster of Arts in Information Technology Education', 'College Officials, Faculty, Teaching'),
(11, 'Engr. John Denver F. Falculan', 'Head, SDO/ Department Chairperson/ Instructor I', 'Picture9.jpg', 'CET', 'PhD in Technology Management\r\nMaster of Arts in Information Technology Education', 'College Officials, Faculty, Teaching'),
(12, 'Maria Kristine M. Carandang', 'Special Assignment/ Office of the Chancellor/ Department Chairperson/ Instructor II', 'Picture10.jpg', 'CET', 'Special Assignment, Office of the Chancellor   Department Chairperson\r\nInstructor II', 'College Officials, Faculty, Teaching'),
(13, 'Mr. Mark Meck Balao-as', 'Lecturer I', 'Picture12.jpg', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(14, 'Mr. Eldrian Latayan', 'Lecturer I', 'Picture14.jpg', 'CET', 'BS Electronics Engineering\r\nRegistered Electronics Technician', 'Faculty'),
(15, 'Engr. Jeffrey M. Rocha', 'Lecturer I', 'Picture17.png', 'CET', 'BS Mechatronics Engineering', 'Teaching'),
(16, 'Engr. Jeffrey M. Rocha', 'Lecturer I', 'Picture18.jpg', 'CET', 'BS Mechatronics Engineering', 'Teaching'),
(17, 'Engr. Maria Cecilia F. Ante', 'Lecturer V', 'Picture19.png', 'CET', 'Lecturer V', 'Faculty, Teaching'),
(18, 'Mrs. Jennifer A. Basilan', 'Assistant Professor IV/ Head, Planning', 'Picture21.jpg', 'CET', 'Assistant Professor IV \r\n Head, Planning', 'College Officials, Faculty, Teaching'),
(19, 'Joel R. Cornejo', 'Assistant Professor IV/ Head, EMU/ Extension Research Coordinator', 'Picture22.jpg', 'CET', 'Assistant Professor IV/ Head, EMU/ Extension Research Coordinator', 'College Officials, Faculty, Teaching'),
(20, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture26.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(21, 'Ms. Sotera J. Cepillo ', 'Lecturer III', 'Picture27.jpg', 'CET', 'Lecturer III', 'Faculty, Teaching'),
(22, 'Ms. Ciara Camille D. Cheng ', 'Lecturer I', 'Picture30.jpg', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(23, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture31.png', 'CET', '4th Year BSIT Student', 'Faculty'),
(24, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture33.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(25, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture34.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(26, 'Mr. John Press M. Ramos', 'Lecturer I', 'Picture36.jpg', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(27, 'Mr. Deo P. Villaflores', 'Lecturer I', 'Picture37.jpg', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(28, 'Engr. Jeffrey M. Rocha', 'Lecturer I', 'Picture38.png', 'CET', 'BS Mechatronics Engineering', 'Teaching'),
(29, 'Engr. Jeffrey M. Rocha', 'Lecturer I', 'Picture39.png', 'CET', 'BS Mechatronics Engineering', 'Teaching'),
(30, 'Dr. Rosana C. Lat', 'Associate Professor II/ Vice Chancellor for Research Development and Extension Services', 'Picture42.jpg', 'CET', 'Associate Professor II/ Vice Chancellor for Research Development and Extension Services', 'College Officials, Faculty, Teaching'),
(31, 'Mr. Teddy G. Piamonte', 'Instructor I OIC-Head, SOA/OSD', 'Picture44.png', 'CET', 'Instructor I\r\nOIC-Head, SOA/OSD', 'College Officials, Faculty, Teaching'),
(32, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture45.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(33, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture46.jpg', 'CET', '4th Year BSIT Student', 'College Officials'),
(34, 'Engr. Erwin F. De Castro', 'Lecturer III', 'Picture47.jpg', 'CET', 'Lecturer III', 'Faculty, Teaching'),
(35, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture48.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(36, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture49.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(37, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture50.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(38, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture51.jpg', 'CET', '4th Year BSIT Student', 'Faculty'),
(39, 'Mr. Roman M. Atienza', 'Lecturer I', 'Picture52.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(40, 'Mr. Nathaniel O. Dela Cueva', 'Lecturer I', 'Picture53.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(41, 'Ar. Van Ryan C. Alcazar', 'Lecturer I', 'Picture54.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(42, 'Engr. Armon C. Landicho', 'Lecturer I', 'Picture55.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(43, 'Ms. Geraldine B. Cordenete', 'Lecturer I', 'Picture56.png', 'CET', 'Lecturer I\r\n\r\nMaster in Business Administration\r\n\r\nBachelor of Industrial Technology major in Computer Engineering Technology\r\n', 'Faculty, Teaching'),
(44, 'Aizel A. Delos Reyes', 'Lecturer I', 'Picture57.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(45, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture58.png', 'CET', '4th Year BSIT Student', 'College Officials'),
(46, 'Glenn G. Dimaano ', 'Lecturer I', 'Picture59.png', 'CET', 'Lecturer I', 'Faculty, Teaching'),
(47, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture61.png', 'CET', '4th Year BSIT Student', 'Faculty'),
(50, 'Jene Russel R. Alba', 'OJT / INTERN', 'Picture63.png', 'CET', '4th Year BSIT Student', 'College Officials'),
(51, 'Apolinar B. Dimaala ', 'Instructor I/ PJT, Coordinator/ Special Assignment, MEIC  ', 'Picture64.png', 'CET', 'Instructor I/ PJT, Coordinator/ Special Assignment, MEIC  ', 'Faculty, Teaching'),
(52, 'Teodoro B. Panganiban', 'Assistant Professor I', 'Picture65.png', 'CET', 'Assistant Professor I', 'Faculty, Teaching');

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
-- Indexes for table `tbl_blog`
--
ALTER TABLE `tbl_blog`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `tbl_blog`
--
ALTER TABLE `tbl_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_curriculum`
--
ALTER TABLE `tbl_curriculum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_laboratory`
--
ALTER TABLE `tbl_laboratory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
