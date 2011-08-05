<strong>
Projeto:                Davit

Versão corrente:        00.001 Alfa

Data de Aprovação:      2010/12/10

Licença: GNU General    Public License, version 3 (GPLv3)

Autor: Renato da Silva Louro (@rslouro) renato@silostecnologia.com.br
</strong>
Davit é, inicialmente, uma implementação em Javascript, e adaptação livre, do Robô Karel do professor Mehan Sahami de Stanford. Ele, é um pequeno Robô virtual – um robô triangular no caso do Davit – que pode ser programado por estudantes de programação. Com isso é, no mínimo, uma forma divertida de aprender lógica de programação e, no caso do Davit, também programação em Javascript.
Para ver o Davit sendo utilizado em aulas práticas de programação visite:
<a href=http://www.aprenderprogramar.com.br/logica-programacao-davit/>Lógica de Programação com Davit</a>

Como o ambiente de Davit é Javascript, a programação com Davit se aproveita de todos os recursos da linguagem como criação de funções, variáveis, controles de fluxos, etc.
Além disso existem os comandos relacionados a API do Davit. São eles:

<h2>Comandos API Davit</h2>
<h3>Montagem do Mundo</h3>
   makeworld(8,8,true); // cria um mundo 8x8. O 3o parâmetro determina de a grade será mostrada.     
   createWall([3,5], 'L'); // Cria um bloco de parede ao leste 'L' da posição 3,5.
   createLongWall([1,5], 'S', 6); // Cria uma parede contínua por 6 posições ao sul 'S' da posição 1,5
   createDisc([2,5],"rgb(0,255,0)"); // Cria um disco verde na posição 2,5
   createDavit(4,0,'N'); // Cria o Davit na posição 4,0 voltado para o norte 'N'
<h3>Movimentação do Davit</h3>
   move(); //Move davit 1 posição para frente
   turn(); //Vira Davit no sentido horário
   getDisc(); //Pega disco
   putDisc(); //Solta disco
