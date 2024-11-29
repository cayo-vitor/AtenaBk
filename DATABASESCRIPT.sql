CREATE DATABASE controle_tarefas;
USE controle_tarefas;

-- Tabela de usuários
CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `nivel_prioridade` ENUM('baixa', 'média', 'alta') DEFAULT 'média',
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` TIMESTAMP NULL
);

-- Tabela de categorias de tarefas
CREATE TABLE `categorias` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT,
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
);

-- Tabela de tarefas
CREATE TABLE `tarefas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `categoria_id` INT,
  `titulo` VARCHAR(255) NOT NULL,
  `descricao` TEXT,
  `data_vencimento` DATE,
  `status` ENUM('pendente', 'em andamento', 'concluída', 'atrasada') DEFAULT 'pendente',
  `prioridade` ENUM('baixa', 'média', 'alta') DEFAULT 'média',
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE SET NULL
);

-- Tabela de registros de login de usuários
CREATE TABLE `logins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `data_login` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `ip_origem` VARCHAR(45), -- Endereço IP do login
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
);

show tables;
USE controle_tarefas;