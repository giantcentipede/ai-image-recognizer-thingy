img=""
status=''
objects=[];

function preload() {
img=loadImage("dog_cat.jpg")
}

function setup() {
canvas=createCanvas(640,420);
canvas.center();

objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";


}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(img,gotresults);

}

function draw() {
image(img,0,0,640,420);
if (status!="") {
for (i=0; i<objects.length; i++) {
    document.getElementById("status").innerHTML="status:objects detected";

    fill(255, 0, 0);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+15);
    noFill();
stroke(255,0,0);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

}
}


}

function gotresults(error,results) {
    if (error) {
        console.log(error);

    }

    else {
        console.log(results);
        objects=results;

    }
}