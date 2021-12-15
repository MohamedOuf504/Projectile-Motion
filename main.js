const g = 9.81;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const AngleVal = document.getElementById("Angle");
const VelocityVal = document.getElementById("Velocity");
const btnLaunch = document.querySelector("#Launch")
const btnReset = document.querySelector("#Reset")
let Angle;
let timer;
let velocity;
let x = 40;
let y = canvasHeight + 40;
let radius = 4;
let time = 0;
let startX = x;
let startY = y;

const GUN = () => {
    gunImage = new Image();
    gunImage.src = "pall.png";
    gunImage.onload = function() {
        ctx.drawImage(gunImage, 0, canvasHeight - 40);
    };
};
GUN();
const init = () => {
    velocity = VelocityVal.value;
    Angle = AngleVal.value;
    time = 0;
    v0x = velocity * Math.cos((Angle * Math.PI) / 180);
    v0y = velocity * Math.sin((Angle * Math.PI) / 180);
};


const draw = () => {
    ctx.save();
    ctx.restore();
    if (y < canvasHeight && x < canvasWidth) {
        y = startY - (v0y * time - (1 / 2) * g * Math.pow(time, 2));
        x = startX + v0x * time;
    } else {
        return clearInterval(timer);
    }
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    time += 0.25;

};

const reset = () => {

    clearInterval(timer);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    GUN();
    x = 40;
    y = canvasHeight - 40;
    startX = x;
    startY = y;
    document.querySelector("#alart").innerHTML = ''

};



btnLaunch.addEventListener('click', () => {

    if (validate(AngleVal.value) && validate(VelocityVal.value)) {
        reset();
        init();
        timer = setInterval(draw, 100);
    } else {
        document.querySelector("#alart").innerHTML = 'The value must Be Number & required ';
    }

})

btnReset.addEventListener('click', function() {
    reset()
    AngleVal.value = ''
    VelocityVal.value = ''
})

function validate(num) {
    let regex = /[0-9]+/
    regex.test(num)
    if (regex.test(num)) {
        return true
    } else {
        return false
    }

}