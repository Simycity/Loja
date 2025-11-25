CREATE DATABASE IF NOT EXISTS sistema_pdv
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sistema_pdv;


-- ===============================
-- TABELA DE USUÁRIOS
-- ===============================
CREATE TABLE usuarios (
    id VARCHAR(10) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    imagemUrl VARCHAR(255)
);

INSERT INTO usuarios (id, nome, email, senha, tipo, imagemUrl) VALUES
('u001', 'Cristiano', 'cristiano@gmail.com', '7', 'Sim', "https://i.pinimg.com/236x/ba/d3/84/bad3847f224bb1bd021bd34898771b01.jpg"),
('u002', 'Greg', 'greg@gmail.com', '10', 'Nao', "https://i.pinimg.com/736x/a0/5a/1d/a05a1d8ce76262357f6ea2a9db72a371.jpg"),
('u003', 'Goku', 'goku@gmail.com', 'goku', 'Admin', NULL);

-- ===============================
-- TABELA DE CATEGORIAS SIMPLES
-- ===============================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

INSERT INTO categorias (id, nome) VALUES
('c001', 'Alimentos e Bebidas'),
('c002', 'Eletrônicos'),
('c003', 'Moda e Vestuário'),
('c004', 'Saúde e Beleza'),
('c005', 'Esportes e Lazer'),
('c006', 'Brinquedos e Jogos'),
('c007', 'Livros e Papelaria'),
('c008', 'Limpeza'),
('c009', 'Informática'),
('c010', 'Casa e Cozinha');


-- ===============================
-- TABELA DE PRODUTOS (SEM FK)
-- ===============================
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    SKU VARCHAR(20) NOT NULL UNIQUE,
    descricao TEXT,
    categoria VARCHAR(100),           
    marca VARCHAR(100),
    medida VARCHAR(50),       
    tamanho DECIMAL(10,2),
    precoCusto DECIMAL(10,2) NOT NULL,
    precoVenda DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    fornecedor VARCHAR(150),
    imagemUrl VARCHAR(255)
);

INSERT INTO produtos (id, nome, SKU, descricao, categoria, marca, medida, tamanho, precoCusto, precoVenda, quantidade, fornecedor, imagemUrl) VALUES
('p001', 'Arroz Branco', '7812345678', 'Arroz branco tipo 1.', 'Alimentos e Bebidas', 'Tio João', 'Kg', 5, 18.50, 25.90, 320, 'F001', NULL),
('p002', 'Feijão Carioca', '7823456712', 'Feijão carioca selecionado.', 'Alimentos e Bebidas', 'Kicaldo', 'Kg', 1, 6.80, 9.99, 410, 'F001', NULL),
('p003', 'Macarrão Espaguete', '7834567123', 'Massa tipo espaguete.', 'Alimentos e Bebidas', 'Renata', 'Kg', 1, 3.50, 6.49, 280, 'F001', NULL),
('p004', 'Óleo de Soja', '7845671234', 'Óleo de soja refinado.', 'Alimentos e Bebidas', 'Soya', 'L', 1, 4.20, 7.49, 390, 'F002', NULL),
('p005', 'Açúcar Cristal', '7856712345', 'Açúcar cristal branco.', 'Alimentos e Bebidas', 'União', 'Kg', 5, 14.00, 19.90, 270, 'F001', NULL),

('p006', 'Smartphone A20', '7867123456', 'Smartphone tela 6.4" 64GB.', 'Eletrônicos', 'Samsung', 'Un', 1, 650.00, 899.00, 120, 'F010', NULL),
('p007', 'Fone Bluetooth Wave', '7871234567', 'Fone sem fio com microfone.', 'Eletrônicos', 'JBL', 'Un', 1, 80.00, 129.90, 200, 'F010', NULL),
('p008', 'Televisão 50 Polegadas', '7882345671', 'Smart TV 4K UHD.', 'Eletrônicos', 'LG', 'Un', 1, 1800.00, 2499.99, 60, 'F011', NULL),
('p009', 'Caixa de Som Portátil', '7893456712', 'Caixa de som Bluetooth.', 'Eletrônicos', 'Philips', 'Un', 1, 120.00, 189.90, 140, 'F010', NULL),
('p010', 'Teclado Mecânico', '7814567123', 'Teclado mecânico RGB.', 'Informática', 'Redragon', 'Un', 1, 150.00, 239.90, 80, 'F012', NULL),

