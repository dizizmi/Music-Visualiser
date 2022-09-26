// button 1

var progThresh;
var seedTresh;

function Spectrum(){
	this.name = " Spectrum";
    var noiseStep = 0.01;
    var prog = 0;
    
    progThresh = 150;
    seedThresh = 100;
   
	this.draw = function(){
		push();
        colorMode(RGB);
        
		var spectrum = fourier.analyze();
        
		noStroke();
        
        var c1 = color(212,189,255); 
        var c2 = color(31,31,234);
        var c3 = color(162,113,255);
		for (var i = 0; i < spectrum.length; i++){
			var y = map(i, 0, spectrum.length / 8, 0, width);
            var h = -height + map(spectrum[i], 0 , 450, height, 0);
            var c = lerpColor(c1, c2, spectrum[i] / 350);
            var n = lerpColor(c3, c2, spectrum[i] / 200);
            fill(c);
            rect(y, height / 2, width / spectrum.length, h); 
            fill(n);
            rect(y, height / 2 - h, width / spectrum.length, h); 
            
  		}
	
		pop();
        
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        noiseLine(b, t);
    
        
        function noiseLine( energy1, energy2){
            push();
            translate(width / 2, height / 2);
            colorMode(RGB);
             //draw noise using begin end shape
            
            beginShape();
            noFill();
            stroke(255,255,255);
            strokeWeight(5);
        
        //noise value
            for (var i=0; i<100;i++){
            var x = noise(i*noiseStep + prog);
            var y = noise(i*noiseStep + prog+10);
            x = map(x,0,1, -500, 500);
            y = map(y,0,1, -500, 500);
            vertex(x,y);
        } 
        
            endShape();
        
          if(energy1> progThresh){
               prog+=0.01;
          }
        
        //adding 1 more condition
          if(energy2> seedThresh){
             noiseSeed(); //this randomises noise value
       }
            pop();
            
        }
        
	}
    
    this.unSelectVisual = function(){
        console.log("Spectrum unselected");
    }
    
    this.selectVisual = function(){
        console.log("Spectrum selected");
    }
}
