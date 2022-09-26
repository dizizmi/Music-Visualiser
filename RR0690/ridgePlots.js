//button 4

function RidgePlots(){
    this.name = " Ridge Plots";
    
    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    var speed = 0.7;
    var output = [];
    var noiseScale = 0.1;

    
    this.onResize = function(){
        startX = width/5;
        endY = height/5;
        startY = height - endY;
        spectrumWidth = (width/5)*3;
    }
    
    
    //call onResize when we new RidgePlots() object in sketch
    this.onResize();
    
    this.draw = function(){
        
        //for every framecount the color changes
        
        var m = 100;
        var topR = 150 * noise(frameCount / m); //background colors
        var topG = 150 * noise(1000 + frameCount / m);
        var topB = 150 * noise(2000 + frameCount / m);
        var bottomR = 250 * noise(3000 + frameCount / m);
        var bottomG = 100 * noise(4000  + frameCount / m);
        var bottomB = 100 * noise(5000 + frameCount / m);

        var topColor = color(topR, topG, topB);
        var bottomColor = color(bottomR, bottomG, bottomB);
       
        //color changes in a horizontally, downwards
        
        for(var y = 0; y < height; y++) {
            var lineColor = lerpColor(topColor, bottomColor, y / height);
            stroke(lineColor);
            line(0, y, width, y);
         } 
        
        
        stroke(255); //white ridge plots 
       strokeWeight(2);
        //set color to HSB
       colorMode(HSB, 360);
        
        
       if(frameCount%10==0){ //wave for every 10 frames
            addWave();
        }
        
        //draw wave from back of o/p array
        for (var i = output.length - 1; i >= 0; i--){
            var wave = output[i];
            
            fill(frameCount%360, 360, 360);
           
           beginShape();
            for(var j=0; j < wave.length; j++){
                wave[j].y -= speed; //moves the wave upwards
               vertex(wave[j].x, wave[j].y);  
            }
            endShape();
            
            //when wave reached the top
            if(wave[0].y<endY){
                output.splice(i,1); 
            }
        } //switch the color mode to RGB
        colorMode(RGB);    
        
    }
    
    function addWave(){
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale = 3;
        var bigScale = 40;
        
        
        for (var i=0; i<w.length; i++){
            if (i%20==0){
                var x = map(i,0,1024, startX, startX+spectrumWidth);
                
                if(i<1024*0.25 || i>1024*0.75){
                    var y = map(w[i], -1,1, -smallScale, smallScale);
                    var o = {x:x, y:startY+y};
                    outputWave.push(o);
                } else {
                    var y = map(w[i],-1, 1, -bigScale, bigScale);
                    var o = {x:x, y: startY+y};
                    outputWave.push(o);
                }
            }
         }
    
         output.push(outputWave);
        }
  
    }

    

