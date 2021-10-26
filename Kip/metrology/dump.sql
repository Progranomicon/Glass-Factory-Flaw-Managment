/*
SQLyog Enterprise - MySQL GUI v8.14 
MySQL - 5.1.52-community : Database - metrolog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `steklo`;

/*Table structure for table `tools` */

DROP TABLE IF EXISTS `metrology`;

CREATE TABLE `metrology` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) CHARACTER SET utf8 NOT NULL,
  `sn` VARCHAR(50) CHARACTER SET utf8 NOT NULL,
  `toolType` VARCHAR(50) CHARACTER SET utf8 DEFAULT NULL,
  `accClass` VARCHAR(50) CHARACTER SET utf8 DEFAULT NULL,
  `mRange` VARCHAR(50) CHARACTER SET utf8 DEFAULT NULL,
  `frValidation` TINYINT(3) UNSIGNED NOT NULL,
  `lastValidation` DATE NOT NULL,
  `validationOrg` VARCHAR(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=409 DEFAULT CHARSET=cp1251;

/*Data for the table `tools` */
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('64', 'Гиря калибровочная 1кГ', ' 1', ' М1', ' кл 4', '1кГ', '12', '2013-02-08', 'ОГМетр');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('67', 'Гиря калибровочная 2кГ', ' 2', ' М1', ' кл 4', '2кГ', '12', '2013-02-08', 'ОГМетр');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('77', 'Штангенциркуль ', '74051', ' ШЦ-1', ' кл 2', '0-150 мм', '12', '2012-06-21', 'ОГМетр');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('78', 'Микрометр', '8573', 'МК-1', ' 0.01мм кл.2', '0-25 мм', '12', '2012-06-21', 'ОГМетр ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('81', 'Индикатор час.типа', '184718', 'ИЧ-1', ' кл 2', '0-10 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('83', 'Индикатор час.типа', '186038', 'ИЧ-1', ' кл 2', '0-10 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('90', 'Штангенциркуль', '08093608', 'ШЦ-125', ' кл 2', '0-150 мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('101', 'Штангенциркуль', '817871', 'ШЦ-2', ' кл 2', '0-250 мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('104', 'Штангенциркуль', '817833', 'ШЦ-2', ' кл 2', '0-250 мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('114', 'Штангенрейсмас', '10327', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('118', 'Штангенрейсмас', '806036', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('119', 'Штангенрейсмас', '806018', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('120', 'Штангенрейсмас', '806066', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-09-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('121', 'Штангенрейсмас', '51138474', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('122', 'Штангенрейсмас', '805980', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-09-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('125', 'Штангенрейсмас', '806055', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-09-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('126', 'Штангенрейсмас ', '51138481', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-07-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('127', 'Приспособл. для контроля высоты', '85', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('128', 'Приспособл. для контроля высоты', '7183', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('131', 'Измеритель толщины', '00182', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2012-12-25', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('132', 'Измеритель толщины', '00185', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2012-12-25', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('133', 'Измеритель толщины', '00186', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2013-01-18', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('135', 'Измеритель толщины', '00183', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2013-04-15', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('136', 'Измеритель толщины', '00184', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2012-08-20', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('137', 'Измеритель толщины', '00187', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2012-09-19', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('141', 'Полярископ -поляриметр', '81015', 'ПКС-250М', ' кл 2', 'хххххххх', '36', '2012-12-25', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('142', 'Полярископ ', '736', 'АGR C-071', ' кл 2', 'хх', '12', '2012-09-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('146', 'Штангенциркуль ', '100988', 'ШЦ-2', '2', '0-250мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('148', 'Штангенциркуль', '101087', 'ШЦ-2', '2', '0-250мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('149', 'Штангенциркуль', '101169', 'ШЦ-2', '2', '0-250мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('154', 'Штангенциркуль', '01103730', 'ШЦ-1', '2', '0-150мм', '12', '2012-12-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('156', 'Фотометр пламенный', '11910', 'PFP-7', '- - - - - - - ', '- - - - - ', '12', '2012-06-25', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('157', 'Весы электронные лабораторные', '08-02017', 'Leki B2104', '1', '1кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('158', 'Весы электронные лабораторные', '08-02026', 'Leki B2104', '1', '1кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('159', 'Весы электронные лабораторные', '08-02028', 'Leki B2104', '1', '1кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('160', 'Весы электронные лабораторные', '08-02030', 'Leki B2104', '1', '1кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('161', 'Весы электронные лабораторные', '8727076709', 'RV 3102', '1', '3кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('162', 'Весы электронные лабораторные', '20002', 'Leki B30001', '1', '1кГ', '12', '2013-05-31', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('163', 'Ph-метр ', '07-49008', 'Leki РН-3Е', '1', 'хх', '12', '2012-09-10', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('164', 'Терморегулятор электронный ОВЕН', '06994070402078034', 'ТРМ10', '1', '0-100 град. С', '12', '2013-02-28', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('165', 'Спектрофотометр', 'Wp-0711035', 'UNIKO 1201', '1', 'хх', '12', '2012-06-25', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('166', 'Печ муфельная', '200198', 'L5/11/B170', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('167', 'Печ муфельная', '200199', 'L5/11/B170', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('168', 'Печ муфельная', '200200', 'L5/11/B170', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('169', 'Печ муфельная', '201101', 'L5/11/B170', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('170', 'Печ муфельная', '7968', 'SNOL 58/350', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('171', 'Печ муфельная', '101', 'SNOL 6/11', 'хх', 'хх', '12', '2013-06-03', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('172', 'Ситовый анализатор', '128030349', 'AS-200', 'хх', 'хх', '12', '2012-06-20', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('173', 'Анализатор влажности', '22704208', 'МА-35', '1', '-----------', '12', '2013-02-14', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('174', 'Анализатор влажности', '22704209', 'МА-35', '1', '---------', '12', '2013-02-14', 'ЦЗЛ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('180', 'Штангенциркуль', '809552', 'ШЦ-2', '2', '0-250 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('182', 'Штангенциркуль', '80610565', 'ШЦ-1', '2', '0-150 мм', '12', '2012-06-21', 'ЦРРФ ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('183', 'Штангенциркуль', '90609734', 'ШЦ-1', '2', '0-150 мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('184', 'Штангенциркуль', '80609715', 'ШЦ-1', '2', '0-150 мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('185', 'Штангенциркуль', '80609667', 'ШЦ-1', '2', '0-150 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('186', 'Штангенциркуль', '1', 'GEDOR 710', '2', '0-170 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('187', 'Штангенциркуль', '2', 'GEDOR 710', '2', '0-170 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('188', 'Штангенциркуль', '80417938', 'ШЦ-1', '2', '0-150 мм', '12', '2012-06-21', 'ЦРРФ ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('189', 'Штангенциркуль', '12', 'GEDOR 710', '2', '0-170 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('190', 'Штангенциркуль', '575773', 'ШЦ-2', '2', '0-250 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('191', 'Штангенциркуль', '11', 'GEDOR 710', '2', '0-170 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('193', 'Микрометр цифровой', 'G47050', 'МКЦ', '1', '0-25 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('194', 'Микрометр ', '8575', 'МК', '1', '0-25 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('195', 'Микрометр ', '8140', 'МК', '1', '25-50 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('196', 'Микрометр ', '82309', 'МК', '1', '25-75 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('197', 'Индикатор часового типа', '83698', 'ИЧ-2', '0.01мм', '0-2мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('198', 'Нутромер', '62902', 'НИ-50М', '0.01мм', '10-50 мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('199', 'Угломер', '61812', 'У 1-2', '2', '0-90град.', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('200', 'Линейка лекальная', '1', 'ЛД-320', '2', 'ххх', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('201', 'Линейка лекальная', '2', 'ЛЧ-320', '2', 'ххх', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('202', 'Индикатор часового типа', '53641', 'ИЧ-10', '0.01мм', '0-10мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('203', 'Индикатор часового типа', '911447', 'ИЧ-10 МН', '0.01мм', '0-10мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('206', 'Индикатор часового типа', '81249', 'ИЧ-10', '0.01мм', '0-10мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('207', 'Нутромер индикаторный', '8281', 'НИ 50- 100', '0.01мм', '50-100мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('208', 'Нутромер микрометрический', 'Г 4306', 'НМ 75', '0.01мм', '50-75мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('209', 'Штангенциркуль цифровой', '07067259', 'Gedor 711', '0.01мм', '0-150мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('210', 'Штангенциркуль цифровой', '07067335', 'Gedor 711', '0.01мм', '0-150мм', '12', '2013-01-17', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('211', 'Нутромер микрометрический', 'В4079', 'НМ600', '0,01', '600мм', '12', '2013-02-01', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('213', 'Микрометр', '324', 'МК', '0.01мм', '50-75 мм', '12', '2012-08-16', 'РМЦ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('214', 'Микрометр', '5895', 'МК', '1', '0-25 мм', '12', '2012-06-21', 'РМЦ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('215', 'Штангенциркуль', '0609572А', 'ШЦ-2', '0.02мм', '0-250 мм', '12', '2013-02-01', 'РМЦ токарь');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('216', 'Штангенциркуль', '657586', 'ШЦ-2', '2', '0-250 мм', '12', '2012-06-21', 'РМЦ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('217', 'Штангенциркуль', '0609654А', 'ШЦ-2', '2', '0-250 мм', '12', '2012-12-04', 'РМЦ фрез');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('223', 'Штангенрейсмас', '10184', 'ШР', '2', '0-400 мм', '12', '2012-07-04', 'ЦЕХ1 СФМ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('224', 'Штангенрейсмас', '10202', 'ШР', '2', '0-400 мм', '12', '2012-07-04', 'ЦЕХ1 СФМ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('226', 'Пирометр немецкий', '4344', 'IMPAC', '2', '550-3000 град С', '12', '2012-02-29', 'ЦЕХ3 фидер');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('240', 'Газоанализатор', '710R0314', 'IMR 1400', '----------', '----------', '12', '2012-12-07', 'ОГТ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('241', 'Весы автомобильные электронные', '014361', 'ВАЭ-60-24-20-П', '-------------', '----------', '12', '2012-11-19', '');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('242', 'Весы Ж/Д', '81285', 'ВВД-160М-02', '-------------', '----------', '12', '2012-09-03', 'Отдел Ж/Д перев.');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('243', 'Газовый сигнализатор', 'С15471', 'RGD CO', '-------------', '----------', '12', '2012-09-21', 'Котельная');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('244', 'Газовый сигнализатор', 'М13835', 'RGD Метан', '-------------', '----------', '12', '2012-09-21', 'Котельная');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('245', 'Газовый сигнализатор', 'М13825', 'RGD Метан', '-------------', '----------', '12', '2012-09-21', 'Котельная');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('246', 'Гиря ', '№ 1-20', 'КГ6-2 Н4', '-------------', '20кГ', '12', '2012-07-04', 'Цех пригот.шихты');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('252', 'Штангенциркуль', '01103852', 'ШЦ-1', '2', '0-150мм', '12', '2012-12-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('253', 'Штангенциркуль', '01103700', 'ШЦ-1', '2', '0-150мм', '12', '2012-12-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('255', 'Штангенциркуль', '01105399', 'ШЦ-1', '2', '0-150мм', '12', '2012-12-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('260', 'Штангенциркуль', '01105415', 'ШЦ-1', '2', '0-150мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('262', 'Штангенциркуль', '01105627', 'ШЦ-1', '2', '0-150мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('264', 'Штангенциркуль', '10100182', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('267', 'Штангенциркуль', '10100190', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('269', 'Штангенциркуль', '10100786', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('270', 'Штангенциркуль', '10100778', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('271', 'Штангенциркуль', '10100674', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('272', 'Штангенциркуль', '10100665', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('274', 'Штангенциркуль', '10103414', 'ШЦ-1', '2', '0-150мм', '12', '2012-12-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('275', 'Штангенциркуль', '08310590', 'ШЦ-1', '2', '0-250мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('277', 'Штангенциркуль', '08310205', 'ШЦ-1', '2', '0-250мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('278', 'Штангенциркуль', '08310511', 'ШЦ-1', '2', '0-250мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('280', 'Штангенциркуль ', '08310716', 'ШЦ-1', '2', '0-250мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('283', 'Штангенциркуль', '70330155', 'ШЦ-1', '2', '0-150мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('284', 'Штангенциркуль', '0', 'GEDOR 710', '2', '0-170 мм', '12', '2012-06-21', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('289', 'Измеритель толщины', '00258', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2012-07-04', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('290', 'Измеритель толщины', '00259', 'ИТ-1', ' кл 2', '0,5-8 мм', '12', '2013-04-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('291', 'Штангенрейсмас', '14544', 'ШР', '2', '0-300 мм', '12', '2012-10-24', 'ЦРРФ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('361', 'Штангенциркуль', '08090267', 'ШЦ-1', '2', '0-150мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('364', 'Штангенциркуль', '80711763', 'ШЦ-1', ' 0.1мм', '0-120 мм', '12', '2012-10-24', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('366', 'Штангенциркуль', '10100167', 'ШЦ-1', '2', '0-150мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('368', 'Термометр жидкостный', '59944', 'ТТЖ-М', '2', '0-100 С', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('371', 'Штангенциркуль', '010810', 'ШЦ-2', ' кл 1', '0-250 мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('372', 'Штангенциркуль путевой', '11616', 'ПШВ', '0,1мм', '0-290мм', '12', '2012-12-28', 'Отдел Ж/Дп');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('373', 'Шаблон путевой', '11125', '08809', '1мм', '1460-1500мм', '12', '2012-12-28', 'Отдел Ж/Дп');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('374', 'Шаблон универсальный', '12075', '00316', '0,5мм', '1-50мм', '12', '2012-12-28', 'Отдел Ж/Дп');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('375', 'Штангенциркуль', '101189', 'ШЦ-2', '2', '0-250мм', '12', '2013-02-01', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('376', 'Микрометр ', '8674', 'МК-25', '1', '0-25 мм', '12', '2013-02-28', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('377', 'Плита поверочная гранитная', '05124', 'ППГ', '1', '400 х 400 мм', '24', '2012-06-30', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('378', 'Плита поверочная гранитная', '05125', 'ППГ', '1', '400 х 400 мм', '24', '2012-06-30', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('379', 'Плита поверочная гранитная', '05126', 'ППГ', '1', '400 х 400 мм', '24', '2012-06-30', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('380', 'Штангенрейсмас', 'А20055', 'ШР', '2', '0-400 мм', '12', '2013-05-21', 'ЦЕХ1 СФМ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('382', 'Штангенрейсмас', 'А10999', 'ШР', '2', '0-400 мм', '12', '2013-05-21', 'ЦЕХ1 СФМ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('384', 'Штангенрейсмас', 'А20130', 'ШР', '2', '0-400 мм', '12', '2013-05-21', 'ЦЕХ1 СФМ');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('386', 'Штангенциркуль', '201', 'ШЦ-1', '2', '0-120мм', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('387', 'Штангенциркуль', '20504802', 'ШЦ-1', '2', '0-120мм', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('388', 'Штангенциркуль', '20502750', 'ШЦ-1', '2', '0-120мм', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('389', 'Штангенциркуль', '20507247', 'ШЦ-1', '2', '0-120мм', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('390', 'Штангенциркуль', '20604947', 'ШЦ-1', '2', '0-120мм', '12', '2013-05-21', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('392', 'Плита поверочная гранитная', '01015', 'ППГ', '0', '250 х 250 мм', '24', '2011-12-23', 'ОГМетр');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('393', 'Штангенрейсмас', '11070232', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('394', 'Штангенрейсмас', '11070155', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('395', 'Штангенрейсмас', '11070018', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('396', 'Штангенрейсмас', '11070242', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('397', 'Штангенрейсмас', '11070106', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('398', 'Штангенрейсмас', '11070235', 'ШР-400', ' кл 2', '0-400 мм', '12', '2012-10-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('399', 'Весы электронн. настольные ', '19215', 'МК 3.2-АВ20', ' кл 2', '0-3000 Гр', '12', '2012-06-27', 'Цех 1');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('400', 'Весы электронн. настольные ', '18883', 'МК 3.2-АВ20', ' кл 2', '0-3000 Гр', '12', '2012-06-27', 'Цех 1');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('401', 'Колонка топливораздаточная', '160', 'Нара 27', ' --', '--', '12', '2012-12-26', 'Трансп.цех');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('402', 'Штангенциркуль', '02230572', 'ШЦ-1', '0.05', '0-125мм', '12', '2013-11-13', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('403', 'Штангенциркуль', '02100188', 'ШЦ-1', '0.05', '0-125мм', '12', '2013-11-13', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('404', 'Штангенциркуль', '02100559', 'ШЦ-1', '0.05', '0-125мм', '12', '2013-11-13', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('405', 'Штангенциркуль', '02100122', 'ШЦ-1', '0.05', '0-125мм', '12', '2013-11-13', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('406', 'Штангенциркуль', '108040914', 'ШЦ-1', '0.02', '0-200мм', '12', '2014-01-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('407', 'Штангенциркуль', '108041221', 'ШЦ-1', '0.02', '0-200мм', '12', '2014-01-10', 'ОТК');
INSERT INTO metrology(id, NAME, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES('408', 'Манометр цифровой ASHCROFT', '452074SD04L', 'Модель 2074', '0,25%', '0-1500psi', '12', '2012-07-16', 'ОГМетр');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
