-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-09-2023 a las 00:24:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
(82, 'xilofono insano', 10000, 'el mas insano brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 2, 'insanidad,wazaaaa,esquizofrenia,raro,odd,Percussion,Gray', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(84, 'Oboe for everyone', 87000, 'I thought this oboe was a clarinete, but it looks like not, I wanted to play clarinete, not oboe', 3, 'odd,oboe,schwarz,weird,:(,Woodwind,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(85, 'flute for the school', 5000, 'I used this flute, my friend too, also did my boyfriend, I have not washed it.', 3, 'dirty,used,overused,school,Woodwind,White', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(86, 'Fagot wtfffff', 6000, 'es un chiste en ingles, resulta que este instrumento se llama fagot, en ingles no es muy bonita la palabra, si eres el que lo compra, te dejo este mensaje: \n????????????', 4, 'faggot,odd,funny,Brass,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(88, 'Guitarra Clásica ', 320000, 'Cuenta  con una tapa de abeto, acabado de brillante, forma del cuerpo: clásico, el largo de escala es 650mm, tiene 6 cuerdas de nailon,\nGuitarra versátil que se adapta a una gran variedad de estilos musicales.', 1, 'marron,guitarra,brillante,clásica,String,Brown', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(89, 'Guitarra Electroacústica Persian  ', 455000, '-Tiene tapa de abeto.\n-Forma del cuerpo: folk.\n-Tiene 6 cuerdas de metal.\n-Posee conectores XLR, Jack de salida.', 1, 'guitarra,abeto,folk,beich,String', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(90, 'Guitarra Criolla Clásica', 150000, 'Tiene tapa de caoba.\nAcabado de laqueado.\nTiene 6 cuerdas de nailon.\nPara desarrollar habilidades creativas y musicales.', 1, 'guitarra,caoba,negra,String,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(91, 'Guitarra Electroacústica Femmto Criolla Azul ', 200000, 'Tiene tapa de tilo, Acabado de brillante, forma del cuerpo: classic, el largo de escala es 635mm, tiene 6 cuerdas de metal, cantidad de trastes: 18.', 1, 'guitarra,brillante,clasica,azul,String,Blue', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(92, 'Guitarra acústica Fender Alternative ', 800000, 'Tiene tapa de arce, acabado de brillante, forma del cuerpo: concert, el largo de escala es 643mm, tiene 6 cuerdas de metal y es una guitarra versátil que se adapta a una gran variedad de estilos musicales.', 1, 'naranja,brillante,guitarra,acustica,String,Orange', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(93, 'Guitarra Electroacústica Cort Standard ', 750000, '-Tapa de abeto.\n-Forma del cuerpo: dreadnought.\n-Tiene 6 cuerdas de metal.\n-Cantidad de trastes: 20.\n-Color: negro ', 1, 'guitarra,negra,electroacústica,String,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(94, 'Guitarra Acústica Mediana Funcional ', 50000, 'GUITARRA ACÚSTICA MEDIANA PARA NIÑOS.\n-Hecha de PVC.\n-Incluye una uña\n-Disponible en color azul\n-No necesita pilas\n-Medidas\nLargo: 43,1cm, Ancho: 13,3cm', 1, 'azul,mediana,pequeña,guitarra,niños,String,Blue', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(95, 'Musicube Bongo ', 185000, 'MUSICUBE Bongo - Juego de tambor, instrumento de percusión de 6 y 7 pulgadas, tambor de madera y metal para adultos y niños principiantes profesionales con llave de afinación.\n', 2, 'tambor,bongo,madera,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(96, 'Platillos Chichin Tom Grasso', 12000, 'CHINCHINES JB422 TOM GRASSO.\nPlatillos pequeños ideal para realizar efectos en canciones ya sea en grabaciones o en presentaciones.\n-Alto: 5cm\n-Ancho: 5cm\n-Material: Latón\n-Color: Dorado.', 2, 'platillos,dorados,laton,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(97, 'Tambora Colombiana Costeña', 92000, 'ALTO: entre 21 a 23 CM aproximadamente\nDIAMETRO entre 21 a 23 CM aproximadamente\nPESO: Entre 1,5 kg a 2 Kg aproximadamente\nTIPO DE MADERA: Caracolí, banco o carito.\nTIPO DE PIEL : Piel de chivo\n', 2, 'tambora,madera,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(98, 'Kalimba Africana ', 73000, 'Especificación:\nArtículo: muselado 17-tono Acacia/caoba Kalimba\nMaterial principal: Acacia/caoba\nTamaño: 170x130x5 0mm/6.69x5.12x1.97in\nAltura de la madera: 20mm/0,79 pulgadas\nPeso neto: 280g', 2, 'kalimba,marron,Percussion,Brown', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(99, 'Set De Campanas Instrumentos Musicales 8 Tonos.', 130000, 'Tipo de artículo: campana de mano\n\n8 cascabeles en 1 Juego, hechos de metal, de larga duración, exquisito y colorido.\n\nEn sintonía, resonan fuerte y claramente.\n\nTanto los números como las teclas en la parte superior, proporcionan orientación en la reproducción.\n', 2, 'campanas,cascabeles,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(100, 'Bongos, Tambor Africano De Madera', 320000, 'Características: hechos de madera maciza y aleación de alta calidad, no tóxicos, inofensivos y duraderos. Presenta una calidad de sonido pura y perfecta, un fuerte sentido del ritmo. Ligeros, adecuados para personas de todas las edades, especialmente para niños. Tipo de artículo: bongos. Material: Madera y aleación\nColor: rojo', 2, 'madera,rojo,bongos,Percussion,Red', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(101, 'Marimba De Chonta Tonson De 14 Notas Diatónica', 410000, 'Marimba de chonta TONSON diatónica de 14 notas diatónica, marimba semiprofesional, ideal para iniciar grupos musicales básicos, y para el uso educativo como instituciones y academias musicales también es muy utilizada para practica y aprendizaje básico del instrumento, adicionalmente también como colección y/o decorativas para fanáticos de la música folclórica.', 2, 'marimba,diatonica,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(102, 'Cascabeles ', 18000, 'Espectacular cascabel para niños, dulce sonido. Perfectos para las novenas en navidad!.\n\n-Color: azul\n-Mango: ABS\n-Sonajeros: Metalicos', 2, 'cascabeles,metalico,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(103, 'Claves En Madera ', 32000, '\n• Nombre: Claves Pequeñas\n• General: Instrumento Musical -- no son profesionales\n• Uso: Instrumento Musical / Didáctico\n• Edad: +3 Años\n• Medidas (L x P x A cm) :15 X 2 X 2\n• Contenido: 2 Claves\n• Material: Madera\n• Color: Color Natural Madera, Laca Transparente\n• País de origen: Colombia\n', 2, 'claves,cafe,pequeñas,madera,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(104, 'Maracas Plásticas', 25000, 'Nuestras maracas están fabricadas en plástico, es ideal para promover el interés de tu pequeño en el mundo de la música y que cree sus propias melodías. \nContamos con certificado de conformidad de producto ofreciendo material didáctico de la mejor calidad para nuestros niños.\nPRODUCTOS FABRICADOS 100% EN COLOMBIA, SOMOS FABRICANTES NACIONALES\n\nMarca: Celmax .\nEdad recomendada: 4 años.\nMedidas: 22x7 cm.', 2, 'maracas,plastico,amarillas,niños,Percussion,Yellow', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(105, 'Tambor De Caja De Aluminio', 1800000, '* carcasa de aluminio 7 pulgadas profundas con cabeza de 30 cm diámetro\n* cabeza sintética afinación hebras para caja\n-Color: aluminio\n-Peso del Producto: 1 Libra\n', 2, 'aluminio,tambor,Percussion,Gray', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(106, '4 Mazos Para Bombo, Con Cabeza De Espuma', 70000, 'Cabezal de mazo de espuma, que no es fácil de deformar, en uso. Mano de\nobra fina, no se deforma fácilmente después de un uso prolongado.\nUna excelente baqueta para instrumentos de percusión.\nLos mazos de percusión tienen mango de madera, un tacto robusto y un agarre cómodo en la mano. Color: color madera + gris', 2, 'mazos,madera,gris,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(107, 'Percusión Latina Clave De Madera ', 95000, 'Clave de madera estilo tradicional con un acabado atractivo\nExcepcionalmente resonante con cualidades de sonido variables.\nClave (pronunciado clah \'vay) es el patrón rítmico que forma la base de la música latina.', 2, 'claves,madera,latina,Percussion', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(108, 'Acordeon Infantil Vallenato', 90000, '- Acordeón reproducirle de juguete.\n- 7 botones de agudos.\n- 2 Bajos.\n- Construcción de plástico.\n- Adecuado para 4 años en adelante.\n\n-Medida con fuelle cerrado: 18cm largo x 18cm alto x 10cm ancho.', 3, 'ACORDEON,azul,niños,pequeño,Woodwind,Blue', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(109, 'Acordeon Hohner Rey Vallenato Adg Rojo', 3300000, 'Acordeón Original Hohner.\nCaracterísticas:\nDimensiones - tamaño: 31cm A X 32cm L,\nPeso: 7.5 kq,\nTonalidades: ADG,\nNúmero de botones: 31,\nNúmero de filas: 3 filas,\nAccesorios: Estuche + correa,\nColor: Rojo.', 3, 'acordeon,rojo,original,hohner,Woodwind,Red', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(110, 'Acordeón Ill Coronas Hohner', 7500000, '-Número de notas: 62\n-Botones: 31\n-Filas de botones: 3\n-Voces: 3\n-Colores de tono: 1\n-Teclas: Sol/Do/Fa, Fa/Si bemol/Mi bemol, -Mi/La/Re\n-Tamaño: 31x 19 cm\n-Peso: 4,6 kg\n-Incluye estuche y correas', 3, 'acordeon,rojo,hohner,Woodwind,Red', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(111, 'Acordeon Hohner Corona Iii Besas Negro', 5700000, 'Acordeón Original Hohner\nCaracterísticas:\nDimensiones - tamaño: 31cm A X 32cm L,\nPeso: 7.5 k,\nColor: negro,\nTonalidades: Besas,\nNúmero de botones: 31,\nNúmero de filas: 3 filas,\nAccesorios: Estuche + correa,\nIncluye certificado de autenticidad y manual de usuario.', 3, 'acordeon,negro,hohner,original,Woodwind', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(112, 'Trompeta Importada De Alta Calidad', 850000, 'Descripción:\nManufacturada en Brass y acabado en lacado. La afinación Bb es una gran opción para el rango estudiante / semi-profesional. Cuenta con válvulas endurecidas y boquilla 7c plateada Ideal para géneros latinos, salsa y música clásica. Trompeta de gran calidad y gran durabilidad\n', 4, 'trompeta,viento,Brass', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(113, 'Muslady - Juego De Trompeta Para Principiantes ', 539000, 'Características:\nExcelente mano de obra Cuerpo de latón sólido y resistente a la abrasión con un revestimiento de perlas negras galvanizadas más grueso y brillante, el efecto visual es más agradable y cómodo.\nApto para principiantes Diseño estándar, válvulas suaves y botones flexibles proporcionan una experiencia de juego cómoda.', 4, 'trompeta,principiantes,negra,Brass,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(114, 'Tuba Vertical Dorada', 10000000, 'DESCRIPCION: Tuba pistón 4 válvulas.\nAfinación: Si B\nAcabado lacado.\nDiámetro de la campana: 382 mm\nDiámetro interior: 16 mm\n1 año de garantía por defectos de fabricación.\nIncluye estuche y boquilla.', 4, 'TUBA,DORADA,VIENTO,Brass', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(115, 'Cornetas Soprano', 433000, 'DESCRIPCIÓN:\nTonalidad: Bb (Si bemol).\nAgujero: 11.40mm\nCampana: 125mm.\nAcabado: Plateado.', 4, 'corneta,gris,viento,Brass,Gray', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(116, 'Corneta Para Boquilla Flat Call Cavalry B Bugle Con Corneta', 260000, 'Características:\ncorneta en si bemol de alta calidad.\nMaterial de latón con superficie dorada, duradero y exquisito.\nViene con una boquilla que proporciona una excelente calidad de sonido.\nIdeal para bandas escolares, orquestas militares, etc.', 4, 'viento,corneta,Brass', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(117, 'Trombon Tenor ', NULL, 'Es un Tenor con llave, de gran calibre, diseñado como alternativa entre los instrumentos de bajo y de alto calibre. Apto para estudiantes o músicos aficionados.', 4, 'trombon,viento,Brass', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(118, 'Trombón Bajo Dorado Yamaha', NULL, '-Nivel: Intermedio\n-Afinación: Bb/F\n-Diámetro de campana: 241mm\n-Campana: Metal Dorado\n-Acabado: dorado\n-Boquilla Yamaha BL-58L\n-Estuche Yamaha Incluido', 4, 'trombón,viento,dorado,Brass', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner');

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
  `adress` varchar(30) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
