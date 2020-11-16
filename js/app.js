class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6),
        ];
        this.hills[2].heightLimit(true);

        this.sheepController = new SheepController();

        this.sun = new Sun();
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {

        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);
        
        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);

    }
}

window.onload = () => {
    new App();
};
//

class Hill {
    constructor(color, speed, total) {

        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 1));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            };
        }
    }

    heightLimit(limit) {
        this.maxHeight = limit;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        if (cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            });
        } else if (cur.x > this.stageWidth) {
            this.points.splice(-1);
        }


        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;
        let index = 0;
        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }
        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();


        return dots;
    }

    getY() {
        let min = this.stageHeight / 8;
        if (this.maxHeight) min = this.stageHeight / 4.5;
        let max = this.stageHeight - min;
        return min + Math.random() * max;

    }
}

class SheepController {
    constructor() {
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };

        this.img.src = './images/running.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addSheep();
        console.log("Loaded!");
    }

    addSheep() {
        this.items.push(
            new Sheep(this.img, this.stageWidth),
        );
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur += 1;
            if (this.cur > 400 && this.items.length <= 4) {
                this.cur = 0;
                this.addSheep();
                console.log("addSheep");
            }
            this.items.length <= 10
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                item.resize(this.stageWidth, this.stageHeight);
                if (item.x < -item.width) {
                    this.item.x = stageWidth + 53;
                    item.draw(ctx, t, dots);
                } else {
                    item.draw(ctx, t, dots);
                }
                console.log(this.items.length);
            }
            /*  this.sh = new Sheep(this.img, this.stageWidth);
              this.sh.draw(ctx, t, dots);*/

        }
    }
}

class Sheep {
    constructor(img, stageWidth) {
        this.img = img;

        this.totalFrame = 8;
        this.curFrame = 0;

        this.imgWidth = 2391/8;
        this.imgHeight = 327;

        this.stageWidth = stageWidth;

        this.randomSize=Math.random()*60;

        this.sheepWidth = (this.stageWidth / 15)+this.randomSize;
        this.sheepHeight = (this.stageWidth / 18)+this.randomSize*1.2;

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.defaultX = this.stageWidth + this.sheepWidth;
        this.x = this.defaultX;
        this.y = 0;
/*        this.speed = Math.random() * 0.6 + 1;
*/        this.speed = Math.random() * 2 + 10;

        this.fps = 30;
        this.fpsTime = 1000 / this.fps; //실제 time stamp와 의 비교가 됨
    }
    resize(stageWidth, stageHeight) {
        this.defaultX = stageWidth + this.sheepWidth;
    }

    draw(ctx, t, dots) {

        if (!this.time) {
            this.time = t;
        }
        const now = t - this.time;
        if (t - this.time > this.fpsTime) { //fpstime과 비교해서 fps조절
            this.curFrame += 1;
            if (this.curFrame == this.totalFrame) {
                this.curFrame = 0;
            }
            this.time = t;
        }
        this.animate(ctx, dots); //항상 animate가 실행되어야 나머지 요소가 렌더링될때  안깜빡임
    }

    animate(ctx, dots) {
        if (this.x < -this.sheepWidth) { this.x = this.defaultX; }
        this.x -= this.speed;
        let getValue = this.getY(this.x, dots);
        this.y = getValue.y;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(getValue.rotation);
            ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.sheepWidthHalf,
            -this.sheepHeight + 15,
            this.sheepWidth,
            this.sheepHeight
        );
        ctx.restore();
         /*ctx.fillStyle = "blue";
         ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(getValue.rotation);
        ctx.fillStyle = "blue";
        ctx.font="48px serif";
        ctx.fillText("난 졸업할 수 있을까??",-200,0,500);
        ctx.restore();*/
    }

    getQuadValue(p0, p1, p2, t) {
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {

        const tx = this.quadTangent(x1, x2, x3, t);
        const ty = this.quadTangent(y1, y2, y3, t);
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
            rotation: rotation,
        };
    }

    quadTangent(a, b, c, t) {
        return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
    }

    /* getY(x,dots){ //zzzzzzzzzzzzzzzzzz병신같은데
    은근 정확도 근접하게 나온 근사 베지어 곡선 구하는 함수
    되서 웃기네ㅋㅋㅋ
    ㅋㅋㅋㅋㅋㅋㅋ
         for(let i=0; i<dots.length;i++){
             if(dots[i].x1<=x&&x<=dots[i].x3){
                 let t=(x-dots[i].x1)/(dots[i].x3-dots[i].x1);
                 let pt=this.getPointOnQuad(dots[i].x1, dots[i].y1, dots[i].x2, dots[i].y2, dots[i].x3, dots[i].y3, t);
                 return pt.y;
             }
         }
        return;
     }*/
    getY(x, dots) {
        for (let i = 1; i < dots.length; i++) {
            if (x >= dots[i].x1 && x <= dots[i].x3) {
                return this.getY2(x, dots[i]);
            }
        }
        return { x: 0, y: 0 };
    }
    getY2(x, dot) {
        const total = 200;
        let pt = { x: 0, y: 0 };
        pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x;

        for (let i = 1; i < total; i++) {
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);
            if (prevX <= x && x <= pt.x) {
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }
}

class Sun {

    constructor() {
        this.radius = 200;

        this.total=60;
        this.gap=1/this.total;
        this.originPos=[];
        this.pos=[];
        for(let i=0; i<this.total; i++){
            const pos=this.getCirclePoint(this.radius,this.gap*i);
            this.originPos[i]=pos;
            this.pos[i]=pos;
        }

        this.fps=30;
        this.fpsTime=1000/this.fps;
    }

    resize(stageWidth, stageHeight) {

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.radius + 140;
        this.y = this.radius + 100;
    }

    draw(ctx, t) {
        const timegap=t-this.time;
        if(timegap>=this.fpsTime){
            this.time=t;
            this.updatePoints();
        }
        
        ctx.fillStyle = '#ffb200';
        ctx.beginPath();
        ctx.moveTo(this.pos[0].x+this.x,this.pos[0].y+this.y);
      /*  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);*/
        for(let i=1; i<this.total; i++){
            ctx.lineTo(this.pos[i].x+this.x,this.pos[i].y+this.y);
        }
        ctx.fill();
        if(!this.time){
            this.time=t;
        }
    }

    updatePoints(){
        for(let i=1; i<this.total; i++){
            const pos=this.originPos[i];
                this.pos[i]={
                x: pos.x+this.ranInt(5),
                y: pos.y+this.ranInt(5),
            }
        }
    }

    ranInt(max){
        return Math.random()*max;
    }

    getCirclePoint(radius, t){
        const theta=Math.PI*2*t;

        return{
            x:(Math.cos(theta)*radius),
            y:(Math.sin(theta)*radius)
        };
    }
}