('p011', 'Camiseta Básica', '7825671234', 'Camiseta 100% algodão.', 'Moda e Vestuário', 'Hering', 'Un', 1, 18.00, 39.90, 230, 'F020', NULL),
('p012', 'Calça Jeans Masculina', '7836712345', 'Calça jeans azul.', 'Moda e Vestuário', 'Levi’s', 'Un', 1, 90.00, 149.90, 150, 'F020', NULL),
('p013', 'Tênis Esportivo RunFast', '7847123456', 'Tênis leve para corrida.', 'Esportes e Lazer', 'Nike', 'Par', 1, 120.00, 199.90, 95, 'F021', NULL),
('p014', 'Bermuda Masculina', '7851234567', 'Bermuda tactel.', 'Moda e Vestuário', 'Quiksilver', 'Un', 1, 30.00, 59.90, 170, 'F020', NULL),
('p015', 'Jaqueta Corta-Vento', '7862345678', 'Jaqueta resistente à água.', 'Moda e Vestuário', 'Adidas', 'Un', 1, 120.00, 219.90, 55, 'F020', NULL),

('p016', 'Shampoo Anticaspa', '7873456712', 'Shampoo para controle de caspa.', 'Saúde e Beleza', 'Clear', 'mL', 400, 8.00, 15.99, 300, 'F030', NULL),
('p017', 'Sabonete Líquido Neutro', '7884567123', 'Sabonete líquido suave.', 'Saúde e Beleza', 'Dove', 'mL', 250, 5.50, 10.99, 420, 'F030', NULL),
('p018', 'Creme Hidratante', '7895671234', 'Hidratante para pele seca.', 'Saúde e Beleza', 'Nivea', 'mL', 200, 7.50, 14.99, 260, 'F030', NULL),
('p019', 'Protetor Solar FPS 50', '7816782345', 'Protetor solar corporal.', 'Saúde e Beleza', 'L’Oréal', 'mL', 200, 22.00, 39.99, 180, 'F030', NULL),
('p020', 'Escova Dental Macia', '7827893456', 'Escova dental cerdas macias.', 'Saúde e Beleza', 'Colgate', 'Un', 1, 2.00, 6.49, 350, 'F030', NULL),

('p021', 'Caderno Universitário', '7838901234', 'Caderno 200 folhas capa dura.', 'Livros e Papelaria', 'Tilibra', 'Un', 1, 8.00, 15.90, 300, 'F040', NULL),
('p022', 'Lápis HB Nº2', '7849012345', 'Lápis grafite resistente.', 'Livros e Papelaria', 'Faber-Castell', 'Un', 1, 0.50, 1.49, 500, 'F040', NULL),
('p023', 'Caneta Azul Fine', '7850123456', 'Caneta esferográfica azul fina.', 'Livros e Papelaria', 'Bic', 'Un', 1, 0.60, 1.99, 430, 'F040', NULL),
('p024', 'Apontador Simples', '7861234567', 'Apontador de plástico.', 'Livros e Papelaria', 'Faber-Castell', 'Un', 1, 0.30, 0.99, 380, 'F040', NULL),
('p025', 'Agenda 2025', '7872345678', 'Agenda anual 2025 capa dura.', 'Livros e Papelaria', 'Tilibra', 'Un', 1, 10.00, 19.90, 200, 'F040', NULL),

('p026', 'Mouse Óptico USB', '7883456789', 'Mouse USB 1200 DPI.', 'Informática', 'Multilaser', 'Un', 1, 15.00, 29.90, 250, 'F012', NULL),
('p027', 'Monitor LED 24"', '7894567890', 'Monitor 24 polegadas Full HD.', 'Informática', 'AOC', 'Un', 1, 550.00, 799.90, 60, 'F012', NULL),
('p028', 'HD Externo 1TB', '7815678901', 'Disco rígido externo 1TB.', 'Informática', 'Western Digital', 'Un', 1, 230.00, 349.90, 100, 'F012', NULL),
('p029', 'Pen Drive 64GB', '7826789012', 'Pen drive USB 3.0 64GB.', 'Informática', 'SanDisk', 'Un', 1, 25.00, 49.90, 280, 'F012', NULL),
('p030', 'Roteador Wi-Fi AC1200', '7837890123', 'Roteador dual-band AC1200.', 'Informática', 'TP-Link', 'Un', 1, 90.00, 159.90, 130, 'F012', NULL),

