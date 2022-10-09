let p5js = document.getElementById('canvas');

let stars = new Array(2000);
let sh_stars = new Array(50);
let far_stars = new Array(5000);

function windowResized() {
    resizeCanvas(windowWidth, displayHeight);//3Dの場合は引数にWEBGLを忘れずに！
    background(0);//再描画後に背景を再描画する
}

function setup() {
    let canvas = createCanvas(windowWidth, displayHeight);
    //createCanvas(windowWidth, 200);
    canvas.parent(p5js);  //canvasを指定した要素の子要素にする
    canvas.style("vertical-align", "bottom")

    for (let i = 0; i < stars.length; i++) {
        stars[i] = new Star(0.1);
    }
    for (let i = 0; i < sh_stars.length; i++) {
        sh_stars[i] = new Sh_star(0.1);
    }
    for (let i = 0; i < far_stars.length; i++) {
        far_stars[i] = new Far_star();
    }
}

function draw() {
    background(0);
    translate(width * norm(mouseX, 0, width), height * norm(mouseY, 0, height));
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    for (let i = 0; i < sh_stars.length; i++) {
        sh_stars[i].update();
        sh_stars[i].show();
    }
    for (let i = 0; i < far_stars.length; i++) {
        far_stars[i].show();
    }
}

class Star {
    constructor(speed) {
        this.x = random(-width * 2, width * 2);
        this.y = random(-height * 2, height * 2);
        this.z = random(width);
        this.s = speed;

        this.move_x = random(-0.001, 0.001);
        this.move_y = random(-0.001, 0.001);

        this.r = random(10, 20);
        this.color_r = random(225, 256);
        this.color_b = random(225, 256);
    }

    update() {
        this.z -= this.s;
        this.x += this.move_x;
        this.y += this.move_y;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    show() {
        fill(this.color_r, 255, this.color_b);
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        let radius = map(this.z, 0, width, this.r, 0);

        ellipse(sx, sy, radius, radius);
    }
}

class Far_star {
    constructor() {
        this.x = random(-width * 2, width * 2);
        this.y = random(-height * 2, height * 2);

        this.r = random(2);
        this.s_color = random(192, 256);
    }

    show() {
        fill(255, 255, this.s_color);
        noStroke();

        ellipse(this.x, this.y, this.r, this.r);
    }
}

class Sh_star {
    constructor(speed) {
        this.x = random(-width * 2, width * 2);
        this.y = random(-height * 2, height * 2);
        this.s = speed;

        this.move_x = random(-5, 5);
        this.move_y = random(-5, 5);

        this.angle_x = int(this.move_x / abs(this.move_x));
        this.angle_y = int(this.move_y / abs(this.move_y));

        this.r = random(1, 2);
        this.s_color = random(192, 256);
    }

    update() {
        this.x += this.move_x + norm(this.move_x, 0, 5) * this.s;
        this.y += this.move_y + norm(this.move_y, 0, 5) * this.s;
        if (abs(this.x) > width) {
            this.x *= -1;
        }
        if (abs(this.y) > height) {
            this.y *= -1;
        }
    }

    show() {
        fill(255, 255, this.s_color);
        noStroke();

        ellipse(this.x, this.y, this.r, this.r);
    }
}