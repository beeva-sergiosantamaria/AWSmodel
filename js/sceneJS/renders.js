
'use strict'; 
function addGeoObject ( group, svgObject, amt, altura, name ) {
	
	var i,j, len, len1;
	var path, mesh, color, material, amount, simpleShapes, simpleShape, shape3d, opacidad;
	var thePaths = svgObject.paths;
	var theAmounts = svgObject.amounts;
	var theColors = svgObject.colors;
	var theOpacs = svgObject.opac;
	var theCenter = svgObject.center;
	var textura = svgObject.textu;

	len = thePaths.length;

	var wallPosition = [{x: -264500, y: 10000, z: 85000},{x: -211500, y: 10000, z: 34000}, {x: -73500, y: 10000, z: 34000}];
	var wallDimension = [{x: 2000, y: 20000, z: 98000},{x: 108000, y: 20000, z: 4000},{x: 108000, y: 20000, z: 4000}];

	var columnPosition = [{x: -53700, y: 10000, z: 67200},{x: -54000, y: 10000, z: 99500}];
	var columnDimension = [{x: 3500, y: 20000, z: 3500},{x: 3500, y: 20000, z: 3500}];

	for(var o = 0; o<7;o++){
		if(o==6) var width = 2100;
		else var width = 400;
		var glassStructureGeometry = new THREE.BoxGeometry(2100, 20000, width);
		var glassStructureMaterial = new THREE.MeshPhongMaterial( { color: 0X333333, ambient: 0x000000, emissive: 0X333333,specular: 0X333333 } );
	    var glassStructure = new THREE.Mesh( glassStructureGeometry, glassStructureMaterial );
	    	glassStructure.position.set(-18000, 10000, 53800+(13000*o));
	    group.add(glassStructure);	
	} 

	for(var o = 0; o<5;o++){
		if(o==4) var width = 2100;
		else var width = 400;
		var glassStructureGeometry = new THREE.BoxGeometry(width, 20000, 2100);
		var glassStructureMaterial = new THREE.MeshPhongMaterial( { color: 0X333333, ambient: 0x000000, emissive: 0X333333,specular: 0X333333 } );
	    var glassStructure = new THREE.Mesh( glassStructureGeometry, glassStructureMaterial );
	    	glassStructure.position.set(-31000-(14500*o), 10000, 132800);
	    group.add(glassStructure);	
	} 

	for(var e = 0; e<2;e++){
		var cubeGeom = new THREE.BoxGeometry(columnDimension[e].x, columnDimension[e].y, columnDimension[e].z, 1, 1, 1);
	    var mirrorCubeMaterial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/metal-texture.jpg' ),color: 0xbdbdbd, ambient: 0xbdbdbd, emissive: 0Xccccff,specular: 0xbdbdbd } );
    		mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
    		mirrorCube.position.set(columnPosition[e].x, columnPosition[e].y, columnPosition[e].z);
    		mirrorCube.castShadow = true;
    	group.add(mirrorCube);
	}
		
	for(var a = 0; a<3; a++){
		var cubeGeom = new THREE.BoxGeometry(wallDimension[a].x, wallDimension[a].y, wallDimension[a].z, 1, 1, 1);
	    var mirrorCubeMaterial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/muro.jpg' ),color: 0Xffffff, ambient: 0xbdbdbd, emissive: 0Xffffff,specular: 0xbdbdbd } );
	    mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
	    mirrorCube.position.set(wallPosition[a].x, wallPosition[a].y, wallPosition[a].z);
	    group.add(mirrorCube);
		}

	for (var i = 0; i < len; ++i) {
		THREE.BoxGeometry
		
		path = $d3g.transformSVGPath( thePaths[i] );
		color = new THREE.Color( theColors[i] ); 
		opacidad =  theOpacs[i];
		if(textura[i]!='false'){
	 		var materialArray = [];
				materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/wood4.jpg' ) }));
				materialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
				materialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
				materialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
				materialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
				materialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));

			material = new THREE.MeshFaceMaterial(materialArray);
		}
		else {
			material = new THREE.MeshPhongMaterial( { color: color, ambient: color, emissive: color,specular: 0Xdbdbdb, transparent: true, opacity: opacidad } );
		}
		amount = amt;
		simpleShapes = path.toShapes(true);

		len1 = simpleShapes.length;

		for (j = 0; j < len1; ++j) {
			simpleShape = simpleShapes[j];
			shape3d = simpleShape.extrude({
				amount: amount,
				bevelEnabled: false
			});

			mesh = new THREE.Mesh(shape3d, material);
			mesh.rotation.x = Math.PI / 2;
			mesh.rotation.y = Math.PI;
			mesh.translateZ( altura);
			mesh.translateX( - theCenter.x);
			mesh.translateY( - theCenter.y);
			mesh.scale.x = 25;
			mesh.scale.y = 25;
			mesh.verticesNeedUpdate = true;
            group.name = name;
			group.add(mesh);
		}
	}
    
};

