/******************************************************************************
 *    Nome:                   Davit
 *    Copyright/Proprietário: 2010/ Renato da Silva Louro (@rslouro)
 *    Projeto:                Davit     
 *    Gestor do Arquivo:      Renato da Silva Louro (@rslouro) 
 *                               renato@silostecnologia.com.br
 *    Arquivo:                main.js
 *    Identificação:          dvt
 *    Versão corrente:        00.001 Alfa
 *    Data de Aprovação:      2010/12/10
 *    Licença: GNU General    Public License, version 3 (GPLv3)
 *    Copyright: 2010-2011    Renato da Silva Louro
 *    
 *    Autor: Renato da Silva Louro (@rslouro) renato@silostecnologia.com.br
 *
 *****************************************************************************/

var PXWIDTH=500;
var PXHEIGHT=500;
var REAL_X=500;
var REAL_Y=500;
var rotY=0;
var rotZ=0;
var _ad2=[];
var selDot=-1;
var _pos=[-1,-1];
var _mode;
function c()
{
   if(this.cv==null)
   {
	  this.cv = document.getElementById('showCanvas');
      this.ct = this.cv.getContext('2d');
   }
   return this;   
}

function Point2D(){
 this.p=[0,0];
 this.isNear=function(m){
   return ((m[0]<=this.p[0]+6) && (m[0]>=this.p[0]-6) && (m[1]<=this.p[1]+6) && (m[1]>=this.p[1]-6) );
 }   
 return this;
}

function x2px(pXReal){
  return Math.floor(((pXReal*PXWIDTH)/REAL_X));
}
function y2px(pYReal){
  return Math.floor(((-1*(PXHEIGHT/REAL_Y))*pYReal)+(PXHEIGHT));    
}

function px2x(pXpx){
  return Math.floor(pXpx*(REAL_X/PXWIDTH)-(REAL_X/2));
}
function px2y(pYpx){
  return Math.floor((REAL_Y/2)-(pYpx*(REAL_Y/PXHEIGHT)));
}

function drawLine(p1,p2)
{
   c().ct.moveTo(x2px(p1[0]),y2px(p1[1]));
   c().ct.lineTo(x2px(p2[0]),y2px(p2[1]));
}

var iPosC = 0;
var iPosL = 0;
var DX;
var DY;
var G_bShowGrid = false;
var G_sDir  = 'N';
var G_qntDisc = 0;
var G_iQntColunas=30;
var G_iQntLinhas=30;
var arWall=[];
var G_arDisc=[];
var G_arrDavitDisc=[];
var G_sDefaultDiscColor="rgb(255,0,0)";
function main()
{
   PXWIDTH=c().cv.width;
   PXHEIGHT=c().cv.height;
   REAL_X=500;
   REAL_Y=500;    
}
function setupExerc1()
{
   makeworld(8,8,true);     
   createLongWall([1,5], 'S', 6);
   createDisc([6,4],"rgb(0,0,255)");
   createDisc([2,5],"rgb(0,255,0)");
   createDisc([5,2],"rgb(255,255,255)");
   createDavit(4,0,'N');
}

function makeworld(pQntColunas, pQntLinhas, pbShowGrid)
{
   arWall=[];
   G_arDisc=[];
   
   G_iQntColunas=pQntColunas;
   G_iQntLinhas=pQntLinhas;
   G_bShowGrid=pbShowGrid;
   DX=REAL_X/(G_iQntColunas+1);
   DY=REAL_Y/(G_iQntLinhas+1);

   redrawAll();
}

function createDavit(piPosC, piPosL, psDir,pqntDisc, psDefaultDiscColor)
{
   G_qntDisc = 0;
   G_arrDavitDisc=[];

   iPosC     = piPosC;
   iPosL     = piPosL;
   G_sDir = psDir;
   if(pqntDisc!=undefined) G_qntDisc = pqntDisc;
   if(psDefaultDiscColor!=undefined) G_sDefaultDiscColor=psDefaultDiscColor;
   redrawAll();
}

function drawWorld()
{
   if(!G_bShowGrid) return;
   
   c().ct.strokeStyle = "rgb(0,255,0)";
   c().ct.lineWidth = 1;

   c().ct.beginPath();
   for(i=DX;i<=REAL_X-DX;i+=DX)
   {
      drawLine([i,DY],[i,REAL_Y-DY]);  
   }
   for(i=DY;i<=REAL_Y-DY;i+=DY)
   {
      drawLine([DX,i],[REAL_X-DX,i]);  
   }
   c().ct.stroke();
}

function getIdWall(parPoint, psDir)
{
   //alert([parPoint, psDir]);
   var iLO=0;
   var iNS=0;   
   if(psDir=='L') iLO=1;
   if(psDir=='O') iLO=-1;
   if(psDir=='N') iNS=1;
   if(psDir=='S') iNS=-1
   return (((parPoint[1]*2)+iNS)*((2*G_iQntColunas)-1))+(parPoint[0]*2)+iLO;
}

