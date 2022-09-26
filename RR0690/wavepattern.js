//button 2

function WavePattern (){
    this.name = " Wave Pattern";
    var amp = new p5.Amplitude();
    var volhistory = [];

     angleMode(DEGREES);
    
    this.draw = function(){
        var vol = amp.getLevel(); //follows amplitude of song
        push();
        
        volhistory.push(vol); 
        colorMode(HSB);
        stroke(0, 0, 0);
        strokeWeight(2);
        noFill();
        
        translate(width/2, height/2); //makes in the middle of frame
          
        
        for (var i = 0; i < 360; i++){ //creates rotation
            var r = map(volhistory[i], 0, 1, 200, 400); 
            var x = r * cos(i); 
            var y = r * sin(i);
            stroke(i,255,255);
            line(0,0,x,y); 
            }

       pop();
    
        beginShape();
         for (var i = 0; i < 360; i++){
            
            var r = map(volhistory[i], 1, 0, 500, 700); //maps out to look like a projection/zoomed in
            var x = r * cos(i);
            var y = r * sin(i);
        
            colorMode(HSB);
            stroke(i,255,255);
            line(width/2,height/2,x,y); //maps out to look like a projection/zoomed in
            vertex(x+50, y+5);
            noFill();
          
            }
        endShape();
        
        
        if (volhistory.length > 360) { //it continues after a round
            volhistory.splice(0, 1);  
            } 
    }
    
}

   this.unSelectVisual = function(){
        console.log("WavePattern unselected");
    }
    
    this.selectVisual = function(){
        console.log("WavePattern selected");
    }
    


 