('p031', 'Bola de Futebol', '7848901235', 'Bola oficial tamanho 5.', 'Esportes e Lazer', 'Penalty', 'Un', 1, 35.00, 69.90, 150, 'F021', NULL),
('p032', 'Corda de Pular', '7859012346', 'Corda profissional de treino.', 'Esportes e Lazer', 'Acte', 'Un', 1, 10.00, 24.90, 200, 'F021', NULL),
('p033', 'Halter 5Kg', '7860123457', 'Par de halteres 5Kg.', 'Esportes e Lazer', 'BrinqFit', 'Par', 1, 40.00, 79.90, 90, 'F021', NULL),
('p034', 'Tapete de Yoga', '7871234568', 'Tapete antiderrapante 180cm.', 'Esportes e Lazer', 'YogaLife', 'm', 1, 25.00, 49.90, 110, 'F021', NULL),
('p035', 'Garrafa Térmica', '7882345679', 'Garrafa térmica 750ml.', 'Esportes e Lazer', 'ThermoSteel', 'mL', 750, 18.00, 34.90, 180, 'F021', NULL),

('p036', 'Carrinho de Controle Remoto', '7893456781', 'Carrinho com rádio controle.', 'Brinquedos e Jogos', 'Candide', 'Un', 1, 60.00, 119.90, 85, 'F050', NULL),
('p037', 'Quebra-Cabeça 500 Peças', '7814567892', 'Puzzle de 500 peças.', 'Brinquedos e Jogos', 'Grow', 'Un', 1, 18.00, 39.90, 140, 'F050', NULL),
('p038', 'Jogo de Tabuleiro Estrategia', '7825678903', 'Jogo de estratégia para família.', 'Brinquedos e Jogos', 'Hasbro', 'Un', 1, 30.00, 69.90, 120, 'F050', NULL),
('p039', 'Boneca Fashion', '7836789014', 'Boneca com acessórios.', 'Brinquedos e Jogos', 'Baby&Me', 'Un', 1, 40.00, 89.90, 95, 'F050', NULL),
('p040', 'Kit Blocos de Montar', '7847890125', 'Kit 500 blocos compatíveis.', 'Brinquedos e Jogos', 'BrickPlay', 'Un', 1, 70.00, 149.90, 75, 'F050', NULL);

-- ===============================
-- TABELA DE CLIENTES (SEM RELACIONAMENTOS)
-- ===============================
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(120),
    documento VARCHAR(20) NOT NULL,
    tipo VARCHAR(5) NOT NULL,
    telefone VARCHAR(20),
    dataNascimento DATE,
    cep VARCHAR(10),
    logradouro VARCHAR(150),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    status VARCHAR(20) DEFAULT 'Ativo'
);

-- ===========================
-- POPULAÇÃO DA TABELA CLIENTES
-- ===========================

