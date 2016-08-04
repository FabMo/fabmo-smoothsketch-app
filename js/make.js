var SafeZ = 0.2
var g = ""

function make(){

//calculate scaling
//Bill's mods
    var Scale
    
    DeltaX = (MaxX - MinX)
    DeltaY = (MaxY - MinY)
    //console.log("DeltaX = " + DeltaX)
    //console.log("DeltaY = " + DeltaY)
    var ScaleFactorX = SizeX / DeltaX
    var ScaleFactorY = SizeY / DeltaY
    if (ScaleFactorX < ScaleFactorY) {
        Scale = ScaleFactorX
    }
    else {
        Scale = ScaleFactorY
    }
	//console.log(Scale)
	//end Bill's mods

var material = {feed:500,plunge:200}
var pass = 1
var pass_no=1
var pass_depth=1

//add test for inch/metric based on size of drawing
//Bill's mod

if (SizeX > 6){
	g+="g21\n"}
	else{
	g+="g20\n"
	};
	
g+="g0z " + SafeZ + "\n"

//end Bill's mods


g+="m4\n"
g+="g4p2\n"

while(pass<=pass_no){
   
   for(i=0;i<smooth.length;i++){
   
   //Bill's mods for scaling and position
   	//g+="g0x"+(smooth[i][0].x).toFixed(3) +"y"+ (smooth[i][0].y).toFixed(3) + "\n"
   	//g+="g1z-1f60\n"
   	//g+="g1f60\n"
   	//for(j=1;j<smooth[i].length;j++){
	 //     g+="g1x"+(smooth[i][j].x).toFixed(3) +"y"+ (smooth[i][j].y).toFixed(3) + "\n"
	//	}
	//	g+="g0z3\n"
	
	g+="g0x"+(((smooth[i][0].x) - MinX) * Scale) .toFixed(3)  +"y"+ ((DeltaY - ((smooth[i][0].y)- MinY)) * Scale).toFixed(3) + "\n"
   	g+="g1z " + CutDepth + "f60\n"
   	g+="g1f60\n"
   	for(j=1;j<smooth[i].length;j++){
	      g+="g1x"+(((smooth[i][j].x) - MinX) * Scale) .toFixed(3)  +"y"+ ((DeltaY - ((smooth[i][j].y) - MinY) )* Scale).toFixed(3)  + "\n"
			
		}
		g+="g0z " + SafeZ + "\n"
		
		// end Bill's mods
   }
   pass++
}

g+="m5\n"
g+="m30\n"

//console.log(g)

//define default sketch
/*
default_sketch=[]
for(i=0;i<smooth.length;i++){
	default_sketch.push(["["])
	for(j=0;j<smooth[i].length;j++){

		smooth[i][j].x = ((smooth[i][j].x) - (MinX + DeltaX/2)).toFixed(1)
		smooth[i][j].y = ((smooth[i][j].y) - (MinY+ DeltaY/2)).toFixed(1)

		default_sketch[i]+=(JSON.stringify(smooth[i][j])+",")
	}
		default_sketch[i]+=(["]"])
}

for(i=0;i<default_sketch.length;i++){
	console.log(default_sketch[i])
}
*/
//

fabmo.submitJob({
   file : g,
   filename : "sketch.g",
  name : "SKETCH",
   description : "Smooth Sketch"
});


g=""

}
