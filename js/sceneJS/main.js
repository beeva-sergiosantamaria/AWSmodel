'use strict';

var datas = [{name:'Temperature', values: []},{name:'humidity', values: []},{name:'Iluminance', values: []}];
var temporalDate =  new Date().getHours()-10;

if( window.innerHeight == screen.height-30) { 
	console.log('pantalla completa');
}

/*$.post( "https://l8mqs9arfh.execute-api.eu-west-1.amazonaws.com/prod/sense-api", JSON.stringify({ "device":"b0b448b86b06" }) ).success(function(result){;
    console.log(result);
    var conArray = result.Items.length;
    for(var i = 0; i<conArray; i++){
        if(temporalDate > 22 ) temporalDate = 0;
        else temporalDate = temporalDate+1;
        datas[0].values.push({date: temporalDate, temperature: parseFloat(result.Items[i].payload.reported.temperature) });
        datas[1].values.push({date: temporalDate, temperature: parseFloat(result.Items[i].payload.reported.humidity) });
        datas[2].values.push({date: temporalDate, temperature: parseFloat(result.Items[i].payload.reported.lux) });
    }
    console.log(datas);
});*/

init();
animate();

function init() {
   
    scene = new THREE.Scene();
    var cube;
    var zNear = 1000;
    var zFar = 1000000;
    camera = new THREE.PerspectiveCamera(
        100, window.innerWidth / window.innerHeight, zNear, zFar);

    //camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000000);



    camera.position.set(-43000, 141700, 177000);
    scene.add(camera);

    var container = document.getElementById('containerMap');

    groupPlanta1 = new THREE.Group();
    groupBaths = new THREE.Group();
    groupPasillo = new THREE.Group();
    groupBaranCristal = new THREE.Group();
    groupBaranPared = new THREE.Group();
    sensorGroup = new THREE.Group();
    standGroup = new THREE.Group();

    //addGuideLines();

    scene.add(groupPlanta1);
    scene.add(groupBaths);
    scene.add(groupPasillo);
    scene.add(groupBaranCristal);
    scene.add(groupBaranPared);
    scene.add(sensorGroup);
    scene.add(standGroup);

    addGeoObject(groupPlanta1, planta1, 20000, 0, 'estructura');
    addGeoObject(groupBaths, baths, 7000, 0, 'banios');
    addGeoObject(groupPasillo, pasilloSup, 2000, 7000, 'pasillo');
    addGeoObject(groupBaranCristal, baranCristal, 2500, 9000, 'cristal');
    addGeoObject(groupBaranPared, baranPared, 12450, 9000, 'pared');
    addStand(standGroup);
    addSensors(sensorGroup);
    addComunicationLights();
    addCloud();
    addAmbient();
    addUbiqons();
    addLights();3

    //------HUMAN MODEL --------------

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var loader = new THREE.OBJMTLLoader();
        loader.load( 'modelos/male02/male02.obj', 'modelos/male02/male02_dds.mtl', function ( object ) {
        object.rotation.y = Math.PI / 2;
        object.position.set(-52000,0,87000);
        object.scale.x = 19;
        object.scale.y = 19;
        object.scale.z = 19;
      scene.add( object );
    });  

    //---------VIDEO -----------------

    video = document.createElement( 'video' );
    video.id = 'video';
    video.src = "videos/Prototipo-Visualizacióndedatos3D-tXJzQH6z1wY.mp4";
    video.load();
    
    videoImage = document.createElement( 'canvas' );
    videoImage.width = 1280;
    videoImage.height = 720;

    videoImageContext = videoImage.getContext( '2d' );

    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

    videoTexture = new THREE.Texture( videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    
    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );

    var movieGeometry = new THREE.PlaneGeometry( 6000, 4000, 400, 4 );
    var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    movieScreen.position.set(-18800,4000,88000);
    movieScreen.rotation.y = (3*Math.PI)/2;
    standGroup.add(movieScreen);
   
   //---------------END VIDEO --------------------- 

    document.body.appendChild(container);

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMapEnabled = true;
    renderer.setClearColor(0x0B173B);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    addFloor();

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.target.set( -145000, 0, 80000 );

    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    container.appendChild(renderer.domElement);


document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener('resize', onWindowResize, false);
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
};
function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

};
function render() {

    renderer.render( scene, camera );
    if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
         {
    videoImageContext.drawImage( video, 0, 0 );
    if ( videoTexture ) 
        videoTexture.needsUpdate = true;
         }
        //composer.render();
};