function addSensors(group){

	var geometryRasp = new THREE.BoxGeometry( 200, 1000, 600 );
	    //var materialRasp = new THREE.MeshLambertMaterial( {color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000} );
	    var materialRaspArray = [];
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/Rasp.png' ) }));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));

		var materialRasp = new THREE.MeshFaceMaterial(materialRaspArray);
			
	    var rasp = new THREE.Mesh( geometryRasp, materialRasp );
	    	rasp.position.set(-18500,5000,105000);
	    group.add(rasp);

	 var geometryRasp = new THREE.BoxGeometry( 1, 4000, 5000 );
	    //var materialRasp = new THREE.MeshLambertMaterial( {color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000} );
	    var materialRaspArray = [];
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/raspInfo.png' ), transparent: true, opacity: 0.7, color: 0x9999FF }));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));

		var materialRasp = new THREE.MeshFaceMaterial(materialRaspArray);
			
	    var rasp = new THREE.Mesh( geometryRasp, materialRasp );
	    	rasp.position.set(-19500,4300,108600);
	    group.add(rasp);

	    var geometryRasp = new THREE.BoxGeometry( 1, 2000, 4000 );
	    //var materialRasp = new THREE.MeshLambertMaterial( {color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000} );
	    var materialRaspArray = [];
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/simplelink.png' ), transparent: true, opacity: 0.7, color: 0x9999FF }));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));
			materialRaspArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000 } ));

		var materialRasp = new THREE.MeshFaceMaterial(materialRaspArray);
			
	    var rasp = new THREE.Mesh( geometryRasp, materialRasp );
	    	rasp.position.set(-19500,11000,100200);
	    group.add(rasp);   

	var positions = [{x: -18500,y: 9000,z: 100000},
					 /*{x: 9000, y: 2000,z: 36000},
					 {x: 20000,y: 2000,z: 23500},
					 {x: 5000, y: 2000,z: 23500},*/
					 {x: -18500,y: 9000,z: 68500},
					 {x: -52000,y: 9000,z: 99700},
					 {x: -51500,y: 9000,z: 67200}];

	for(var a = 0; a<positions.length; a++){
		var geometry3 = new THREE.BoxGeometry( 100, 400, 600 );
		var materialSensorArray = [];
		var material3 = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/sensortag-img-bluetooth.png' ), transparent: true, opacity: 0.9, color: 0xFF0000, ambient: 0xFF0000, emissive: 0xFF0000,specular: 0xFF0000} );
	    //var material3 = new THREE.MeshFaceMaterial(materialSensorArray);
	    var sphere3 = new THREE.Mesh( geometry3, material3 );
	    	sphere3.position.set(positions[a].x, positions[a].y, positions[a].z);
	    group.add(sphere3);

	    var indicatorOutGeometry = new THREE.BoxGeometry( 10, 500, 900 );
		var materialIndicatorOutArray = [];
		if(a>1){
			materialIndicatorOutArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/radioWave.gif' ), transparent: true, opacity: 0.7, color: 0x9999FF }));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
		}
		else {
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/radioWave.gif' ), transparent: true, opacity: 0.7, color: 0x9999FF }));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			materialIndicatorOutArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
		}
	    var materialIndicatorOut = new THREE.MeshFaceMaterial(materialIndicatorOutArray);
	    var indicatorOut = new THREE.Mesh( indicatorOutGeometry, materialIndicatorOut );
	    	indicatorOut.position.set(positions[a].x, positions[a].y+400, positions[a].z);
	    group.add(indicatorOut);
	}
 };

 function addCloud(){  

 	var textureX = THREE.ImageUtils.loadTexture( "images/textures/smartTV.png" );

    var spriteMaterial = new THREE.SpriteMaterial( 
        { map: textureX } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(6000,4000,4.0);
    sprite.position.set(-50000,283000,527800)

    scene.add(sprite);

    var textureX = THREE.ImageUtils.loadTexture( "images/textures/Mobile-Smartphone.png" );

    var spriteMaterial = new THREE.SpriteMaterial( 
        { map: textureX } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(4000,4000,4.0);
    sprite.position.set(-50000,283000,533000)

    scene.add(sprite);

 	var light = new THREE.PointLight( 0xffffff, 1 , 300000);
	    light.position.set(-50000, 290000, 600000);
	    scene.add(light);

	var lambdaGroup = new THREE.Group();

 	for (var t = 0; t<3; t++){//DYNAMO
	 	var geometry = new THREE.CylinderGeometry( 2000, 2000, 1000, 8 );
		var material = new THREE.MeshLambertMaterial( {color: 0x4444ff, ambient: 0x000000, emissive: 0x4444ff,specular: 0x000000} );
		var cylinder = new THREE.Mesh( geometry, material );
			cylinder.position.set(-50000,300000+(1500*t),530000);
		scene.add( cylinder );
	}

	for (var t = 0; t<3; t++){//LAMBDA
	 	var geometry = new THREE.CylinderGeometry( 1500, 1500, 700, 3 );
		var material = new THREE.MeshLambertMaterial( {color: 0xFF6600, ambient: 0x000000, emissive: 0xFF6600,specular: 0x000000} );
		var cylinder = new THREE.Mesh( geometry, material );
			cylinder.position.x  = 1800*t;
			cylinder.rotation.x = Math.PI;
			cylinder.rotation.z = Math.PI/2;
		lambdaGroup.add( cylinder );
	    }
	 lambdaGroup.position.set(-50000,290000,530000);
	 lambdaGroup.rotation.y = 1;

	scene.add( lambdaGroup );

 	var cloudGroup = new THREE.Group();

 	var geometry = new THREE.SphereGeometry( 150000, 10, 10 );
	var material = new THREE.MeshBasicMaterial( {color: 0xacacac, side:THREE.DoubleSide , transparent: true, opacity: 0.5 } );
	var sphere = new THREE.Mesh( geometry, material );

	    sphere.position.set(-70000, 250000, 500000);
	cloudGroup.add( sphere );

 	var cloudattr = [
 					{x: -50000,y: 300000,z: 500000, dx: 100,dy: 3000,dz: 3000, image: 'rules.png'},
 					{x: -48000,y: 305000,z: 530000, dx: 100,dy: 2000,dz: 8000, image: 'dynamodbimg.png'},
 					{x: -50000,y: 290000,z: 518000, dx: 100,dy: 2000,dz: 8000, image: 'lambda.png'},
 					{x: -50000,y: 290000,z: 500000, dx: 100,dy: 3000,dz: 3000, image: 'dShadow.png'}
 		];

 	for(var a = 0; a<cloudattr.length; a++){

 	 	var cloudGeometry = new THREE.BoxGeometry( cloudattr[a].dx, cloudattr[a].dy, cloudattr[a].dz );

		var cloudMaterialArray = [];
			cloudMaterialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/'+cloudattr[a].image ), transparent: true, opacity: 1, color: 0xFFFFFF }));
			cloudMaterialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			cloudMaterialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			cloudMaterialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			cloudMaterialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));
			cloudMaterialArray.push(new THREE.MeshLambertMaterial( { color: 0Xdbdbdb, ambient: 0x000000, emissive: 0Xdbdbdb,specular: 0x000000, transparent: true, opacity: 0 } ));

	    var cloudMaterial = new THREE.MeshFaceMaterial(cloudMaterialArray);
	    var cloud = new THREE.Mesh( cloudGeometry, cloudMaterial );
	    	cloud.scale.y = 2;
	    	cloud.scale.z = 2;
	    	cloud.position.set(cloudattr[a].x, cloudattr[a].y, cloudattr[a].z);

	    cloudGroup.add(cloud);	
 	}

	scene.add(cloudGroup);    
 }

 function addlineas() {

 	 var material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 2,
        linecap: 'round',
        transparent: true,
        opacity: 0.3
    });

 	 var geometry = new THREE.Geometry();
	     geometry.vertices.push(new THREE.Vector3(-18500,5000,105000));
	     geometry.vertices.push(new THREE.Vector3(-50000,270000,400000));
	     geometry.vertices.push(new THREE.Vector3(-50000,300000,500000));
	     geometry.vertices.push(new THREE.Vector3(-50000,300000,530000));
	     geometry.vertices.push(new THREE.Vector3(-50000,285000,530000));

	 var geometry2 = new THREE.Geometry();
	     geometry2.vertices.push(new THREE.Vector3(-50000,270000,400000));
	     geometry2.vertices.push(new THREE.Vector3(-50000,290000,500000));   

	 var line = new THREE.Line(geometry, material);
	 var line2 = new THREE.Line(geometry2, material);
	 
	 lineas.add(line);
	 lineas.add(line2);
	 lineas.name = 'cloudLineas';

	 scene.add(lineas);  
}
function addHumanlineas() {
	var textureGlass = THREE.ImageUtils.loadTexture( "images/textures/glass.png" );
	var spriteMaterialGlass = new THREE.SpriteMaterial( 
        { map: textureGlass } );
    var spriteGlass = new THREE.Sprite( spriteMaterialGlass );
    	spriteGlass.scale.set(1000,500,4.0);
    	spriteGlass.position.set(-51500,4000,88000)

    scene.add(spriteGlass);

    var textureWatch = THREE.ImageUtils.loadTexture( "images/textures/gear-live.png" );

    var spriteMaterialWatch = new THREE.SpriteMaterial( 
        { map: textureWatch } );
    var spriteWatch = new THREE.Sprite( spriteMaterialWatch );
    	spriteWatch.scale.set(1000,800,4.0);
    	spriteWatch.position.set(-51500,3000,85000)

    scene.add(spriteWatch);

 	 var material = new THREE.LineBasicMaterial({
        color: 0xFF0000,
        linewidth: 2,
        linecap: 'round',
        transparent: true,
        opacity: 0.3
    });

 	 var geometry = new THREE.Geometry();
	     geometry.vertices.push(new THREE.Vector3(-52000,3300,87100));
	     geometry.vertices.push(new THREE.Vector3(-52000,4000,88000));

	 var geometry2 = new THREE.Geometry();
	     geometry2.vertices.push(new THREE.Vector3(-51800,1800,86400));
	     geometry2.vertices.push(new THREE.Vector3(-52000,3000,85000));   

	 var line = new THREE.Line(geometry, material);
	 var line2 = new THREE.Line(geometry2, material);
	 
	 lineas.add(line);
	 lineas.add(line2);
	 lineas.name = 'humanLineas';

	 scene.add(lineas);  
}

