'use strict';

var keyboard = new THREEx.KeyboardState();
var lineas = new THREE.Group();
var legendGroup = new THREE.Object3D();
var setintervalTimes = [6000, 6000, 6000, 20000, 6000, 8000, 5000, 20000, 10000];
var currentSensor = 'none';
var myTimersetInterval = 0;
var generaInterval = 0;
var colorCount = 0;
var currentVideoStep = 0;
var currentIntervalTime = 4000;
var clock = new THREE.Clock();
var video, videoImage, videoImageContext, videoTexture,rendererCSS, circunference, circunference1, circunference2, circunference3, circunference4, svg;
var mirrorCube, mirrorCubeCamera, mirrorCube2, mirrorCubeCamera2, annie, zoneGroup, lightsComunicationGroup, sphereComunicationGroup; 
var renderer, mesh, INTERSECTED, zoneColors;
var scene, camera, groupPlanta1, groupBaths, groupPasillo, groupBaranCristal, groupBaranPared, sensorGroup, standGroup, controls, controller, controlsdevice, raycaster;
var mouse = new THREE.Vector2();
var pointCloud, colorSelect = 1;
var valorDescuento = 35;

var CONTENIDO;

var pathPlanta1 = [
	//CRISTAL TRASERO
	"M5030 1335 c0 -13 83 -15 685 -15 602 0 685 2 685 15 0 13 -83 15 -685 15 -602 0 -685 -2 -685 -15z",
  	//CRISTALERA IZQUIERDA
  	"M690 3715 l0 -1615 25 0 25 0 0 1595 0 1595 1405 0 c1398 0 1405 0 1405 20 0 20 -7 20 -1430 20 l-1430 0 0 -1615z",
  	//CRISTALERA DERECHA
	"M7890 5295 c0 -13 154 -15 1330 -15 1176 0 1330 2 1330 15 0 13 -154 15 -1330 15 -1176 0 -1330 -2 -1330 -15z",
	//MURO TRASERO DERECHA
	//"M10560 3390 l0 -1920 -2075 0 -2075 0 0 -75 0 -75 2150 0 2150 0 0 1995 0 1995 -75 0 -75 0 0 -1920z",
	//COLUMNA 2 DERECHA
	"M9190 4000 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	//CULUMNA 2 IZQUIERDA
	//"M2080 3985 l0 -75 75 0 75 0 0 75 0 75 -75 0 -75 0 0 -75z",
	//COLUMNA 1 DERECHA
	"M9190 2750 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	//COLUMNA 1 IZQUIERDA
	//"M2070 2690 l0 -70 80 0 80 0 0 70 0 70 -80 0 -80 0 0 -70z",
	//MURO TRASERO IZQUIERDA
	//"M680 1395 l0 -75 2170 0 2170 0 0 75 0 75 -2170 0 -2170 0 0 -75z",
	"M3520 4000 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	"M7760 4000 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	"M3520 3160 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	"M7760 2750 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z",
	"M3520 2690 l0 -70 65 0 65 0 0 70 0 70 -65 0 -65 0 0 -70z"
  ];
  var coloresPlanta = [0X8888FF,0X8888FF,0X8888FF,0x888888,0x888888,0x888888,0x888888,0x888888,0x888888,0x888888];
  var opacidadPlanta = [0.4,0.4,0.4,1,1,1,1,1,1,1];
  //var texturePlanta = ['false','false','false','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster','white_plaster'];
  var texturePlanta = ['false','false','false','false','false','false','false','false','false','false','false','false','false','false'];

  var pathBaths = [
  	"M3570 5255 l0 -75 295 0 295 0 0 -340 0 -340 25 0 25 0 0 340 0 340 395 0 395 0 0 -541 0 -541 -470 4 -470 4 0 -78 0 -78 540 0 540 0 0 515 0 515-40 0 -40 0 0 175 0 175 -745 0 -745 0 0 -75z",
	"M6400 5145 l0 -165 -50 0 -50 0 0 -580 0 -580 520 0 520 0 0 80 0 80 -130 0 -130 0 0 25 c0 21 -5 25 -30 25 -25 0 -30 -4 -30 -25 l0 -25 -280 0 -280 0 0 595 0 595 280 0 280 0 0 -360 0 -360 30 0 30 0 0 355 0 355 400 0 400 0 0 75 0 75 -740 0 -740 0 0 -165z"	
  ];
  var coloresBaths = [0x888888,0x888888];
  var opacidadBaths = [1,1];
  var textureBaths = ['false','false'];

  var pathPasilloSup = [
	"M3570 3710 l0 -1570 -1350 0 -1350 0 0 -340 0 -340 4845 0 4845 0 0 340 0 340 -1360 0 -1360 0 0 1550 0 1550 -685 0 -685 0 0 -160 0 -160 -60 0 -60 0 0 -515 0 -515 450 0 450 0 0 -875 0 -875 -1520 0 -1520 0 0 940 0 940 440 0 440 0 0 460 0 460 -45 0 -45 0 0 170 0 170 -715 0 -715 0 0 -1570z"
  ];

  var coloresPasillo = [0Xbbbbbb];
  var opacidadpasillo = [0.6];
  var texturePasillo = ['false'];

  var pathBaranCristal = [
  	"M3570 3045 l0 -905 -710 0 c-624 0 -710 -2 -710 -15 0 -13 87 -15 725 -15 l725 0 0 920 c0 811 -2 920 -15 920 -13 0 -15 -107 -15 -905z",
	"M7800 2950 l0 -840 1380 0 c1220 0 1380 2 1380 15 0 13 -158 15 -1360 15 l-1360 0 0 825 c0 818 0 825 -20 825 -20 0 -20 -7 -20 -840z",
	"M4180 2640 l0 -530 1555 0 1555 0 0 520 c0 513 0 520 -20 520 -20 0 -20 -7 -20 -505 l0 -505 -1520 0 -1520 0 0 515 c0 451 -2 515 -15 515 -13 0 -15 -66 -15 -530z"
  ];

  var coloresBaranCristal = [0X4444FF,0X4444FF,0X4444FF];
  var opacidadBaranCristal = [0.3,0.3,0.3];
  var textureBaranCristal = ['false','false','false'];

  var pathBaranpared = [
	"M3570 4645 c0 -602 2 -685 15 -685 13 0 15 81 15 670 l0 670 720 0 720 0 0 -170 0 -170 40 0 40 0 0 -495 0 -495 -455 0 c-297 0 -455 -3 -455 -10 0 -7 162 -10 465 -10 l465 0 0 515 0 515 -40 0 -40 0 0 160 0 160 665 0 665 0 0 -160 0 -160 -45 0 -45 0 0 -580 0 -580 475 0 c468 0 475 0 475 20 0 20 -7 20 -455 20 l-455 0 0 540 0 540 45 0 45 0 0 180 0 180 710 0 710 0 0 -55 c0 -52 -1 -55 -25 -55 l-25 0 0 -700 c0 -693 0 -700 20 -700 20 0 20 7 20 685 0 678 0 685 20 685 18 0 20 7 20 85 l0 85 -2155 0 -2155 0 0 -685z",
	"M740 2125 c0 -13 84 -15 700 -15 616 0 700 2 700 15 0 13 -84 15 -700 15 -616 0 -700 -2 -700 -15z"
];

  var coloresBaranPared = [0x888888,0x888888,0x888888];
  var opacidadBaranPared = [1,1,1];
  var textureBaranPared = ['false','false','false'];