function animate() {

		requestAnimationFrame( animate );
        TWEEN.update();

		render();     
        update();

		if(controls) controls.update( clock.getDelta() );

};
function update()
{
    //console.log(camera.position);
    if ( keyboard.pressed("p") )     { video.play(); }//play video
    if ( keyboard.pressed("space") ) { video.pause(); }//pause video
    if ( keyboard.pressed("s") )     { video.pause(); video.currentTime = 0; }//stop video    
    if ( keyboard.pressed("r") )     { video.currentTime = 0; }//rewind video
    if ( keyboard.pressed("0") )     { step(0); generaInterval=0; }//GENERAL VIEW    
    if ( keyboard.pressed("1") )     { step(1); generaInterval=1; }//MOVE TO SENSOR 01
    if ( keyboard.pressed("2") )     { step(2); generaInterval=2; }//MOVE TO SENSOR 04
    if ( keyboard.pressed("3") )     { step(3); generaInterval=3; }//HALL PANORAMIC 
    if ( keyboard.pressed("4") )     { step(4); generaInterval=4; }//RASP
    if ( keyboard.pressed("5") )     { step(5); generaInterval=5; }//COMUNICATION   
    if ( keyboard.pressed("6") )     { step(6); generaInterval=6; } //RASP 2  
    if ( keyboard.pressed("7") )     { step(7); generaInterval=7;}//CLOUD PANORAMIC  
    if ( keyboard.pressed("8") )     { step(8); generaInterval=8;}//HUMAN  
    if ( keyboard.pressed("9") )     { step(13); }//TV   

    /*if ( keyboard.pressed("2") )
        {
            deleteSensor();
            if(!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -19000,y: 9000,z: 68500}, (3*Math.PI)/2), 4000);
            else { scene.getObjectByName( "visor" ).position.set(-19000,9000,68500); ; scene.getObjectByName( "visor" ).rotation.y = (3*Math.PI)/2; }
            drawDataGraph('b0b448bf3285');
            setTimeout(deleteInfo, 0); 
            setTimeout(addInfo, 2000);
            document.getElementById("title").innerHTML = 'Hall Sensor'
            movement(-18500,9000,68500, controls.target, 0);
            movement(-28500,9000,68500, camera.position, 100, 2000);
            video.pause();
        }

    if ( keyboard.pressed("3") )
        {
            deleteSensor();
            if(!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -51800,y: 9000,z: 99700}, Math.PI/2), 4000);
            else  { scene.getObjectByName( "visor" ).position.set(-51800,9000,99700); scene.getObjectByName( "visor" ).rotation.y = Math.PI/2;}
            drawDataGraph('b0b448bf3506');
            setTimeout(deleteInfo, 0); 
            setTimeout(addInfo, 2000);
            document.getElementById("title").innerHTML = 'Central Sensor'
            movement(-52000,9000,99700, controls.target, 0);
            movement(-42000,9000,99700, camera.position, 100, 2000);
            video.pause();
        }*/
}