function legendSystem(spriteDatas){
	var length = spriteDatas.length;

	for(var a = 0; a<length; a++){
		var spritey = makeTextSprite( spriteDatas[a].text, 
			{ 
				fontsize: spriteDatas[a].fontSize, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:spriteDatas[a].bgColor.r, g:spriteDatas[a].bgColor.g, b:spriteDatas[a].bgColor.b, a:spriteDatas[a].bgColor.a}, 
				color: spriteDatas[a].color,
				scale: spriteDatas[a].scale 
			});
		spritey.position.set(spriteDatas[a].x,spriteDatas[a].y,spriteDatas[a].z);
		legendGroup.add( spritey );
		}
	scene.add(legendGroup);	    
}

 function addStand(group){

	var materialPlasmaArray = [];
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));
		materialPlasmaArray.push(new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0Xdbdbdb, emissive: 0x000000,specular: 0Xdbdbdb } ));

	var materialPlasma = new THREE.MeshFaceMaterial(materialPlasmaArray);
 	var geomPlasma = new THREE.BoxGeometry(200,4200,6200);
	var plasma = new THREE.Mesh( geomPlasma, materialPlasma );
		plasma.position.set(-18600,4000,88000);
		//plasma.position.set(-213500,4000,90000);
	    group.add(plasma);


	 var texture2 = THREE.ImageUtils.loadTexture( "images/textures/standFront.png" );
		var material2 = new THREE.MeshLambertMaterial( { 
			color: 0xffffff, 
			ambient: 0xffffff,
	        emissive: 0xffffff,
	        specular: 0xffffff,
			map: texture2 
		} );

	var positions = [
		{x: -24000,y: 200,z: 97000},//suelo
		{x: -28000,y: 1500,z: 93000},//front
		{x: -19000,y: 3500,z: 99000}//back
	];
	var dimensions = [
		{x: 11000,y: 500,z: 10000},//suelo
		{x: 1500,y: 3000,z: 2000},//front
		{x: 1000,y: 8000,z: 8000}//back
	];
	for(var a = 0; a<positions.length; a++){
		if(a>0){
			var materialArray = [];
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0Xdbdbdb, emissive: 0x222222,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/standFront.png' ) }));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0Xdbdbdb, emissive: 0x222222,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0Xdbdbdb, emissive: 0x222222,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0Xdbdbdb, emissive: 0x222222,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0Xdbdbdb, emissive: 0x222222,specular: 0Xdbdbdb } ));
			var MovingCubeMat = new THREE.MeshFaceMaterial(materialArray);
		}
		else {
			var materialArray = [];
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x666666, ambient: 0Xdbdbdb, emissive: 0x666666,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x666666, ambient: 0Xdbdbdb, emissive: 0x666666,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/metal.jpg' ), transparent: true, opacity: 1, color: 0xFFFFFF }));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x666666, ambient: 0Xdbdbdb, emissive: 0x666666,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x666666, ambient: 0Xdbdbdb, emissive: 0x666666,specular: 0Xdbdbdb } ));
			materialArray.push(new THREE.MeshLambertMaterial( { color: 0x666666, ambient: 0Xdbdbdb, emissive: 0x666666,specular: 0Xdbdbdb } ));
			var MovingCubeMat = new THREE.MeshFaceMaterial(materialArray);
		}
			
		var MovingCubeGeom = new THREE.BoxGeometry( dimensions[a].x, dimensions[a].y, dimensions[a].z, 1, 1, 1, materialArray );
		var MovingCube = new THREE.Mesh( MovingCubeGeom, MovingCubeMat );
		MovingCube.position.set(positions[a].x, positions[a].y, positions[a].z);
	    group.add(MovingCube);
		}
 };