var clock = new THREE.Clock();

var planta1 = initSVGObject(pathPlanta1, coloresPlanta, opacidadPlanta,texturePlanta);
var baths = initSVGObject(pathBaths, coloresBaths, opacidadBaths,textureBaths);
var pasilloSup = initSVGObject(pathPasilloSup, coloresPasillo, opacidadpasillo, texturePasillo);
var baranCristal = initSVGObject(pathBaranCristal, coloresBaranCristal, opacidadBaranCristal, textureBaranCristal);
var baranPared = initSVGObject(pathBaranpared, coloresBaranPared, opacidadBaranPared, textureBaranPared);


function initSVGObject(path,colorsInd,opacity,text) {
	var obj = {};
	/*obj.paths = [
				//AUDITORIO Y MURO DERECHO
				"M3215 9843 c-16 -9 -32 -19 -35 -24 -3 -4 -33 -20 -68 -35 -34 -14 -62 -30 -62 -33 0 -4 -25 -18 -55 -30 -30 -13 -55 -26 -55 -31 0 -4 -20 -15 -44 -24 -24 -9 -54 -26 -67 -36 -12 -11 -28 -20 -36 -20 -10 0 -13 -43 -13 -224 0 -156 -3 -227 -11 -232 -7 -4 -175 -7 -374 -8 -200 -1 -367 -5 -372 -9 -8 -8 -13 -2448 -5 -2494 l4 -23 552 0 c303 0 569 -1 591 -1 l40 -1 -40 -8 c-22 -5 -97 -9 -167 -9 l-128 -1 0 -274 c0 -152 -4 -277 -9 -280 -5 -3 -578 -9 -1272 -12 -695 -3 -1266 -8 -1268 -10 -2 -2 -6 -268 -9 -593 l-5 -589 114 -4 c63 -3 330 -6 594 -8 264 -1 552 -4 640 -5 88 -2 217 -3 288 -4 126 -1 128 -1 137 -26 8 -22 16 -25 55 -25 l45 0 0 70 c0 60 -3 70 -17 70 -702 3 -1741 13 -1751 16 -10 3 -12 110 -10 511 l3 508 1287 -4 1286 -4 -6 174 c-4 96 -7 228 -7 294 l0 120 155 6 c85 4 161 7 169 8 9 1 12 12 9 40 -3 32 0 41 14 44 13 4 18 15 18 40 l0 34 -217 7 c-120 4 -399 5 -620 2 -257 -3 -405 -2 -408 5 -8 12 -6 2349 1 2360 3 5 171 9 374 9 342 0 369 1 374 18 3 9 5 116 4 237 l-2 220 30 14 c16 8 31 17 34 21 3 4 15 10 28 14 12 4 22 11 22 16 0 5 16 14 35 20 19 6 35 15 35 20 0 5 16 14 35 20 19 6 35 15 35 19 0 4 16 13 35 20 19 7 35 16 35 21 0 4 11 11 24 14 14 3 31 12 38 19 37 35 62 37 536 37 430 0 469 -1 491 -17 14 -10 52 -32 85 -50 78 -41 163 -85 251 -131 l70 -37 1 -105 c1 -58 3 -167 4 -243 1 -89 6 -139 13 -144 6 -4 170 -7 364 -7 233 -1 356 -5 363 -12 7 -7 9 -373 8 -1188 l-3 -1179 -600 1 c-330 1 -617 -1 -637 -4 -35 -5 -38 -8 -38 -40 l0 -34 675 0 675 0 0 1260 -1 1259 -367 -2 -367 -2 -3 240 -2 240 -43 23 c-87 49 -295 157 -360 189 l-68 33 -512 0 c-448 -1 -516 -3 -542 -17z",
				//MURO IZQUIERDO
				"M4126 6584 c-3 -8 -6 -24 -6 -35 0 -17 10 -19 138 -21 l137 -3 3 -292 2 -293 468 -2 467 -3 0 -225 0 -225 -462 -3 -463 -2 -2 -158 c-3 -297 -5 -312 -26 -312 -10 0 -29 -11 -41 -24 -21 -22 -23 -32 -20 -108 3 -59 9 -92 22 -111 16 -25 22 -27 93 -27 78 0 126 16 137 45 6 13 89 15 737 15 l730 0 0 50 c0 28 -1 50 -2 50 -2 0 -327 3 -723 6 -396 3 -726 7 -732 9 -7 3 -13 19 -13 38 0 23 -8 41 -25 57 -25 23 -25 26 -25 187 l0 163 466 0 465 0 -6 333 c-4 182 -10 335 -14 339 -4 4 -209 9 -456 10 l-450 3 -5 275 -5 275 -191 3 c-168 2 -192 0 -198 -14z",
				//COLUMNA SUPERIOR DERECHA
				"M2843 5015 c-21 -15 -23 -24 -23 -119 0 -134 3 -137 125 -130 125 8 135 18 135 134 0 113 -6 119 -126 126 -73 5 -93 3 -111 -11z",
				//HALL PARTE INFERIOR
				"M2122 4173 l-33 -4 3 -957 c1 -526 4 -1073 6 -1214 l3 -258 373 0 c276 0 375 3 384 12 7 7 13 8 14 2 1 -5 2 -328 2 -719 l1 -710 1980 4 c1089 2 2081 5 2205 6 124 1 359 3 523 4 l298 1 -6 478 c-2 262 -5 623 -5 801 l0 324 -924 -6 c-747 -4 -927 -3 -935 7 -8 9 -10 212 -9 657 3 635 3 644 23 647 33 6 65 43 65 74 0 16 -7 61 -16 99 -13 57 -20 72 -40 79 l-24 10 0 202 c0 112 -3 254 -7 316 l-6 112 -36 -6 c-20 -4 -37 -7 -38 -8 -5 -4 -12 -213 -12 -403 -1 -205 -2 -223 -18 -223 -43 -1 -53 -23 -53 -118 0 -88 1 -91 31 -121 l30 -31 6 -312 c3 -172 8 -484 12 -693 l6 -380 906 -3 c709 -2 909 -5 917 -15 6 -7 12 -229 17 -592 4 -319 8 -626 10 -683 2 -56 0 -104 -4 -106 -11 -7 -1043 -15 -3006 -22 -1566 -6 -1772 -5 -1783 8 -9 12 -12 159 -10 664 l3 649 35 3 c61 6 70 22 70 132 0 126 -4 130 -126 130 -116 -1 -126 -8 -133 -97 l-6 -68 -301 -3 c-236 -2 -304 1 -312 11 -7 8 -12 303 -14 942 -4 1233 -6 1385 -21 1383 -7 0 -27 -3 -45 -5z",
				//COLUMNA INFERIOS	
				"M4359 1983 c-25 -15 -27 -23 -32 -102 -6 -116 2 -126 120 -134 70 -5 91 -3 114 10 33 20 39 38 39 124 0 59 -3 68 -28 92 -26 25 -35 27 -108 27 -55 0 -87 -5 -105 -17z"
   ];*/

  	obj.paths = path;

	obj.amounts = [];

	obj.ids = [];

	obj.colors = colorsInd;
	obj.opac = opacity;
	obj.textu = text;
	//obj.colors = [];

	for (var i = 0; i < obj.paths.length; i+=1) { obj.ids[i] = i; }
	
	//for(var i = 0; i < obj.paths.length; i+=1){ obj.amounts[i]=4000; }	

	//for(var i = 0; i < obj.paths.length; i+=1){ obj.colors[i]=0xFFFFFF; }	
	
	obj.center = { x:0, y:0, z: 0 };
	return obj;
};