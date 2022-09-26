//button 3
function Spiral(x,y){
    this.name = " Spiral";
    var amp = new p5.Amplitude();
    var spiral = [];
    
    this.draw = function(){
        var vol = amp.getLevel();
        push();

        spiral.push(vol);
        angleMode(DEGREES);
        rectMode(CENTER);
       // ellipseMode(CORNER);
        noFill();
        stroke(255);
        translate(width / 2, height / 2);
            
        
        for (var i =0; i < vol*500; i++){ //reacts to the amplitude
            push();
           
           rotate(sin(frameCount + i*3)*50); //rotates for every framecount
            
            //colors at each frame count
            //lighter shade to darker shade by every framecount
            var r = map(sin(frameCount), -1, 1, 10, 50); 
            var g = map(cos(frameCount/2), -1, 1, 10, 200);
            var b = map(sin(frameCount/4), -1, 1, 10, 100); 

            stroke(r, g, b);
                rect(0,0, 600-i*3, 600-i*3, 200-i); //reacts to the amplitude, softer edges
            pop();
             
        }
        pop();
    }
        
    this.unSelectVisual = function(){
        console.log("Spiral unselected");
    }
    
    this.selectVisual = function(){
        console.log("Spiral selected");
    }
}
    