function addGuideLines(){
      var linematerial = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

    var linegeometry = new THREE.Geometry();
    linegeometry.vertices.push(
        new THREE.Vector3( 10000, 50, 0 ),
        new THREE.Vector3( 0, 50, 0 )
    );

    var line = new THREE.Line( linegeometry, linematerial );
    scene.add( line );

    var linematerial = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });

    var linegeometry = new THREE.Geometry();
    linegeometry.vertices.push(
        new THREE.Vector3( 0, 10050, 0 ),
        new THREE.Vector3( 0, 50, 0 )
    );

    var line = new THREE.Line( linegeometry, linematerial );
    scene.add( line );

    var linematerial = new THREE.LineBasicMaterial({
            color: 0xff0000
        });

    var linegeometry = new THREE.Geometry();
    linegeometry.vertices.push(
        new THREE.Vector3( 0, 50, 10000 ),
        new THREE.Vector3( 0, 50, 0 )
    );

    var line = new THREE.Line( linegeometry, linematerial );
    scene.add( line );
}

function addFloor(){

    var materialPlane = new THREE.MeshPhongMaterial({
                color: 0xaaaaaa,
                ambient: 0xBDBDBD,
                emissive: 0x555555,
                specular: 0xBDBDBD,
				/*shading: THREE.FlatShading,
				depthWrite: true,
				depthTest: true, */ 
                shininess: 40,
                transparent: true,
                opacity: 1
            });

    var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(250000, 105000), materialPlane);
	    plane.position.x = -140000;
	    plane.position.z = 80000;
	    plane.rotation.x = Math.PI / 2;
		plane.rotation.y = Math.PI;
    scene.add(plane);
}
function addAmbient(){

	 var buildingGroup = new THREE.Group();

	 var materialPlaneExtend = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/mapa4.png' ),color: 0xbdbdbd, ambient: 0xbdbdbd, emissive: 0Xccccff,specular: 0xbdbdbd } );

	 var planeExtend = new THREE.Mesh(new THREE.PlaneBufferGeometry(3500000, 3500000), materialPlaneExtend);
	     planeExtend.position.x = -200000;
	     planeExtend.position.z = -30000;
	     planeExtend.position.y = -1000;
	     planeExtend.rotation.x = Math.PI / 2;
		 planeExtend.rotation.y = Math.PI;
		 planeExtend.rotation.z =-1.66;
    buildingGroup.add(planeExtend);

    var buildingAttr = [{x: -60000, y: 1000, z: 170000, dx: 20000, dy: 30000, dz: 15000, rotate: 0},
    					{x: -90000, y: 1000, z: 170000, dx: 12000, dy: 50000, dz: 15000, rotate: 0},
    					{x:  75000, y: 20000, z: 15000, dx: 20000, dy: 60000, dz: 32000, rotate: -0.5},
    					{x:  1000, y: 20000, z: 15000, dx: 20000, dy: 40000, dz: 32000, rotate: 0}
    ];

    for(var a = 0; a<buildingAttr.length; a++){

	    var materialBuildingArray = [];
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xbbbbbb } ));
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ));
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xbbbbbb } ));
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ));
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xbbbbbb } ));
			materialBuildingArray.push(new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ));
		var materialBuilding = new THREE.MeshFaceMaterial(materialBuildingArray);

		var Structurebuilding = new THREE.BoxGeometry(buildingAttr[a].dx,buildingAttr[a].dy,buildingAttr[a].dz);
		var building = new THREE.Mesh( Structurebuilding, materialBuilding );
			building.position.set(buildingAttr[a].x,buildingAttr[a].y,buildingAttr[a].z);
			building.rotation.y = buildingAttr[a].rotate;
		buildingGroup.add(building);

    }

	scene.add(buildingGroup);
}


