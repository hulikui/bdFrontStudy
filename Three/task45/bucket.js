function Buckets() {
    this.getImgs = function(contain){ //获取容器内的照片
        var imgs = contain.children;
        return Array.prototype.map.call(imgs, function(img){
            return {
                width: img.naturalWidth,
                height: img.naturalHeight,
                ratio: img.naturalWidth/img.naturalHeight,
                src: img.src
            }
        });
    };

}

Buckets.prototype.group = function(photos, contain){
    //将图片分行
    var raws=[];
    var rawWidth=0;
    var rawStart=0;
    var rawEnd=0;
    console.log(contain.clientWidth);
    for(var j=0;j<photos.length;j++){
        photos[j].height=200;
        photos[j].width=200*photos[j].ratio;
        rawWidth+=photos[j].width;
        rawEnd=j;
        if(rawWidth>contain.clientWidth){
            var lastWidth=rawWidth-photos[j].width;
            var rawRatio=200/lastWidth;
            var lastHeight=rawRatio*(contain.clientWidth);//(rawEnd-rawStart-1)*8
            raws.push({
                start:rawStart,
                end:rawEnd-1,
                height:lastHeight
            });
            rawWidth=photos[j].width;
            rawStart=j;
        }
    }
    raws.push({
        start: rawStart,
        end: photos.length-1,
        height: 200
    });
    return raws;
};

Buckets.prototype.convertBuckets = function(groups, contain, imgObjs) {
    groups.forEach(function(group){
        for(var i=group.start;i<=group.end;i++){
            var img = document.createElement('IMG');
            var width = imgObjs[i].ratio*group.height;
            img.style.width = width;
            img.style.height = Math.floor(group.height);
            img.style.margin = '0px';
            img.src = imgObjs[i].src;
            contain.appendChild(img);
        }
    });
};


Buckets.prototype.init = function() {
    var buckets = document.getElementsByClassName('buckets');
    var context = this;
    Array.prototype.forEach.call(buckets, function(bucket){
        var imgs = context.getImgs(bucket);
        var groups = context.group(imgs, bucket);
        console.log(groups);
        bucket.innerHTML = '';
        context.convertBuckets(groups, bucket, imgs);
    });
};
(function(){
    var bucket = new Buckets();
    bucket.init();
})()