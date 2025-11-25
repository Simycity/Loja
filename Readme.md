Para iniciar o projeto:

Entre no terminal na pasta client
 - Crie o arquivo ".env" com a seguinte linha = VITE_API_URL = http://localhost:5000
 - npm i : instala as dependências
 - npm run dev : inicia o projeto

Em outro terminal, entre na pasta server:

 - Crie o arquivo ".env" com as seguintes linhas 

    PORT=5000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=usbw
    DB_NAME=sistema_pdv
 - Crie o banco de dados utilizando o arquivo "data/banco.sql"
 
 - npm i : instala as dependências
 - npm run server :  inicia o servidor