function drawDataGraph(idSensor) {

	if(currentSensor != idSensor){

		if(svg) $('svg').remove();

		var colores = {'Temperature': '#ff6666','humidity': '#6666ff','Iluminance': '#ffff66','Pressure': '#66ff66'};

		var cities = [{name:'Temperature', values: []},{name:'humidity', values: []},{name:'Iluminance', values: []},{name:'Pressure', values: []}];
		var temporalDate =  new Date().getHours()-10;
		var dataScale = [];

		$.post( "https://l8mqs9arfh.execute-api.eu-west-1.amazonaws.com/prod/sense-api", JSON.stringify({ "device":idSensor }) ).success(function(result){
			    console.log(result);
			    var conArray = result.Items.length;
			    for(var i = 0; i<conArray; i++){
			        if(temporalDate > 22 ) temporalDate = 0;
			        else temporalDate = temporalDate+1;
			    	dataScale.push(temporalDate);
			        cities[0].values.push({date: temporalDate, temperature: (parseFloat(result.Items[i].payload.reported.temperature)*100)/40 });
			        cities[1].values.push({date: temporalDate, temperature: parseFloat(result.Items[i].payload.reported.humidity) });
			        cities[2].values.push({date: temporalDate, temperature: (parseFloat(result.Items[i].payload.reported.lux)*100)/1400 });
			        cities[3].values.push({date: temporalDate, temperature: (parseFloat(result.Items[i].payload.reported.pressure)*100)/1200 });
			    }
		console.log('datos: ', cities);	    
		document.getElementById("specificTemp").innerHTML = ((cities[0].values[9].temperature*40)/100).toFixed(1)+'°C';
		document.getElementById("specificHum").innerHTML = cities[1].values[9].temperature+'%';
		document.getElementById("specificLux").innerHTML = ((cities[2].values[9].temperature*1400)/100).toFixed(1)+'L';
		document.getElementById("specificPress").innerHTML = ((cities[3].values[9].temperature*1200)/100).toFixed(1)+'N'; 

		var margin = {top: 20, right: 80, bottom: 30, left: 20},
		    width = 400 - margin.left - margin.right,
		    height = 150 - margin.top - margin.bottom;

		var x = d3.scale.linear()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var color = d3.scale.category10();

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.temperature); });

		svg = d3.select("#graph").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr('id','dataGraphD3')
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		  x.domain(d3.extent(dataScale, function(d) { return d; }));

		  y.domain([
		    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
		    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
		  ]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .style("stroke", "#fff")
		      .call(xAxis);

		  var city = svg.selectAll(".city")
		      .data(cities)
		    .enter().append("g")
		      .attr("class", "city");

		  city.append("path")
		      .attr("class", "line")
		      .attr("d", function(d) { return line(d.values); })
		      .style("stroke", function(d) { return colores[d.name]; });

		  city.append("text")
		      .attr("class", "Textline")
		      .style("stroke", "#fff")
		      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
		      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
		      .attr("x", 3)
		      .attr("dy", ".35em")
		      .text(function(d) { return d.name; });
		});
		currentSensor = idSensor;
	}
}

function lookVisor(position, rotation){

	if(!scene.getObjectByName( "visor" )){

	    var lookGroup = new THREE.Group();

	    var material = new THREE.MeshLambertMaterial(  { color: 0XFFFF44, ambient: 0XFFFF44, emissive: 0XFFFF44,specular: 0XFFFF44, transparent: true, opacity: 0.5 } );
	    circunference = new THREE.Mesh( new THREE.RingGeometry( 700, 800, 30, 1, 0, Math.PI * 2 ), material );

	    lookGroup.add( circunference );
	    for (var a = 0; a<3; a++){
		    var material = new THREE.MeshLambertMaterial(  { color: 0XFFFF00, ambient: 0XFFFF00, emissive: 0XFFFF00,specular: 0XFFFF00, transparent: true, opacity: 1 } );
		    circunference = new THREE.Mesh( new THREE.RingGeometry( 600, 900, 30, 1, a*2, 0.1 ), material );
		    lookGroup.add( circunference );
	    }

	    lookGroup.position.set( position.x,position.y,position.z );
	    lookGroup.rotation.y = rotation;
	    lookGroup.scale.x = 1;
	    lookGroup.scale.y = 1;
	    lookGroup.scale.z = 1;
	    lookGroup.name = 'visor';

	    scene.add(lookGroup);

	    setInterval(function() {
	        lookGroup.scale.set(1,1,1);
	        var scaleValue = 1.2;
	         movement(scaleValue,scaleValue,1, lookGroup.scale, 0, 400);
	      }, 450);
	}
}

