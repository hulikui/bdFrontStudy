// This file is for crap not relevant to this discussion
    var findRequestAnimationFrame = function() {
        return window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function(callback, element){
                window.setTimeout(callback, 1000 / 30);
            };
    };
//ǽ����
var Wall = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};
//����ǽ
Wall.prototype = {
    draw: function(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x, this.y);
        context.stroke();
    }
};
//���ξ���
var Sprite = function(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.velx = Math.random() * 2.0 - 1.0;//�����ˮƽ�ٶ�
    this.vely = Math.random() * 2.0 - 1.0;//�����ֱ�ٶ�
    this.width = width;
    this.height = height;
    this.colour = colour;
};
Sprite.prototype = {
    tick: function() {//��������
        this.x += this.velx;
        this.y += this.vely;
    },
    draw: function(context) {//�����
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
//�����
var ObjectPool = function(wall, numObjects) {
    this.objects = [];
    this.wall = wall;
    this.numObjects = numObjects;//���ж������Ŀ
    this.createObjects();//�������еĶ���
};
ObjectPool.prototype = {//����ص�ԭ��
    createObjects: function() {
        for(var i = 0; i < this.numObjects; i++) {
            var width = Math.random() * 50.0 + 10.0;
            var height = Math.random() * 50.0 + 10.0;
            var x = this.wall.x + (Math.random() * (this.wall.width - width));
            var y = this.wall.y + (Math.random() * (this.wall.height - height));
            this.objects.push(new Sprite(x, y, width, height, '#000'));
        }
    },
    tick: function() {//���³��ж��󲢼����ײ
        this.objects.forEach(function(item) {
            item.tick();
        });
        this.collide();
    },
    draw: function(context) {//���Ƴ���ÿһ������
        this.objects.forEach(function(item) {
            item.draw(context);
        });
    },
    collide: function() {//��ײ���
        for(var i =0; i < this.objects.length; i++){
            this.collideWalls(this.objects[i]);//�Ƿ���ǽ��ײ
            for(var j = i ; j < this.objects.length; j++) {
                var obj1 = this.objects[i];
                var obj2 = this.objects[j];
                this.collideObjects(obj1, obj2);//���ξ����Ƿ���ײ
            }
        }
    },
    collideObjects: function(one, two) {//���������Ƿ���ײ
        if(one.x + one.width < two.x)
            return;
        if(two.x + two.width < one.x)
            return;
        if(one.y + one.height < two.y)
            return;
        if(two.y + two.height < one.y)
            return;
        var tx = one.velx;//�������ߵ��ٶ�
        var ty = one.vely;
        one.velx = two.velx;
        one.vely = two.vely;
        two.velx = tx;
        two.vely = ty;
    },
    collideWalls: function(obj) {//���ξ�����ǽ�Ƿ���ײ
        if(obj.x < this.wall.x || obj.x + obj.width > this.wall.x + this.wall.width)
            obj.velx = -obj.velx;
        if(obj.y < this.wall.y || obj.y + obj.height > this.wall.y + this.wall.height)
            obj.vely = -obj.vely;
    }
};