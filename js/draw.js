
var MinX = 100000
var MaxX = -100000
var MinY = 100000
var MaxY = -100000
var DeltaX 
var DeltaY
var points = []
var smooth = []
var endpts = []
var sketch = false
var animation = true
var n = 0

function draw(){

if(document.getElementById("run").checked==true){
	document.getElementById("submitJob").style.display="none";
	document.getElementById("play").style.display="block";
}
else if(document.getElementById("run").checked==false){
	document.getElementById("submitJob").style.display="block";
	document.getElementById("play").style.display="none";
}

c = document.getElementById("myCanvas")
ctx = c.getContext("2d")

ctx.canvas.height = $(window).height()
ctx.canvas.width = $(window).width()

ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

ctx.lineWidth = 6;

if($('.inputContainer').data('open')== 'true'){
	ctx.strokeStyle = "#aaa"
}
else{
	ctx.strokeStyle = "#6495ed"
}

ctx.beginPath();
ctx.lineJoin="round"
ctx.lineCap="round"

if(smooth.length>0){
	for(i=0;i<smooth.length;i++){
		for(j=0;j<smooth[i].length;j++){
			if(j==0){
			ctx.moveTo(smooth[i][j].x,smooth[i][j].y)			
			}
			else{
			ctx.lineTo(smooth[i][j].x+0.001,smooth[i][j].y)
			}
		}
		ctx.stroke()
	}
	
}

//display points
/*
ctx.lineWidth = 1;
ctx.strokeStyle = "#000"

if(smooth.length>0){
	for(i=0;i<smooth.length;i++){
		for(j=0;j<smooth[i].length;j++){
		   ctx.beginPath();
			ctx.arc(smooth[i][j].x,smooth[i][j].y,2,0,2*Math.PI);
			ctx.stroke()
		}
	}
	
}
*/

	//dimensions
	if($('.inputContainer').data('open')== 'false'){
		//document.getElementById("input").style.display="none";

	}

	if($('.inputContainer').data('open')== 'true'){

		//document.getElementById("submitJob").style.display="none";
		//document.getElementById("play").style.display="none";

		ctx.lineWidth = 1;
		ctx.strokeStyle = "#aaa"
		ctx.fillStyle = "#aaa"

		ctx.beginPath()
		ctx.moveTo(MinX,MinY)
		ctx.lineTo(MinX,MaxY)
		ctx.lineTo(MaxX,MaxY)
		ctx.stroke()

		ctx.beginPath()
		ctx.arc(MinX,MinY,2,0,2*Math.PI);
		ctx.fill()
	
		ctx.beginPath()
		ctx.arc(MinX,MaxY,2,0,2*Math.PI);
		ctx.fill()

		ctx.beginPath()
		ctx.arc(MaxX,MaxY,2,0,2*Math.PI);
		ctx.fill()

		ctx.font = "22px Arial"
		if((Math.abs(MaxX-MinX))>(Math.abs(MaxY-MinY)) && ((((Math.abs(MaxY-MinY))/(Math.abs(MaxX-MinX)))*4)<3) ){
			ctx.fillText( '4\"',MinX+((MaxX-MinX)/2),MaxY+30) //x
	
			var x = (((Math.abs(MaxY-MinY))/(Math.abs(MaxX-MinX)))*4).toFixed(1)		
			ctx.fillText( (x + '\"'),MinX-50,MinY+((MaxY-MinY)/2)) //y
		}
		else{
			ctx.fillText( '3\"',MinX-30,MinY+((MaxY-MinY)/2)) //y

			var y = (((Math.abs(MaxX-MinX))/(Math.abs(MaxY-MinY)))*3).toFixed(1)
			ctx.fillText( (y + '\"'),MinX+((MaxX-MinX)/2),MaxY+30) //x	
		}
	}
//

ctx.lineWidth = 6;
ctx.strokeStyle = "#6495ed"

}

function clear(){
   MinX = 100000
   MaxX = -100000
   MinY = 100000
   MaxY = -100000
   points=[]
   smooth=[]
   draw()

	i=0
	j=0
	if(animation==true){
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2)
		ctx.moveTo(default_sketch[0][0].x,default_sketch[0][0].y)
	animate()
	}
}

function animate () {
   if(animation==true){       
   setTimeout(function () {    
      ctx.lineTo(default_sketch[i][j].x,default_sketch[i][j].y)
		if(sketch==false){
			ctx.stroke()    
		}
      j=j+2;                     
      if (j < default_sketch[i].length) {            
         animate()             
      }
		else if((j>=default_sketch[i].length) && (i<default_sketch.length-1)) {
			i++
			j=0
			ctx.moveTo(default_sketch[i][j].x,default_sketch[i][j].y)
			animate()
		}

                        
   }, 1)	
	}
	if(animation==true){
		setTimeout("turnOffAnimation();",3000)
	}

}


function turnOffAnimation(){
	
	if(animation==true){
		animation = false
		clear()
	}
}