function createACtionZones(){

	var positions = [{x: -18500,y: 2000,z: 100000},
					 {x: -18500,y: 2500,z: 68500},
					 {x: -52000,y: 3000,z: 99700},
					 {x: -51500,y: 3500,z: 67200}];

	//var zoneColors = ['#ff6666','#6666ff','#ffff66','#66ff66'];	
	var zoneColors = [{r: 1,g: 0.5,b: 0.5},{r: 0.5,g: 0.5,b: 1},{r: 1,g: 1,b: 0.5},{r: 0.5,g: 1,b: 0.5}];				 

	var numSensors = positions.length;

		console.log('Creatin zone group');

		zoneGroup = new THREE.Group();

		for(var a = 0;a<numSensors; a++){

			if( a > 1 ){ var startAngle = 0; var endAngles = Math.PI * 2;}	

			else { var startAngle = (Math.PI)/2; var endAngles = Math.PI; }

		    var materialsensorZone = new THREE.MeshBasicMaterial(  { color: 0xAAAAAA, transparent: true, opacity: 0.5 } );

		    var sensorZone = new THREE.Mesh( new THREE.RingGeometry( 0, 23000, 30, 1, startAngle, endAngles ), materialsensorZone );

		    sensorZone.position.set(positions[a].x,positions[a].y,positions[a].z);
		    sensorZone.rotation.x = (3*Math.PI)/2;
		    sensorZone.scale.x = 0;
		    sensorZone.scale.y = 0;
		    sensorZone.scale.z = 0;
		    sensorZone.name = 'sensorZone';

		    zoneGroup.add(sensorZone);
		}

		scene.add(zoneGroup);
}

function sensorZoneAction(){

	var positions = [{x: -18500,y: 2000,z: 100000},
					 {x: -18500,y: 2500,z: 68500},
					 {x: -52000,y: 3000,z: 99700},
					 {x: -51500,y: 3500,z: 67200}];

	//var zoneColors = ['#ff6666','#6666ff','#ffff66','#66ff66'];	
	var zoneColors = [{r: 1,g: 0.5,b: 0.5},{r: 0.5,g: 0.5,b: 1},{r: 1,g: 1,b: 0.5},{r: 0.5,g: 1,b: 0.5}];				 

	var numSensors = positions.length;

		console.log('Creatin zone group');

		var material1 = new THREE.MeshBasicMaterial(  { color: 0xAAAAAA, transparent: true, opacity: 1 } );

		circunference1 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, (Math.PI)/2,  Math.PI ), material1 );

		circunference1.position.set(positions[0].x,positions[0].y+500,positions[0].z);
		circunference1.rotation.x = (3*Math.PI)/2;
		circunference1.scale.x = 1;
		circunference1.scale.y = 1;
		circunference1.scale.z = 1;
		circunference1.name = 'sensorZoneAnimation';
		scene.add( circunference1 );

		circunference2 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, (Math.PI)/2,  Math.PI ), material1 );

		circunference2.position.set(positions[1].x,positions[1].y+500,positions[1].z);
		circunference2.rotation.x = (3*Math.PI)/2;
		circunference2.scale.x = 1;
		circunference2.scale.y = 1;
		circunference2.scale.z = 1;
		circunference2.name = 'sensorZoneAnimation';
		scene.add( circunference2 );

		circunference3 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		circunference3.position.set(positions[2].x,positions[2].y+500,positions[2].z);
		circunference3.rotation.x = (3*Math.PI)/2;
		circunference3.scale.x = 1;
		circunference3.scale.y = 1;
		circunference3.scale.z = 1;
		circunference3.name = 'sensorZoneAnimation';
		scene.add( circunference3 );

		circunference4 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		circunference4.position.set(positions[3].x,positions[3].y+500,positions[3].z);
		circunference4.rotation.x = (3*Math.PI)/2;
		circunference4.scale.x = 1;
		circunference4.scale.y = 1;
		circunference4.scale.z = 1;
		circunference4.name = 'sensorZoneAnimation';
		scene.add( circunference4 );

		console.log(zoneGroup.children);

		for(var i = 0;i<zoneGroup.children.length; i++){
			var tween = new TWEEN.Tween(zoneGroup.children[i].scale).to({
		            x: 1,
		            y: 1,
		            z: 1
	          },1000).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function () {
	          }).delay(2000).start();
		}
		    
		myTimersetInterval = setInterval(function() {
				if(colorCount == 0) { $(".valueIndicator").removeClass('show').addClass('hide'); $("#temp").removeClass('hide').addClass('show');}
				else if(colorCount == 1) {$(".valueIndicator").removeClass('show').addClass('hide'); $("#hum").removeClass('hide').addClass('show');}
				else if(colorCount == 2){$(".valueIndicator").removeClass('show').addClass('hide'); $("#lux").removeClass('hide').addClass('show');}
				else if(colorCount == 3){$(".valueIndicator").removeClass('show').addClass('hide'); $("#press").removeClass('hide').addClass('show');}

				for(var i = 0;i<zoneGroup.children.length; i++){
						zoneGroup.children[i].material.color.setRGB(zoneColors[colorCount].r,zoneColors[colorCount].g,zoneColors[colorCount].b);
					}
				circunference1.material.color.setRGB(zoneColors[colorCount].r,zoneColors[colorCount].g,zoneColors[colorCount].b);
				circunference2.material.color.setRGB(zoneColors[colorCount].r,zoneColors[colorCount].g,zoneColors[colorCount].b);
				circunference3.material.color.setRGB(zoneColors[colorCount].r,zoneColors[colorCount].g,zoneColors[colorCount].b);
				circunference4.material.color.setRGB(zoneColors[colorCount].r,zoneColors[colorCount].g,zoneColors[colorCount].b);

			    circunference1.scale.set(230,230,230);
				circunference2.scale.set(230,230,230);
				circunference3.scale.set(230,230,230);
				circunference4.scale.set(230,230,230);
			    var scaleValue = 1;
			    movement(scaleValue,scaleValue,1, circunference1.scale, 0, 6000);
			    movement(scaleValue,scaleValue,1, circunference2.scale, 0, 6000);
			    movement(scaleValue,scaleValue,1, circunference3.scale, 0, 6000);
				movement(scaleValue,scaleValue,1, circunference4.scale, 0, 6000);

				if(colorCount<3) colorCount = colorCount +1;
				else colorCount = 0;
			 }, 6500);
	/*else {
		 for(var i = 0;i<zoneGroup.children.length; i++){
            var tween = new TWEEN.Tween(zoneGroup.children[i].scale).to({
                    x: 1,
                    y: 1,
                    z: 1
            },500).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function () {
          }).delay(0).start();
        }    
		setInterval(function() {
		    circunference1.scale.set(230,230,230);
			circunference2.scale.set(230,230,230);
			circunference3.scale.set(230,230,230);
			circunference4.scale.set(230,230,230);
			    var scaleValue = 1;
			     movement(scaleValue,scaleValue,1, circunference1.scale, 0, 5000);
			     movement(scaleValue,scaleValue,1, circunference2.scale, 0, 5000);
			     movement(scaleValue,scaleValue,1, circunference3.scale, 0, 5000);
				 movement(scaleValue,scaleValue,1, circunference4.scale, 0, 5000);
			 }, 8050);
	}*/
}

