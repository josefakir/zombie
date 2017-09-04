-- phpMyAdmin SQL Dump
-- version 4.6.5.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 02-09-2017 a las 12:56:43
-- Versión del servidor: 5.6.34
-- Versión de PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `appzombie`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas`
--

CREATE TABLE `metas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` varchar(255) COLLATE utf8_bin NOT NULL,
  `ambito` varchar(255) COLLATE utf8_bin NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `metas`
--

INSERT INTO `metas` (`id`, `id_usuario`, `texto`, `ambito`, `fecha_inicio`, `fecha_fin`, `created_at`, `updated_at`) VALUES
(3, 1, 'ejemplo de meta 2', 'fisicas', '2017-08-05', '2018-08-05', '2017-08-05 11:36:48', '2017-08-05 11:36:48'),
(4, 1, 'circulo cercano', 'circulo', '2017-08-05', '2018-08-05', '2017-08-05 11:37:05', '2017-08-05 11:37:05'),
(5, 1, 'Responsabilidad social', 'responsabilidad', '2017-08-05', '2018-08-05', '2017-08-05 11:40:06', '2017-08-05 11:40:06'),
(9, 1, 'ejemplo 1 de meta espirituallll', 'espirituales', '2017-08-05', '2018-08-05', '2017-08-05 13:51:31', '2017-08-14 20:36:28'),
(10, 1, 'otra meta', 'fisicas', '2017-08-05', '2018-08-05', '2017-08-05 13:51:51', '2017-08-05 13:51:51'),
(11, 1, 'Comenzar a ver la menos la tv', 'espirituales', '2017-08-05', '2018-08-05', '2017-08-05 13:52:11', '2017-08-14 20:17:58'),
(15, 1, 'ejemplo laboral', 'laboral', '2017-08-14', '2018-08-14', '2017-08-14 20:22:55', '2017-08-14 20:22:55'),
(18, 1, 'nueva fisica', 'fisicas', '2017-08-14', '2018-08-14', '2017-08-14 20:39:02', '2017-08-14 20:39:02'),
(19, 1, 'nueva fisica dossss', 'fisicas', '2017-08-14', '2018-08-14', '2017-08-14 20:39:15', '2017-08-14 20:39:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revisions`
--

CREATE TABLE `revisions` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `revisions`
--

INSERT INTO `revisions` (`id`, `id_tarea`, `fecha`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2017-08-05', 0, '2017-08-05 10:43:45', '2017-08-05 10:43:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `id_meta` int(11) NOT NULL,
  `texto` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `id_meta`, `texto`, `created_at`, `updated_at`) VALUES
(1, 9, 'EJEMPLO DE TAREA', '2017-08-05 10:38:04', '2017-08-05 10:38:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) COLLATE utf8_bin NOT NULL,
  `contrasena` varchar(255) COLLATE utf8_bin NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin NOT NULL,
  `paterno` varchar(255) COLLATE utf8_bin NOT NULL,
  `materno` varchar(255) COLLATE utf8_bin NOT NULL,
  `apikey` varchar(255) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `contrasena`, `nombre`, `paterno`, `materno`, `apikey`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'jbecerraromero@gmail.com', '5140106451340684a8beddcfae8ccb37', 'José Antonio', 'Becerra', 'Romero', '17c1f771550d3a3488cc20ca9f428aea', 'test', '2017-08-05 10:29:54', '2017-08-05 10:29:54');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `revisions`
--
ALTER TABLE `revisions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `metas`
--
ALTER TABLE `metas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT de la tabla `revisions`
--
ALTER TABLE `revisions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;