INSERT INTO clientes (nome, email, documento, tipo, telefone, dataNascimento, cep, logradouro, complemento, bairro, cidade, uf, status) VALUES
('Ana Pereira Silva', 'ana.silva@email.com', '123.456.789-00', 'PF', '(11) 99887-1122', '1985-03-15', '01001-000', 'Praça da Sé', 'Lado ímpar', 'Sé', 'São Paulo', 'SP', 'Ativo'),
('Bruno Costa', 'bruno.costa@uol.com.br', '234.567.890-11', 'PF', '(21) 98765-4321', '1990-07-20', '20040-002', 'Avenida Rio Branco', 'Sala 404', 'Centro', 'Rio de Janeiro', 'RJ', 'Ativo'),
('Tech Soluções Ltda', 'contato@techsolucoes.com.br', '12.345.678/0001-90', 'PJ', '(31) 3222-1010', '2010-05-01', '30140-071', 'Rua dos Aimorés', 'Andar 5', 'Lourdes', 'Belo Horizonte', 'MG', 'Ativo'),
('Carlos Oliveira', 'carlos.o@gmail.com', '345.678.901-22', 'PF', '(41) 99999-8888', '1978-11-12', '80020-000', 'Rua XV de Novembro', NULL, 'Centro', 'Curitiba', 'PR', 'Ativo'),
('Fernanda Souza', 'nanda.souza@hotmail.com', '456.789.012-33', 'PF', '(51) 98877-6655', '1995-01-30', '90035-072', 'Avenida Osvaldo Aranha', 'Apto 302', 'Bom Fim', 'Porto Alegre', 'RS', 'Inativo'),
('Mercado Preço Bom', 'compras@precobom.com', '98.765.432/0001-10', 'PJ', '(71) 3344-5566', '2015-08-10', '40020-000', 'Avenida Sete de Setembro', 'Loja A', 'Vitória', 'Salvador', 'BA', 'Ativo'),
('Gabriel Santos', 'gabriel.santos@outlook.com', '567.890.123-44', 'PF', '(85) 99112-2334', '1988-04-25', '60165-121', 'Avenida Beira Mar', 'Apto 1201', 'Meireles', 'Fortaleza', 'CE', 'Ativo'),
('Mariana Lima', 'mari.lima@bol.com.br', '678.901.234-55', 'PF', '(92) 98111-2222', '1992-09-05', '69010-060', 'Avenida Eduardo Ribeiro', NULL, 'Centro', 'Manaus', 'AM', 'Ativo'),
('Padaria do João', 'joao@padariadojoao.com.br', '22.333.444/0001-55', 'PJ', '(11) 4455-6677', '2000-02-20', '09010-000', 'Rua Coronel Oliveira Lima', 'Térreo', 'Centro', 'Santo André', 'SP', 'Ativo'),
('Lucas Martins', 'lucas.martins@yahoo.com.br', '789.012.345-66', 'PF', '(61) 99666-7777', '2001-12-15', '70040-010', 'Srtvs', 'Quadra 701 Bloco O', 'Asa Sul', 'Brasília', 'DF', 'Ativo'),
('Isabela Ferreira', 'isa.ferreira@gmail.com', '890.123.456-77', 'PF', '(48) 99123-4567', '1993-06-18', '88010-400', 'Rua Felipe Schmidt', 'Sala 20', 'Centro', 'Florianópolis', 'SC', 'Bloqueado'),
('Ricardo Almeida', 'ricardo.a@empresa.com', '901.234.567-88', 'PF', '(62) 98444-5555', '1980-03-03', '74003-010', 'Avenida Goiás', NULL, 'Setor Central', 'Goiânia', 'GO', 'Ativo'),
('Construtora Horizonte', 'finan@conshorizonte.com.br', '44.555.666/0001-88', 'PJ', '(19) 3232-4545', '1998-07-12', '13010-000', 'Rua Barão de Jaguara', 'Edifício Trade', 'Centro', 'Campinas', 'SP', 'Ativo'),
('Camila Rocha', 'camila.rocha@live.com', '012.345.678-99', 'PF', '(27) 99988-7766', '1996-10-10', '29010-000', 'Avenida Jerônimo Monteiro', 'Apto 500', 'Centro', 'Vitória', 'ES', 'Ativo'),
('Roberto Mendes', 'roberto.mendes@ig.com.br', '123.098.456-00', 'PF', '(81) 98877-1111', '1975-05-22', '50030-230', 'Rua da Aurora', NULL, 'Boa Vista', 'Recife', 'PE', 'Ativo'),
('Clínica Saúde Total', 'sac@saudetotal.com.br', '55.666.777/0001-22', 'PJ', '(98) 3221-9090', '2018-01-15', '65020-290', 'Rua Grande', 'Prédio Azul', 'Centro', 'São Luís', 'MA', 'Ativo'),
('Juliana Torres', 'ju.torres@gmail.com', '321.654.987-11', 'PF', '(84) 99444-3322', '1989-08-08', '59010-100', 'Avenida Rio Branco', 'Sala 12', 'Cidade Alta', 'Natal', 'RN', 'Ativo'),
('Felipe Nunes', 'felipe.nunes@teste.com', '654.321.098-22', 'PF', '(67) 99222-8888', '1991-04-04', '79002-000', 'Rua 14 de Julho', NULL, 'Centro', 'Campo Grande', 'MS', 'Ativo'),
('Restaurante Sabor Caseiro', 'contato@saborcaseiro.com', '77.888.999/0001-33', 'PJ', '(34) 3312-5656', '2012-11-20', '38010-000', 'Rua Artur Machado', 'Loja 2', 'Centro', 'Uberaba', 'MG', 'Ativo'),
('Larissa Gomes', 'lari.gomes@icloud.com', '987.654.321-00', 'PF', '(43) 99654-3210', '1999-12-25', '86010-540', 'Calçadão de Londrina', 'Apto 81', 'Centro', 'Londrina', 'PR', 'Ativo');