function step(num){
    switch ( num ) {
            case 0:
                removeIndicatorsValues()         
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                setTimeout(deleteInfo, 0); 
                deleteSensor();
                movement(-145000, 0, 80000, controls.target, 0);
                movement(-43000, 141700, 177000, camera.position, 100, 2000);
                video.pause();
                break;
            case 1:
                removeIndicatorsValues()
                var leters = [
                   {x: -20500,y: 9500,z: 100000, text: 'BlueTooth', color: '#6666FF', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 4000, y: 2000 }, fontSize: 40},
                    {x: -20500,y: 7500,z: 99000, text: 'simpleLink SensorTag', color: '#ff6666', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 3700, y: 2200 }, fontSize: 28}
                ]
                RemoveLetters();
                legendSystem(leters);          
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                var current = currentDate();
                deleteSensor();
                if(!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -19000,y: 9000,z: 100000}, (3*Math.PI)/2), 4000);
                else  { scene.getObjectByName( "visor" ).position.set(-19000,9000,100000); scene.getObjectByName( "visor" ).rotation.y = (3*Math.PI)/2;}    
                drawDataGraph('b0b448bf4186');
                setTimeout(deleteInfo, 0); 
                setTimeout(addInfo, 2000);
                document.getElementById("title").innerHTML = 'Stand Sensor';
                document.getElementById("current").innerHTML = current;
                movement(-18500,9000,100000, controls.target, 0);
                movement(-28500,9000,100000, camera.position, 100, 2000);
                video.pause();
                break;
            case 2: 
                deleteSensor();
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                if    (!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -51700,y: 9000,z: 67200}, Math.PI/2), 4000);
                else  { scene.getObjectByName( "visor" ).position.set(-51700,9000,67200); scene.getObjectByName( "visor" ).rotation.y = Math.PI/2;}
                drawDataGraph('b0b448d05d01');
                setTimeout(deleteInfo, 0); 
                setTimeout(addInfo, 2000);
                document.getElementById("title").innerHTML = 'Door Sensor'
                movement(-51500,9000,67200, controls.target, 0);
                movement(-41500,9000,67200, camera.position, 100, 2000);
                video.pause();
                break;
            case 3:
                removeIndicatorsValues()
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                setTimeout(deleteInfo, 0); 
                movement(-32000,0,97000, controls.target, 0);
                movement(-29000,37000,111000, camera.position, 100, 1000);
                setTimeout(sensorZoneAction, 0); 
                video.pause();
                break;
            case 4:
                removeIndicatorsValues()
                var leters = [
                    {x: -20500,y: 4700,z: 108000, text: '    Raspberry PI   ', color: '#cccccc', bgColor: {r:200, g:70, b:70, a:0.8},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 2600,z: 108000, text: '    Resin.IO           ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 3300,z: 108000, text: '    AWS IoT           ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 4000,z: 108000, text: '    Device SDK    ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35}
                ]
                legendSystem(leters);
                if(!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -18500,y: 5000,z: 105000}, (3*Math.PI)/2), 4000);
                else  { scene.getObjectByName( "visor" ).position.set(-18500,5000,105000); scene.getObjectByName( "visor" ).rotation.y = (3*Math.PI)/2;}
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                deleteSensor();
                setTimeout(deleteInfo, 0); 
                movement(-18500,5000,105000, controls.target, 0);
                movement(-28500,5000,105000, camera.position, 100, 2000);
                video.pause();
                break;
            case 5:
                removeIndicatorsValues()
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);  
                movement(-32000,0,97000, controls.target, 0);
                movement(-34000,10900,110000, camera.position, 100, 1000);
                deleteSensor();
                setTimeout(function(){moveComunicationLigths({x: -18500,y: 5000,z: 105000},{x: -53000,y: 9000,z: 67200})}, 1500);
                myTimersetInterval = setInterval(function() {
                    setTimeout(function(){moveComunicationLigths({x: -18500,y: 5000,z: 105000},{x: -53000,y: 9000,z: 67200})}, 1000);
                 }, 3500);
                break; 
            case 6:
                removeIndicatorsValues()
                var leters = [
                    {x: -20500,y: 4700,z: 108000, text: '    Raspberry PI   ', color: '#cccccc', bgColor: {r:200, g:70, b:70, a:0.8},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 2600,z: 108000, text: '    Resin.IO           ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 3300,z: 108000, text: '    AWS IoT           ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35},
                    {x: -20500,y: 4000,z: 108000, text: '    Device SDK    ', color: '#cccccc', bgColor: {r:70, g:70, b:70, a:0.5},  scale:{ x: 4000, y: 2000 }, fontSize: 35}
                ]
                legendSystem(leters);   
                if(!scene.getObjectByName( "visor" )) setTimeout(lookVisor({x: -18500,y: 5000,z: 105000}, (3*Math.PI)/2), 4000);
                else  { scene.getObjectByName( "visor" ).position.set(-18500,5000,105000); scene.getObjectByName( "visor" ).rotation.y = (3*Math.PI)/2;}
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                deleteSensor();
                setTimeout(deleteInfo, 0); 
                movement(-18500,5000,105000, controls.target, 0);
                movement(-28500,5000,105000, camera.position, 100, 2000);
                video.pause();
                break; 
            case 7:
                removeIndicatorsValues()
                var leters = [
                   {x: -50000,y: 295000,z: 488000, text: 'MQTT protocol', color: '#6666ff', bgColor: {r:255, g:100, b:100, a:0}, scale:{ x: 8000, y: 4000}, fontSize: 40 },
                   {x: -50000,y: 287000,z: 488000, text: 'MQTT protocol', color: '#6666ff', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 8000, y: 4000 }, fontSize: 40},
                   {x: -50000,y: 280000,z: 530000, text: '((  API REST  ))', color: '#FFFF66', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 20000, y: 10000 }, fontSize: 40},
                   {x: -50000,y: 285000,z: 500000, text: 'Device Shadow', color: '#66FF99', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 8000, y: 4000 }, fontSize: 40},
                   {x: -50000,y: 299000,z: 515000, text: 'INSERT', color: '#FF9966', bgColor: {r:255, g:100, b:100, a:0},  scale:{ x: 8000, y: 4000 }, fontSize: 40}
                ]
                RemoveLetters();
                legendSystem(leters); 
                addlineas();
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                movement(-39000, 295000,513500, controls.target, 0);
                movement(-37000, 295000,513500, camera.position, 100, 2000);
                deleteSensor();
                deleteSensor();
                setTimeout(moveComunicationLigths({x: -50000,y: 300000,z: 500000}), 0);

                setTimeout(function(){moveComunicationLigths({x: -50000,y: 300000,z: 500000},{x: -50000,y: 270000,z: 400000})}, 2000);
                setTimeout(function(){moveComunicationLigths({x: -50000,y: 300000,z: 530000})}, 5500);
                setTimeout(function(){moveComunicationLigths({x: -50000,y: 290000,z: 530000})}, 9000);
                myTimersetInterval = setInterval(function() {
                    setTimeout(function(){moveComunicationLigths({x: -50000,y: 300000,z: 500000},{x: -50000,y: 270000,z: 400000})}, 1000);
                    setTimeout(function(){moveComunicationLigths({x: -50000,y: 300000,z: 530000})}, 4500);
                    setTimeout(function(){moveComunicationLigths({x: -50000,y: 290000,z: 530000})}, 8000);
                 }, 10500);
                break;
            case 8:
                removeIndicatorsValues()
                addHumanlineas();
                if(myTimersetInterval != 0) clearInterval(myTimersetInterval);
                deleteSensor();
                setTimeout(deleteInfo, 0); 
                movement(-52000,2000,87000, controls.target, 0);
                movement(-49000,3700,88110, camera.position, 100, 2000);
                break;              
        }
}

generaInterval = setInterval(function() {
                    step(currentVideoStep);
                    if(currentVideoStep<8) currentVideoStep = currentVideoStep + 1;
                    else currentVideoStep = 0;
                 }, 20000);