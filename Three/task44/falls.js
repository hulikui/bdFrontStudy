var isShowed = false;
function showPhoto(obj) {
    var light = document.getElementsByClassName('white_content')[0];
    var fade = document.getElementsByClassName('black_overlay')[0];

    if(!isShowed){
        isShowed = true;
        fade.style.display = 'block';
        light.innerHTML = obj.innerHTML;
        light.style.display = 'block';
    } else {
        isShowed = false;
        fade.style.display = 'none';
        light.style.display = 'none';
    }


}

function addPhotoShade() {
    var light = document.createElement('DIV');
    var fade = document.createElement('DIV');
    light.className="white_content";
    light.id = 'light';
    fade.className = 'black_overlay';
    fade.id = 'fade';
    light.setAttribute('onclick', "showPhoto(this)");
    document.body.appendChild(light);
    document.body.appendChild(fade);

}
function PFrame() {
    this.setStyles = function (obj, styles) {
        for (var style in styles) {
            obj['style'][style] = styles[style];
        }
    };
    this.setAttr = function(obj, attrs){
        for (var attr in attrs) {
            obj.setAttribute(attr, attrs[attr]);
        }
    };
    this.getImg = function(imgObj) {
        var img = document.createElement('IMG');
        var styles = imgObj.styles;
        img.src = imgObj.src;
        this.setStyles(img, styles);
        return img;
    };
    this.getDiv = function(obj) {
        var item = document.createElement('DIV');
        var styles = obj.styles;
        item.src = obj.src;
        this.setStyles(item, styles);
        return obj;
    };
    this.options = {
        col_width: ''//用于存储cols的属性
    };
    this.createFrame = function(option) { //生成框架,默认四列
        option = option || this.options;
        var cols = option.cols || 4;
        var frame = document.createElement('DIV');
        option.className = 'fall_cols';
        var width = option.width;
        var col_width = (width - option.padding*(cols + 1)) / cols;
        this.options.col_width = col_width;
        var styles = {
            width: width,
            minHeight: option.height,
            display: 'flex'
        };
        this.setStyles(frame, styles);
        for(var i=0;i<option.cols;i++) {
            var item = document.createElement('DIV');
            if(option.className){
                item.className = option.className;
            }
            var itemStyle = {
                width: col_width,
                minHeight: option.height,
                marginLeft: option.padding,
                marginTop: option.padding
            };
            if(i === (option.cols-1)){
                itemStyle.marginRight = option.padding;
            }
            this.setStyles(item, itemStyle);
            frame.appendChild(item);
        }
        return frame;
    };
    this.getStyle = function(dom, attr){
        return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
    };
    this.getPhotoStyles = function(target) {

        return Array.prototype.map.call(target.children, function(node){
            return {
                height: node.style.height,
                src: node.src
            }
        });

    };
    this.getTarget = function() {
        function getHight(obj){
            var sum = 0;
            var items = obj.children;
            for(var i=0;i<items.length;i++){
                sum += parseInt(items[i].style.height.split('px')[0]);
            }
            return sum;
        }
        var nodes = document.getElementsByClassName('fall_cols');//累加子框中已添加照片的总高度，最小的优先选择
        var res = getHight(nodes[0]);
        var node=nodes[0];
        for(var i=1;i<nodes.length;i++){
            var height = getHight(nodes[i]);
            if(res > height){
                res = height;
                node=nodes[i];
            }
        }
        return node;
    };

    this.createChildFrame = function(frameObj, innerObj) {
        var div = document.createElement('DIV');
        if(frameObj.attr){
            this.setAttr(div, frameObj.attr);
        }
        if(frameObj.styles){
            this.setStyles(div, frameObj.styles);
        }
        var img = document.createElement('IMG');
        if(innerObj.attr){

            img.src =  innerObj.attr.src;
        }
        if(innerObj.styles){
            this.setStyles(img, innerObj.styles);
        }
        div.appendChild(img);

        return div;
    }

}

PFrame.prototype.addPhoto = function(obj) {
    var photo = this.createChildFrame(obj.frameObj, obj.innerObj);
    var target = this.getTarget();
    target.appendChild(photo);
};
PFrame.prototype.generatePhoto = function(target, imgObjs) {//我只需要知道你的高是多少即可
    var col_width = this.options.col_width;
    var obj = {
        frameObj: {
            attr: {
                onmousedown: "showPhoto(this)"
            },
            styles: {
                width: col_width || 500,
                height: '150px',
                marginBottom: '16px'
            }
        },
        innerObj: {
            attr: {
                src: "../task43/img2.jpg"
            },
            styles: {
                width: "100%",
                height: '100%'
            }
        }
    };
    for(var i=0; i<imgObjs.length;i++){
        var height = imgObjs[i].height;
        var src = imgObjs[i].src;
        obj.frameObj.styles.height = height;
        obj.innerObj.attr.src = src;
        obj.innerObj.attr.alt = i;
        this.addPhoto(obj);
    }
};

PFrame.prototype.getFallsOptions = function(){
    var nodes = document.querySelectorAll('div[class^="falls"]');
    var context = this;
    return Array.prototype.map.call(nodes, function(node){
        var imgs = context.getPhotoStyles(node);
        var padding = parseInt(context.getStyle(node, 'padding').split('px')[0]);
        var cols = parseInt(node.className.split('_')[1]);
        return {
            node: node,
            width: node.offsetWidth,
            height: node.offsetHeight,
            padding: padding,
            cols: cols,
            imgs: imgs
        };
    });
};
(function() {
    addPhotoShade();
    var pfs = new PFrame();
    var newPFs = pfs.getFallsOptions();
    newPFs.forEach(function(option){
        var frame = pfs.createFrame(option);
        option.node.innerHTML = '';
        option.node.appendChild(frame);
        option.node.style.padding = 0;
        pfs.generatePhoto(option.node, option.imgs);
    });


})()