function getIdDisc(parPoint)
{
   return ((parPoint[1]*2)*((2*G_iQntColunas)-1))+(parPoint[0]*2);
}


function createWall(parPoint, psDir)
{
   arWall[getIdWall(parPoint, psDir)]=[parPoint[0],parPoint[1],psDir,"rgb(255,0,0)"];
   redrawAll();
}

function createDisc(parPoint, psColor)
{
   if(G_arDisc[getIdDisc(parPoint)]==null) G_arDisc[getIdDisc(parPoint)]=new Array();
   G_arDisc[getIdDisc(parPoint)].push([parPoint[0],parPoint[1],psColor]);
   redrawAll();
}


function createLongWall(parPoint, psDir, piLength)
{
   for(var i=0; i<piLength; i++)
   {
      if(psDir=='L'||psDir=='O') createWall([parPoint[0],parPoint[1]+i], psDir);
      if(psDir=='N'||psDir=='S') createWall([parPoint[0]+i,parPoint[1]], psDir);
   }

}

function drawWall(idWall)
{
   wall=arWall[idWall];
   c().ct.strokeStyle = wall[3];
   c().ct.fillStyle   = wall[3];
   
   c().ct.lineWidth = 1;   
   c().ct.beginPath();

   if(wall[2]=='N')
   {
      c().ct.moveTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY+(5*(DY/8))));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(DX/2)),y2px((wall[1]*DY)+DY+(5*(DY/8))));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(DX/2)),y2px((wall[1]*DY)+DY+(3*(DY/8))));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY+(3*(DY/8))));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY+(5*(DY/8))));
   }
   if(wall[2]=='S')
   {
      c().ct.moveTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY-(5*(DY/8))));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(DX/2)),y2px((wall[1]*DY)+DY-(5*(DY/8))));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(DX/2)),y2px((wall[1]*DY)+DY-(3*(DY/8))));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY-(3*(DY/8))));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(DX/2)),y2px((wall[1]*DY)+DY-(5*(DY/8))));
   }
   if(wall[2]=='L')
   {
      c().ct.moveTo(x2px((wall[0]*DX)+DX+(5*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(5*(DY/8))),y2px((wall[1]*DY)+DY+(DX/2)));
      c().ct.lineTo(x2px((wall[0]*DX)+DX+(3*(DY/8))),y2px((wall[1]*DY)+DY+(DX/2)));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX+(3*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX+(5*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
   }
   if(wall[2]=='O')
   {
      c().ct.moveTo(x2px((wall[0]*DX)+DX-(5*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
      c().ct.lineTo(x2px((wall[0]*DX)+DX-(5*(DY/8))),y2px((wall[1]*DY)+DY+(DX/2)));
      c().ct.lineTo(x2px((wall[0]*DX)+DX-(3*(DY/8))),y2px((wall[1]*DY)+DY+(DX/2)));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(3*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
	  c().ct.lineTo(x2px((wall[0]*DX)+DX-(5*(DY/8))),y2px((wall[1]*DY)+DY-(DX/2)));
   }
   
   c().ct.fill();
   c().ct.stroke();
   c().ct.closePath();
   
   
}

function drawWalls()
{
   for(i=0;i<arWall.length;i++)
      if(arWall[i]!=null) drawWall(i);
}

function drawDiscs()
{
   for(i=0;i<G_arDisc.length;i++)
      if(G_arDisc[i]!=null)
	     if(G_arDisc[i].length>0) drawDisc(i);
}


function drawRobot()
{
   c().ct.strokeStyle = "rgb(0,255,255)";
   c().ct.fillStyle   = "rgb(0,255,255)";

   c().ct.lineWidth = 1;
   
   c().ct.beginPath();
   if(G_sDir=='N')
   {
 	  c().ct.moveTo(x2px((iPosC*DX)+DX),y2px((iPosL*DY)+DY+(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX-(DX/4)),y2px((iPosL*DY)+DY-(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX+(DX/4)),y2px((iPosL*DY)+DY-(DY/4)));
	  c().ct.lineTo(x2px((iPosC*DX)+DX),y2px((iPosL*DY)+DY+(DY/4)));
   }
   if(G_sDir=='S')
   {
      c().ct.moveTo(x2px((iPosC*DX)+DX),y2px((iPosL*DY)+DY-(DY/4)));
	  c().ct.lineTo(x2px((iPosC*DX)+DX-(DX/4)),y2px((iPosL*DY)+DY+(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX+(DX/4)),y2px((iPosL*DY)+DY+(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX),y2px((iPosL*DY)+DY-(DY/4)));
   }
   if(G_sDir=='L')
   {
      c().ct.moveTo(x2px((iPosC*DX)+DX+(DX/4)),y2px((iPosL*DY)+DY));
	  c().ct.lineTo(x2px((iPosC*DX)+DX-(DX/4)),y2px((iPosL*DY)+DY+(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX-(DX/4)),y2px((iPosL*DY)+DY-(DY/4)));
   }
   if(G_sDir=='O')
   {
      c().ct.moveTo(x2px((iPosC*DX)+DX-(DX/4)),y2px((iPosL*DY)+DY));
	  c().ct.lineTo(x2px((iPosC*DX)+DX+(DX/4)),y2px((iPosL*DY)+DY+(DY/4)));
      c().ct.lineTo(x2px((iPosC*DX)+DX+(DX/4)),y2px((iPosL*DY)+DY-(DY/4)));
   }  
   c().ct.fill();
   c().ct.stroke();
   c().ct.closePath();
}

function turn()
{
   if(G_sDir=='N') G_sDir='L';
   else if(G_sDir=='L') G_sDir='S';
   else if(G_sDir=='S') G_sDir='O';
   else if(G_sDir=='O') G_sDir='N';

   redrawAll();
}

function isFrontBlocked()
{
   return (arWall[getIdWall([iPosC,iPosL],G_sDir)]!=null) || ((G_sDir=='N' && iPosL==G_iQntLinhas-1) || (G_sDir=='L' && iPosC==G_iQntColunas-1) || (G_sDir=='S' && iPosL==0)|| (G_sDir=='O' && iPosC==0));
}

function move()
{
   if (isFrontBlocked())
   {
      alert('BOING!!! Bateu na posição ('+iPosC+','+iPosL+')');
      return false;
   }
   
   if(G_sDir=='N') iPosL+=1;
   else if(G_sDir=='L') iPosC+=1;
   else if(G_sDir=='S') iPosL-=1;
   else if(G_sDir=='O') iPosC-=1;
   redrawAll()   
   return true;

}

function drawDisc(pIdDisc)
{
   disc=G_arDisc[pIdDisc][G_arDisc[pIdDisc].length-1];
   
   c().ct.strokeStyle = disc[2];
   c().ct.fillStyle   = disc[2];
   
   c().ct.lineWidth = 1;   
   c().ct.beginPath();
   c().ct.arc(x2px((disc[0]*DX)+DX), y2px((disc[1]*DY)+DY), (DX/4), 0, Math.PI*2, true); 
   c().ct.closePath();
   c().ct.fill();
}

function redrawAll()
{
      c().ct.clearRect (0, 0,  PXWIDTH, PXHEIGHT);
	  drawWorld();
	  drawDiscs()
	  drawRobot();
	  drawWalls();
	  
}

function putDisc()
{
   if(G_arrDavitDisc.length>0)
   {
      disc=G_arrDavitDisc.pop();
      if(G_arDisc[getIdDisc([iPosC,iPosL])]==undefined) G_arDisc[getIdDisc([iPosC,iPosL])]=[];
	  G_arDisc[getIdDisc([iPosC,iPosL])].push([iPosC,iPosL,disc[2]])
   }
   else if(!isNaN(G_qntDisc))
   {
      if(G_qntDisc==0)
	  {
	     alert('Davit não tem nenhum disco para colocar aqui!');
         return false;
	  }
	  else
	  {
	     G_qntDisc=G_qntDisc-1;
		 if(G_arDisc[getIdDisc([iPosC,iPosL])]==undefined) G_arDisc[getIdDisc([iPosC,iPosL])]=[];
		 G_arDisc[getIdDisc([iPosC,iPosL])].push([iPosC,iPosL,G_sDefaultDiscColor]);
	  }
   }
   else
   {
   		 if(G_arDisc[getIdDisc([iPosC,iPosL])]==undefined) G_arDisc[getIdDisc([iPosC,iPosL])]=[];
		 G_arDisc[getIdDisc([iPosC,iPosL])].push([iPosC,iPosL,G_sDefaultDiscColor]);
   }
   redrawAll();
}

function getDisc()
{
   if(G_arDisc[getIdDisc([iPosC,iPosL])]!=null)
      if(G_arDisc[getIdDisc([iPosC,iPosL])].length>0)
	  {
	     G_arrDavitDisc.push(G_arDisc[getIdDisc([iPosC,iPosL])].pop());
		 redrawAll();
	     return;
	  }
      
	  alert('Aqui, na posição ('+iPosC+','+iPosL+') não existem discos para Davit pegar!');
	  
}
function exec(psCode)
{
setupExerc1();
try{ eval(psCode); } catch(ex) { alert(ex); }
}
var sExemploCodigo="/* Exemplo de como mandar Davit pegar o disco branco. Altere as linhas abaixo para fazer o Davit pegar os outros discos! */\n\nmove();\nmove();\nturn();\nmove();\ngetDisc();";
