-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 27. 22:50
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pcwebshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cpucooler`
--

CREATE TABLE `cpucooler` (
  `id` int(11) NOT NULL,
  `fanSpeed` double NOT NULL,
  `type` varchar(191) NOT NULL,
  `airflow` double NOT NULL,
  `frequency` double NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cpucooler`
--

INSERT INTO `cpucooler` (`id`, `fanSpeed`, `type`, `airflow`, `frequency`, `productId`) VALUES
(1, 1500, 'Air', 82.52, 0, 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `harddrive`
--

CREATE TABLE `harddrive` (
  `id` int(11) NOT NULL,
  `capacity` double NOT NULL,
  `storageType` varchar(191) NOT NULL,
  `connectionInterface` varchar(191) NOT NULL,
  `readingSpeed` double NOT NULL,
  `writingSpeed` double NOT NULL,
  `nandFlashType` varchar(191) NOT NULL,
  `pciGeneration` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `harddrive`
--

INSERT INTO `harddrive` (`id`, `capacity`, `storageType`, `connectionInterface`, `readingSpeed`, `writingSpeed`, `nandFlashType`, `pciGeneration`, `productId`) VALUES
(1, 1, 'SSD', 'NVMe', 3500, 3300, 'V-NAND', 3, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `memory`
--

CREATE TABLE `memory` (
  `id` int(11) NOT NULL,
  `memoryCapacity` double NOT NULL,
  `memoryType` varchar(191) NOT NULL,
  `installedMemory` double NOT NULL,
  `frequency` double NOT NULL,
  `supportedMemoryCapacity` double NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `memory`
--

INSERT INTO `memory` (`id`, `memoryCapacity`, `memoryType`, `installedMemory`, `frequency`, `supportedMemoryCapacity`, `productId`) VALUES
(1, 16, 'DDR4', 16, 3200, 128, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `motherboard`
--

CREATE TABLE `motherboard` (
  `id` int(11) NOT NULL,
  `cpuSocket` varchar(191) NOT NULL,
  `chipset` varchar(191) NOT NULL,
  `memoryType` varchar(191) NOT NULL,
  `processorSeller` varchar(191) NOT NULL,
  `graphicCard` varchar(191) NOT NULL,
  `hdmi` tinyint(1) NOT NULL,
  `sataConnectors` int(11) NOT NULL,
  `pciConnectors` int(11) NOT NULL,
  `usbPorts` int(11) NOT NULL,
  `memorySockets` int(11) NOT NULL,
  `integratedSound` tinyint(1) NOT NULL,
  `bluetooth` tinyint(1) NOT NULL,
  `wireless` tinyint(1) NOT NULL,
  `sizeStandard` varchar(191) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `motherboard`
--

INSERT INTO `motherboard` (`id`, `cpuSocket`, `chipset`, `memoryType`, `processorSeller`, `graphicCard`, `hdmi`, `sataConnectors`, `pciConnectors`, `usbPorts`, `memorySockets`, `integratedSound`, `bluetooth`, `wireless`, `sizeStandard`, `productId`) VALUES
(1, 'LGA1200', 'Z590', 'DDR4', 'Intel', 'Integrated', 1, 6, 3, 8, 4, 1, 1, 1, 'ATX', 8);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `status` enum('Cancelled','Pending','InProgress','Delivered') NOT NULL,
  `totalPrice` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `powerhouse`
--

CREATE TABLE `powerhouse` (
  `id` int(11) NOT NULL,
  `motherboardType` varchar(191) NOT NULL,
  `fans` int(11) NOT NULL,
  `size` varchar(191) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `powerhouse`
--

INSERT INTO `powerhouse` (`id`, `motherboardType`, `fans`, `size`, `productId`) VALUES
(1, 'ATX', 2, 'Mid Tower', 11);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `powersupply`
--

CREATE TABLE `powersupply` (
  `id` int(11) NOT NULL,
  `performance` double NOT NULL,
  `fourPinConnector` tinyint(1) NOT NULL,
  `sixPinVGA` tinyint(1) NOT NULL,
  `size` varchar(191) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `powersupply`
--

INSERT INTO `powersupply` (`id`, `performance`, `fourPinConnector`, `sixPinVGA`, `size`, `productId`) VALUES
(1, 750, 1, 1, 'Standard ATX', 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `processor`
--

CREATE TABLE `processor` (
  `id` int(11) NOT NULL,
  `coreNumber` int(11) NOT NULL,
  `baseFrequency` double NOT NULL,
  `turboBoostFrequency` double NOT NULL,
  `cache` double NOT NULL,
  `architecture` varchar(191) NOT NULL,
  `processorSeller` varchar(191) NOT NULL,
  `processorModel` varchar(191) NOT NULL,
  `integratedGraphicModel` varchar(191) NOT NULL,
  `processorTechnology` varchar(191) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `processor`
--

INSERT INTO `processor` (`id`, `coreNumber`, `baseFrequency`, `turboBoostFrequency`, `cache`, `architecture`, `processorSeller`, `processorModel`, `integratedGraphicModel`, `processorTechnology`, `productId`) VALUES
(1, 8, 3.5, 5.3, 16, 'x86_64', 'Intel', 'i9-11900K', 'Intel UHD Graphics 750', '14nm', 1),
(2, 8, 3.6, 5, 16, 'x86_64', 'Intel', 'i7-11700K', 'Intel UHD Graphics 750', '14nm', 2),
(3, 12, 3.7, 4.8, 64, 'x86_64', 'AMD', 'Ryzen 9 5900X', 'None', '7nm', 3),
(4, 8, 3.8, 4.7, 32, 'x86_64', 'AMD', 'Ryzen 7 5800X', 'None', '7nm', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `manufacturer` varchar(191) NOT NULL,
  `type` enum('PROCESSOR','MEMORY','HARDDRIVE','VIDEOCARD','MOTHERBOARD','CPUCOOLER','POWERSUPPLY','POWERHOUSE') NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `imgSrc` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `name`, `manufacturer`, `type`, `price`, `quantity`, `imgSrc`) VALUES
(1, 'Intel Core i9', 'Intel', 'PROCESSOR', 499.99, 10, 'intel_core_i9.png'),
(2, 'Intel Core i7-11700K', 'Intel', 'PROCESSOR', 399.99, 10, 'intel_core_i7.jpg'),
(3, 'AMD Ryzen 9 5900X', 'AMD', 'PROCESSOR', 549.99, 10, 'AMD Ryzen 9 5900X.jpg'),
(4, 'AMD Ryzen 7 5800X', 'AMD', 'PROCESSOR', 449.99, 10, 'AMD Ryzen 7 5800X.webp'),
(5, 'Corsair Vengeance', 'Corsair', 'MEMORY', 129.99, 10, 'Corsair Vengeance.jpg'),
(6, 'Samsung 970 EVO Plus', 'Samsung', 'HARDDRIVE', 199.99, 10, 'Samsung 970 EVO Plus.jpg'),
(7, 'NVIDIA GeForce RTX 3080', 'NVIDIA', 'VIDEOCARD', 699.99, 10, 'NVIDIA GeForce RTX 3080.jpg'),
(8, 'ASUS ROG Strix Z590-E', 'ASUS', 'MOTHERBOARD', 299.99, 10, 'ASUS ROG Strix Z590-E.jpg'),
(9, 'Noctua NH-D15', 'Noctua', 'CPUCOOLER', 89.99, 10, 'Noctua NH-D15.jpg'),
(10, 'Corsair RM750x', 'Corsair', 'POWERSUPPLY', 124.99, 10, 'Corsair RM750x.jpg'),
(11, 'NZXT H510', 'NZXT', 'POWERHOUSE', 79.99, 10, 'NZXT H510.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `width` double NOT NULL,
  `length` double NOT NULL,
  `height` double NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `address`, `role`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', 'sesam street 1', 'ADMIN'),
(2, 'Jane Smith', 'jane.smith@example.com', 'securepassword', 'sesam street 2', 'USER'),
(3, 'Géza', 'barmiAron@example.com', '$argon2id$v=19$m=65536,t=3,p=4$EK37Z2RXEqgn61F+xqiJhQ$cNz+GSaDalmmrGsfUEvA5pl2GwsEfjwuUQZZ1yHrmOY', 'Sesam street 0', 'user'),
(4, 'majom', 'apuci@example.com', '$argon2id$v=19$m=65536,t=3,p=4$J1ljCEHQu7I7B/E/8F4tGA$zwaxx3O2aP//5yAHKYR64JQA+Qvaf0ZHhuOcJw/2k9w', 'asd', 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `videocard`
--

CREATE TABLE `videocard` (
  `id` int(11) NOT NULL,
  `videoChipset` varchar(191) NOT NULL,
  `producer` varchar(191) NOT NULL,
  `cpuSocket` varchar(191) NOT NULL,
  `coolingType` varchar(191) NOT NULL,
  `graphicChipSpeed` double NOT NULL,
  `graphicMemorySpeed` double NOT NULL,
  `memoryCapacity` double NOT NULL,
  `bandwidth` double NOT NULL,
  `suggestedPower` double NOT NULL,
  `displayPort` int(11) NOT NULL,
  `size` varchar(191) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `videocard`
--

INSERT INTO `videocard` (`id`, `videoChipset`, `producer`, `cpuSocket`, `coolingType`, `graphicChipSpeed`, `graphicMemorySpeed`, `memoryCapacity`, `bandwidth`, `suggestedPower`, `displayPort`, `size`, `productId`) VALUES
(1, 'GA102', 'NVIDIA', 'PCIe 4.0', 'Air', 1440, 19000, 10, 760, 320, 3, '2-slot', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cpucooler`
--
ALTER TABLE `cpucooler`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CPUCooler_productId_key` (`productId`);

--
-- A tábla indexei `harddrive`
--
ALTER TABLE `harddrive`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HardDrive_productId_key` (`productId`);

--
-- A tábla indexei `memory`
--
ALTER TABLE `memory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Memory_productId_key` (`productId`);

--
-- A tábla indexei `motherboard`
--
ALTER TABLE `motherboard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Motherboard_productId_key` (`productId`);

--
-- A tábla indexei `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_email_fkey` (`email`);

--
-- A tábla indexei `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_orderId_fkey` (`orderId`),
  ADD KEY `OrderItem_productId_fkey` (`productId`);

--
-- A tábla indexei `powerhouse`
--
ALTER TABLE `powerhouse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Powerhouse_productId_key` (`productId`);

--
-- A tábla indexei `powersupply`
--
ALTER TABLE `powersupply`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PowerSupply_productId_key` (`productId`);

--
-- A tábla indexei `processor`
--
ALTER TABLE `processor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Processor_productId_key` (`productId`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Size_productId_key` (`productId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A tábla indexei `videocard`
--
ALTER TABLE `videocard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `VideoCard_productId_key` (`productId`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cpucooler`
--
ALTER TABLE `cpucooler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `harddrive`
--
ALTER TABLE `harddrive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `memory`
--
ALTER TABLE `memory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `motherboard`
--
ALTER TABLE `motherboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `powerhouse`
--
ALTER TABLE `powerhouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `powersupply`
--
ALTER TABLE `powersupply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `processor`
--
ALTER TABLE `processor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `videocard`
--
ALTER TABLE `videocard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cpucooler`
--
ALTER TABLE `cpucooler`
  ADD CONSTRAINT `CPUCooler_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `harddrive`
--
ALTER TABLE `harddrive`
  ADD CONSTRAINT `HardDrive_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `memory`
--
ALTER TABLE `memory`
  ADD CONSTRAINT `Memory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `motherboard`
--
ALTER TABLE `motherboard`
  ADD CONSTRAINT `Motherboard_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_email_fkey` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `powerhouse`
--
ALTER TABLE `powerhouse`
  ADD CONSTRAINT `Powerhouse_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `powersupply`
--
ALTER TABLE `powersupply`
  ADD CONSTRAINT `PowerSupply_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `processor`
--
ALTER TABLE `processor`
  ADD CONSTRAINT `Processor_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `videocard`
--
ALTER TABLE `videocard`
  ADD CONSTRAINT `VideoCard_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
