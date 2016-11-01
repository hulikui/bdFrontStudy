window.onload=function(){
    var canvas = document.getElementById('target');
    var context = canvas.getContext('2d');
    var renderFrame = findRequestAnimationFrame();
    var objects = [];
//¸üÐÂ
    var updateScene = function() {
        objects.forEach(function(item) {
            if(item.tick) item.tick();
        });
    };
//»æÖÆ
    var drawScene = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        objects.forEach(function(item) {
            if(item.draw) item.draw(context);
        });
        context.restore();
    };
    var tick = function() {
        updateScene();
        drawScene();
        renderFrame(tick);
    };
    var wall = new Wall(100,100, 500, 400);
    objects.push(wall);
    objects.push(new ObjectPool(wall, 10));
    tick();
}