function addLights(){

	var lightsGroup = new THREE.Group();

	var geometry = new THREE.BoxGeometry( 1000, 1000, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	var sphere = new THREE.Mesh( geometry, material );
	    //sphere.position.set(-290000, 2000, 160000);
	    sphere.position.set(-55000,9000,130000);
	lightsGroup.add( sphere );
	     /// direct light
	var light = new THREE.PointLight( 0xff9900, 1 , 80000);
	  	light.position.set(-55000,9000,130000);
	    	/*light.castShadow = true;
			light.shadowCameraNear = 1;
			light.shadowCameraFar = 30;
			// pointLight.shadowCameraVisible = true;
			light.shadowMapWidth = 2048;
			light.shadowMapHeight = 1024;
			light.shadowBias = 0.01;
			light.shadowDarkness = 0.5;*/
	lightsGroup.add(light);

	var lightPositions = {x: -35000,y: 200,z: 52000};
	var lightColor = 0x4444FF;
	var lightDistance = 30000;
	var lightSphere = 400;

	for(var a = 0; a<6; a++){
	    var light = new THREE.PointLight( lightColor, 1 , lightDistance);
	    light.position.set(lightPositions.x-(20000*a), lightPositions.y+11000, lightPositions.z-2000);
	    lightsGroup.add(light);
	}
	for(var a = 0; a<2; a++){
	    var light = new THREE.PointLight( 0xff9900, 1 , 10000);
	    light.position.set(-25000-(15000*a), lightPositions.y+16000, lightPositions.z+4000);
	    lightsGroup.add(light);
	}
  scene.add(lightsGroup);	
}
function addComunicationLights(){

	sphereComunicationGroup = new THREE.Group();
	lightsComunicationGroup = new THREE.Group();

	var lightPositions = {x: -53000,y: 9000,z: 67200};
	var lightDistance = 10000;
	var lightSphere = 400;
	var lightColors = ['#ff6666','#6666ff','#ffff66','#66ff66'];

	for(var a = 0; a<lightColors.length; a++){
	    var geometry = new THREE.SphereGeometry( lightSphere, lightSphere, 15 );
	    var material = new THREE.MeshBasicMaterial( { color: lightColors[a] });
	    //var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/textures/spark.png' ), transparent: true, opacity: 0.5, color: lightColors[a] });
	    var sphere = new THREE.Mesh( geometry, material );

	    sphere.position.set(lightPositions.x, lightPositions.y, lightPositions.z);
	    sphereComunicationGroup.add( sphere );

	    var light = new THREE.PointLight( lightColors[a], 1 , lightDistance);
	    light.position.set(lightPositions.x, lightPositions.y, lightPositions.z);
	    lightsComunicationGroup.name = 'comunicationLights';
	    lightsComunicationGroup.add(light);
	}

  	scene.add(lightsComunicationGroup);
  	scene.add(sphereComunicationGroup);	
}
function moveComunicationLigths(position, origin){
	if(origin) {
		for(var i = 0; i<lightsComunicationGroup.children.length;i++){
			lightsComunicationGroup.children[i].position.set(origin.x,origin.y,origin.z);
			sphereComunicationGroup.children[i].position.set(origin.x,origin.y,origin.z);
		}
	}
	for(var i = 0; i<lightsComunicationGroup.children.length;i++){
		movement(position.x,position.y,position.z, lightsComunicationGroup.children[i].position, 400*i, 2000);
		movement(position.x,position.y,position.z, sphereComunicationGroup.children[i].position, 400*i, 2000);
	}	
}

function addUbiqons(){

	 var material = new THREE.LineBasicMaterial({
        color: 0x33cc33,
        linewidth: 2,
        linecap: 'round',
        transparent: true,
        opacity: 0.3
    });

 	 var geometry = new THREE.Geometry();
	     geometry.vertices.push(new THREE.Vector3(-52000, 11000, 67200));
	     geometry.vertices.push(new THREE.Vector3(-52000, 15000, 87000));
	     geometry.vertices.push(new THREE.Vector3(-52000, 4000, 88000));

	 var geometry2 = new THREE.Geometry();
	     geometry2.vertices.push(new THREE.Vector3(-52000, 11000, 99500));
	     geometry2.vertices.push(new THREE.Vector3(-52000, 15000, 87000)); 
	     geometry2.vertices.push(new THREE.Vector3(-52000, 3000, 85000));

	 var geometry3 = new THREE.Geometry();
	     geometry3.vertices.push(new THREE.Vector3(-19500, 13000, 100000));
	     geometry3.vertices.push(new THREE.Vector3(-52000, 15000, 87000)); 

	 var geometry4 = new THREE.Geometry();
	     geometry4.vertices.push(new THREE.Vector3(-19500, 11000, 68500));
	     geometry4.vertices.push(new THREE.Vector3(-52000, 15000, 87000));   

	 var line = new THREE.Line(geometry, material);
	 var line2 = new THREE.Line(geometry2, material);
	 var line3 = new THREE.Line(geometry3, material);
	 var line4 = new THREE.Line(geometry4, material);
	 
	 scene.add(line);
	 scene.add(line2);
	 scene.add(line3);
	 scene.add(line4);

	var spritey = makeTextSprite( 'Ibeacon', 
			{ 
				fontsize: 40, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:255, g:255, b:255, a:0}, 
				color: '#33cc33',
				scale: { x: 6000, y: 3000 } 
			});
	spritey.position.set(-50000,11000,65200);
	scene.add( spritey );

	var spritey = makeTextSprite( 'Ibeacon', 
			{ 
				fontsize: 40, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:255, g:255, b:255, a:0}, 
				color: '#33cc33',
				scale: { x: 6000, y: 3000 } 
			});
	spritey.position.set(-50000,11000,97500);
	scene.add( spritey );

	var spritey = makeTextSprite( 'Ibeacon', 
			{ 
				fontsize: 40, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:255, g:255, b:255, a:0}, 
				color: '#33cc33',
				scale: {  x: 6000, y: 3000 } 
			});
	spritey.position.set(-20500,13000,100000);
	scene.add( spritey );

	var spritey = makeTextSprite( 'Ibeacon', 
			{ 
				fontsize: 40, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:255, g:255, b:255, a:0}, 
				color: '#33cc33',
				scale: {  x: 6000, y: 3000 } 
			});
	spritey.position.set(-20500,11000,68500);
	scene.add( spritey );

    var textureX = THREE.ImageUtils.loadTexture( "images/textures/ubiqons.png" );

    var spriteMaterial = new THREE.SpriteMaterial( 
        { map: textureX } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(8000,4000,4.0);
    sprite.position.set(-52000,15000,87000)

    scene.add(sprite);

	var ubPositions = [{x: -52000, y: 11000, z: 67200},{x: -52000, y: 11000, z: 99500},{x: -19500, y: 13000, z: 100000}, {x: -19500, y: 11000, z: 68500}];
	for(var a = 0; a<ubPositions.length; a++){
		    var ubgeometry = new THREE.SphereGeometry( 400, 400, 5 );
		    var ubmaterial = new THREE.MeshBasicMaterial( { color: '#338855' });
		    var ubsphere = new THREE.Mesh( ubgeometry, ubmaterial );
		    ubsphere.position.set(ubPositions[a].x, ubPositions[a].y, ubPositions[a].z);
		  scene.add(ubsphere);  
		}

	/*var material1 = new THREE.MeshBasicMaterial(  { color: 0xAAAAAA, transparent: true, opacity: 0.6 } );

		var ubcircunference1 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		ubcircunference1.position.set(-52000,12000,99500);
		ubcircunference1.rotation.x = (3*Math.PI)/2;
		ubcircunference1.scale.x = 1;
		ubcircunference1.scale.y = 1;
		ubcircunference1.scale.z = 1;
		scene.add( ubcircunference1 );

		var ubcircunference2 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		ubcircunference2.position.set(-52000, 12000, 67200 );
		ubcircunference2.rotation.x = (3*Math.PI)/2;
		ubcircunference2.scale.x = 1;
		ubcircunference2.scale.y = 1;
		ubcircunference2.scale.z = 1;
		scene.add( ubcircunference2 );

		var ubcircunference3 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		ubcircunference3.position.set(-19500,13000,100000);
		ubcircunference3.rotation.x = (3*Math.PI)/2;
		ubcircunference3.scale.x = 1;
		ubcircunference3.scale.y = 1;
		ubcircunference3.scale.z = 1;
		scene.add( ubcircunference3 );

		var ubcircunference4 = new THREE.Mesh( new THREE.RingGeometry( 95, 100, 30, 1, 0, Math.PI * 2 ), material1 );

		ubcircunference4.position.set(-19500,12000,68500 );
		ubcircunference4.rotation.x = (3*Math.PI)/2;
		ubcircunference4.scale.x = 1;
		ubcircunference4.scale.y = 1;
		ubcircunference4.scale.z = 1;
		scene.add( ubcircunference4 );

		setInterval(function() {
			    ubcircunference1.scale.set(1,1,1);
				ubcircunference2.scale.set(1,1,1);
				ubcircunference3.scale.set(1,1,1);
				ubcircunference4.scale.set(1,1,1);
			    var scaleValue = 120;
			    movement(scaleValue,scaleValue,1, ubcircunference1.scale, 0, 500);
			    movement(scaleValue,scaleValue,1, ubcircunference2.scale, 0, 500);
			    movement(scaleValue,scaleValue,1, ubcircunference3.scale, 0, 500);
				movement(scaleValue,scaleValue,1, ubcircunference4.scale, 0, 500);
			 }, 500);*/	
}