-- ===============================
-- TABELA DE PEDIDOS 
-- ===============================
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId VARCHAR(10),
    clienteNome VARCHAR(150),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    desconto DECIMAL(10,2),
    totalFinal DECIMAL(10,2) NOT NULL,
    formaPagamento VARCHAR(20) NOT NULL,
    observacoes TEXT
);

INSERT INTO pedidos (
 clienteId, clienteNome, data, hora, subtotal, desconto, totalFinal, formaPagamento, observacoes
) VALUES
( 'c013', 'Distribuidora Beta', '2025-11-24', '02:09:12', 1559.02, 13.00, 1356.35, 'Crédito', ''),
( 'c005', 'Mercadinho Estrela', '2025-11-23', '09:44:11', 842.67, 0.00, 842.67, 'Pix', ''),
( 'c021', 'Supermercado União', '2025-11-22', '15:33:51', 1299.90, 10.00, 1169.91, 'Débito', ''),
('c002', 'Auto Peças Premium', '2025-11-21', '18:05:17', 320.75, 0.00, 320.75, 'Dinheiro', ''),
( 'c017', 'Loja Martins', '2025-11-20', '11:05:47', 1679.88, 30.00, 1649.88, 'Crédito', 'Embalagem protegida'),
( 'c009', 'Farmácia Popularis', '2025-11-19', '10:12:22', 455.20, 5.00, 432.44, 'Pix', ''),
('c011', 'Tech Center', '2025-11-18', '14:22:43', 2400.00, 50.00, 2350.00, 'Crédito', 'Cliente frequente'),
( 'c003', 'Papelaria Mundo Azul', '2025-11-17', '16:40:36', 190.30, 0.00, 190.30, 'Dinheiro', ''),
( 'c014', 'Comercial Norte', '2025-11-16', '12:33:01', 709.42, 7.00, 659.76, 'Pix', ''),
( 'c020', 'Boutique Estilo', '2025-11-15', '17:58:10', 155.90, 0.00, 155.90, 'Débito', '');


-- ===============================
-- TABELA DE ITENS DO PEDIDO
-- ===============================
CREATE TABLE pedido_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedidoId VARCHAR(10),
    produtoId INT,
    nome VARCHAR(150),
    SKU VARCHAR(20),
    precoVenda DECIMAL(10,2),
    quantidadeSolicitada INT,
    quantidadeDisponivel INT
);

INSERT INTO pedido_itens 
(pedidoId, produtoId, nome, SKU, precoVenda, quantidadeSolicitada, quantidadeDisponivel) VALUES
-- 1
('1', 50, 'Produto 50', '4302840101', 779.51, 2, 275),

-- 2
('2', 7,  'Produto 07', '1182037744', 120.89, 3, 210),
('2', 12, 'Produto 12', '9982210345', 200.00, 2, 110),

-- 3
('3', 3,  'Produto 03', '1029384756', 149.90, 2, 320),
('3', 44, 'Produto 44', '7759402231', 600.00, 1, 150),
('3', 22, 'Produto 22', '5543928140', 250.05, 2, 200),

-- 4
('4', 88, 'Produto 88', '5531029482', 160.75, 1, 420),
('4', 89, 'Produto 89', '5531029489', 160.00, 1, 315),

-- 5
('5', 19, 'Produto 19', '2241908821', 839.94, 2, 200),

-- 6
('6', 4, 'Produto 04', '3192846567', 55.20, 2, 180),
('6', 1, 'Produto 01', '6648273910', 172.40, 1, 500),

-- 7
('7', 71, 'Produto 71', '8829137744', 1200.00, 2, 65),

-- 8
('8', 15, 'Produto 15', '3348910028', 95.15, 2, 130),

-- 9
('9', 56, 'Produto 56', '1192048453', 354.71, 1, 430),
('9', 57, 'Produto 57', '1192048454', 354.71, 1, 410),

-- 10
('10', 8, 'Produto 08', '9381027744', 155.90, 1, 260);
