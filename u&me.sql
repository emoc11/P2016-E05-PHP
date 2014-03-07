# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Hôte: 127.0.0.1 (MySQL 5.5.33)
# Base de données: u&me
# Temps de génération: 2014-03-07 08:27:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table album
# ------------------------------------------------------------

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `album_id` int(11) NOT NULL AUTO_INCREMENT,
  `couples_id` int(11) DEFAULT NULL,
  `photos_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  KEY `album_fk1` (`couples_id`),
  KEY `photos_id` (`photos_id`),
  CONSTRAINT `album_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`),
  CONSTRAINT `photos_id` FOREIGN KEY (`photos_id`) REFERENCES `photos` (`photos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table calendar
# ------------------------------------------------------------

DROP TABLE IF EXISTS `calendar`;

CREATE TABLE `calendar` (
  `calendar_id` int(11) NOT NULL AUTO_INCREMENT,
  `couples_id` int(11) DEFAULT NULL,
  `nom` varchar(25) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`calendar_id`),
  KEY `calendar_fk1` (`couples_id`),
  CONSTRAINT `calendar_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table cheques
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cheques`;

CREATE TABLE `cheques` (
  `cheques_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `msg` text,
  `points` int(11) DEFAULT NULL,
  `couples_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cheques_id`),
  KEY `cheques_fk1` (`couples_id`),
  CONSTRAINT `cheques_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table couples
# ------------------------------------------------------------

DROP TABLE IF EXISTS `couples`;

CREATE TABLE `couples` (
  `couples_id` int(11) NOT NULL AUTO_INCREMENT,
  `homme` int(11) DEFAULT NULL,
  `femme` int(11) DEFAULT NULL,
  `date_inscri` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `image_fond` text,
  PRIMARY KEY (`couples_id`),
  KEY `couples_fk1` (`homme`),
  KEY `couples_fk2` (`femme`),
  CONSTRAINT `couples_fk1` FOREIGN KEY (`homme`) REFERENCES `users` (`users_id`),
  CONSTRAINT `couples_fk2` FOREIGN KEY (`femme`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `couples` WRITE;
/*!40000 ALTER TABLE `couples` DISABLE KEYS */;

INSERT INTO `couples` (`couples_id`, `homme`, `femme`, `date_inscri`, `image_fond`)
VALUES
	(1,1,2,'2014-03-06 19:47:09','bg.jpg');

/*!40000 ALTER TABLE `couples` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table fantasmes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fantasmes`;

CREATE TABLE `fantasmes` (
  `fantasmes_id` int(11) NOT NULL AUTO_INCREMENT,
  `couples_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`fantasmes_id`),
  KEY `fantasmes_fk1` (`couples_id`),
  KEY `fantasmes_fk2` (`users_id`),
  CONSTRAINT `fantasmes_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`),
  CONSTRAINT `fantasmes_fk2` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `photos_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(50) DEFAULT NULL,
  `couples_id` int(11) DEFAULT NULL,
  `date_depot` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_suppr` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`photos_id`),
  KEY `photos_fk1` (`couples_id`),
  CONSTRAINT `photos_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table tabou
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tabou`;

CREATE TABLE `tabou` (
  `tabou_id` int(11) NOT NULL AUTO_INCREMENT,
  `couples_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  `date_depot` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_publi` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`tabou_id`),
  KEY `tabou_fk1` (`couples_id`),
  KEY `tabou_fk2` (`users_id`),
  CONSTRAINT `tabou_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`),
  CONSTRAINT `tabou_fk2` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `pseudo` varchar(30) NOT NULL,
  `gender` varchar(5) NOT NULL DEFAULT '',
  `horoscope` varchar(50) DEFAULT NULL,
  `nb_punching` int(11) DEFAULT '0',
  `nb_bisous` int(11) DEFAULT '0',
  `img` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`users_id`, `email`, `password`, `pseudo`, `gender`, `horoscope`, `nb_punching`, `nb_bisous`, `img`)
VALUES
	(1,'emoc11@free.fr','test','emoc11','m',NULL,0,0,'bfriend.jpg'),
	(2,'test@hotmail.fr','test','test','f',NULL,0,0,'bfriend.jpg');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table wish_content
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wish_content`;

CREATE TABLE `wish_content` (
  `content_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) DEFAULT NULL,
  `content` text,
  `couples_id` int(11) DEFAULT NULL,
  `wishlist_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`content_id`),
  KEY `wish_content_fk1` (`users_id`),
  KEY `wish_content_fk2` (`couples_id`),
  KEY `wish_content_fk3` (`wishlist_id`),
  CONSTRAINT `wish_content_fk1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`),
  CONSTRAINT `wish_content_fk2` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`),
  CONSTRAINT `wish_content_fk3` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`wishlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table wishlists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wishlists`;

CREATE TABLE `wishlists` (
  `wishlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `couples_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `wishlists_fk1` (`couples_id`),
  CONSTRAINT `wishlists_fk1` FOREIGN KEY (`couples_id`) REFERENCES `couples` (`couples_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
