noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(400, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background('#FFC0CB');
    fill('#34ebcf');
    stroke('#42adf5');
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log("Posenet is initialized!");
}

function gotPoses(results) {
    if (results.length > 0)
    {
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = "+noseX+"noseY = "+noseY);
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWrist = "+leftWristX+"rightWrist = "+rightWristX+"difference = "+difference);
        document.getElementById("square_side").innerHTML = "Lenght and Height of the rectangle = "+difference+"px";
    }
}