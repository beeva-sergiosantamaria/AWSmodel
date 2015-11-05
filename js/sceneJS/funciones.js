'use strict';  

function onDocumentMouseDown( event ) 
{
    raycaster.setFromCamera( mouse, camera );   
    var intersects = raycaster.intersectObjects( scene.children[4].children );

    switch ( event.button ) {
            case 0: // left 
              
                break;
            case 1: // middle
                break;
            case 2: // right
                break;
        }
}

function makeTextSprite( message, parameters )
{
    console.log('make text sprite: ', message, parameters);
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    var color = parameters.color;    

	/*var Color = parameters.hasOwnProperty("color") ?
		parameters["color"] : { r:255, g:255, b:255, a:1.0 };*/	

	var spriteAlignment = THREE.SpriteAlignment;
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = parameters.color;

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(parameters.scale.x,parameters.scale.y,4.0);
	return sprite;	
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

function toggleFullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
};

function normalizar(num){
    var aux = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    aux = aux.substring(0, aux.length - 3);
    return aux;
}
function movement(valueX, valueY, valueZ, object, delay, duration){
          var tween = new TWEEN.Tween(object).to({
            x: valueX,
            y: valueY,
            z: valueZ
          },duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function () {
          }).delay(delay).start();
}
function deleteInfo(){
    $("#infoPostit").removeClass('fadeInDownBig');
    $("#infoPostit").addClass('fadeOutUpBig');
}
function addInfo(){
    $("#infoPostit").removeClass('fadeOutUpBig');
    $("#infoPostit").addClass('fadeInDownBig');
}
function currentDate(){
    var d = new Date();

    var curr_day = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();

    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_sec = d.getSeconds();

    if(parseInt(curr_min)<10) curr_min = '0'+curr_min;

    var current = curr_day+'/'+curr_month+'/'+curr_year+' - '+curr_hour+':'+curr_min;
  return current;  
}

function RemoveLetters(){
    for(var a = 0; a<legendGroup.children; a++){       
        scene.remove(legendGroup.children[a]);
    }
}
function removeIndicatorsValues(){
    $(".valueIndicator").removeClass('show')
    $(".valueIndicator").addClass('hide');
}
function deleteSensor(){
    if(zoneGroup){
        for(var i = 0;i<zoneGroup.children.length; i++){
            var tween = new TWEEN.Tween(zoneGroup.children[i].scale).to({
                    x: 1,
                    y: 1,
                    z: 1
            },500).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function () {
          }).delay(0).start();
        }
    }
    //setTimeout(scene.remove(zoneGroup), 3000); 
    //scene.remove(zoneGroup);
    scene.remove(circunference1);
    scene.remove(circunference2);
    scene.remove(circunference3);
    scene.remove(circunference4);
}
function deleteInfoHuman(){
    $("#infoHuman").removeClass('fadeInDownBig');
    $("#infoHuman").addClass('fadeOutUpBig');
}


function addInfoHuman(){
    $("#infoHuman").removeClass('fadeOutUpBig');
    $("#infoHuman").addClass('fadeInDownBig');
}