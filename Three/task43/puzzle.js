function getWHdiff(contain, img) {
    var wdiff = img.width-contain.width*img.height/contain.height;
    var hdiff=0;
    var styles;
    wdiff = parseInt(wdiff);
   if(wdiff<0){//高度不够,以宽度对齐缩放，高度溢出
       hdiff = img.height-contain.height*img.width/contain.width;
       hdiff = parseInt(hdiff);
       var height = img.height*contain.width/img.width;
       var hdiff = height-contain.height;
       styles={
            width: contain.width,
            height: height,
            marginTop: -hdiff/2
       }
   }else if(wdiff == 0){//证明比例一致
       styles = {
           width: '100%',
           height: '100%'
       }
   }else{//以相框高度为齐缩放,宽度溢出
       var width = img.width*contain.height/img.height;
       var wdiff = width -contain.width;
       styles = {
           width: width,
           height: contain.height,
           marginLeft: -wdiff/2
       }
   }
    return styles;
}

function getFrameStyle(frameObj, nums) {
    var width = frameObj.width;
    var height = frameObj.height;
    var innerFrameStyles = []; //套在图片外层的div样式
    var outterFrameStyle = [];//关乎图像布局的div样式
    var frameStyle = { //相册的style
        width: width,
        height: height,
        display: 'flex'
    };
    var left_width = width/2;
    var right_width = height/2;
    var min_height = height/3;
    if(nums == 1){
        frameStyle.overflow = 'hidden';
    }else if (nums == 2) {
        frameStyle.display = '';
        frameStyle.position = 'relative';

    }else if(nums == 3) {
        left_width = width - height/2;
        innerFrameStyles = [{
            width:left_width,
            height: height,
            overflow: 'hidden'
        }, {
            width: right_width,
            height: right_width,
            overflow: 'hidden'
        },{
            width: right_width,
            height: right_width,
            overflow: 'hidden'
        }];
    }else if(nums == 4){
        frameStyle.flexWrap='wrap';
        innerFrameStyles = {
            width: left_width,
            height: right_width,
            overflow: 'hidden'
        };
    }else if(nums == 5){
        left_width = width*2/3;
        right_width = width/3;
        innerFrameStyles=[{
            width: left_width,
            height: min_height*2,
            overflow: 'hidden'
        },{
            width: left_width/2,
            height: min_height,
            overflow: 'hidden'
        },{
            width: left_width/2,
            height: min_height,
            overflow: 'hidden'
        },{
            width: right_width,
            height: width/3,
            overflow: 'hidden'
        },{
            width: right_width,
            height: height-right_width,
            overflow: 'hidden'
        }];
        outterFrameStyle = {
            width: left_width,
            height: min_height,
            display: 'flex'
        };
    }else if(nums == 6){
        left_width = width*2/3;
        right_width = width/3;
        innerFrameStyles = [{
            width: left_width,
            height: min_height*2,
            overflow: 'hidden'
        },{
            width: left_width/2,
            height: min_height,
            overflow: 'hidden'
        },{
            width: left_width/2,
            height: min_height,
            overflow: 'hidden'
        },{
            width: right_width,
            height: min_height,
            overflow: 'hidden'
        },{
            width: right_width,
            height: min_height,
            overflow: 'hidden'
        },{
            width: right_width,
            height: min_height,
            overflow: 'hidden'
        }];
        outterFrameStyle = {
            width: left_width,
            height: min_height,
            display: 'flex'
        };
    }

    return {
        innerFrameStyles: innerFrameStyles, //套在图片外层的div样式
        outterFrameStyle: outterFrameStyle, //关乎图像布局的div样式
        frameStyle: frameStyle              //相册最外层样式
    };

}
// 获取图片样式
function getImgStyles(imgs, contain) {

    return Array.prototype.map.call(imgs, function(img, index){
        var container = contain;
        if(imgs.length>2 && imgs.length!=4){
            container = contain[index];
        }
        var imgStyle = getWHdiff(container, {
            width: img.naturalWidth,
            height: img.naturalHeight
        });
        if(imgs.length == 2){
            imgStyle.position = 'absolute';
        }

        return imgStyle;
    });
}

function PFrame() {//定义高度和宽度
    this.setStyles = function (obj, styles) {
        for (var style in styles) {
            obj['style'][style] = styles[style];
        }
    };
    this.setAttr = function(obj, attrs){
        for (var attr in attrs) {
            obj[attr] = attrs[attr];
        }
    };
    this.setImg = function(imgs, contains) {
        var imgObjs = [];
        for(var i=0;i<imgs.length;i++){
            var img_wh ={
                width: imgs[i].naturalWidth,
                height: imgs[i].naturalHeight
            };
            var imgStyles = getWHdiff(contains[i], img_wh);
            this.setStyles(imgs[i],imgStyles);
            imgObjs.push(imgs[i]);
        }
        return imgObjs;
    };
    this.createChildFrame = function(styles, innerObjs) {//迭代一个函数 生成子模块 检测 float 和 子模块 数量的 num float
        var frame = document.createElement('DIV');
        this.setStyles(frame, styles);
        if (innerObjs.sameNums) {
            for (var i = 0; i < innerObjs.sameNums.length; i++) {
                var box = document.createElement('DIV');
                this.setStyles(box, innerObjs.obj.innerFrameStyle);
                if (innerObjs.obj.attr) {
                    this.setAttr(box, innerObjs.obj.attr);
                }
                if(innerObjs.obj.imgStyle){
                    this.setStyles(innerObjs.sameNums[i], innerObjs.obj.imgStyle);
                }

                box.appendChild(innerObjs.sameNums[i]);

                frame.appendChild(box);
            }
        } else {
            for (var obj in innerObjs) {
                if (innerObjs[obj].innerObj) {//若有子模块递归生成
                    var box = this.createChildFrame(innerObjs[obj].innerFrameStyle, innerObjs[obj].innerObj);
                } else {
                    var box = document.createElement('DIV');
                    this.setStyles(box, innerObjs[obj].innerFrameStyle);//相框属性
                    if (innerObjs[obj].attr) {
                        this.setAttr(box, innerObjs[obj].attr);
                    }
                    if (innerObjs[obj].img) {
                        if(innerObjs[obj].imgAttr){
                            this.setAttr(innerObjs[obj].img, innerObjs[obj].imgAttr);
                        }
                        if(innerObjs[obj].imgStyle){
                            this.setStyles(innerObjs[obj].img, innerObjs[obj].imgStyle);
                        }
                        box.appendChild(innerObjs[obj].img);
                    }
                }
                frame.appendChild(box);
            }
        }
        return frame;
    }

}

PFrame.prototype.convertOne = function(obj_1){
    var img = obj_1.children;
    var contain = {
        width: obj_1.offsetWidth,
        height: obj_1.offsetHeight,
    };
    var imgStyles = getImgStyles(img, contain);
    var frameStyles = getFrameStyle(contain, 1);
    var innerObjs = {
        obj: {
            innerFrameStyle: '',
            imgStyle: imgStyles[0],
            img: img[0]
        }
    };
    var father_frame = this.createChildFrame(frameStyles.frameStyle, innerObjs);
    obj_1.innerHTML="";
    obj_1.appendChild(father_frame);

};
PFrame.prototype.convertTwo = function(obj_2){
    var imgs = obj_2.children;
    var contain = {
        width: obj_2.offsetWidth,
        height: obj_2.offsetHeight,
    };
    var imgAttrs = ['left_tx', 'right_tx'];//img 属性
    var imgStyles = getImgStyles(imgs, contain);
    var innerObjs = {
        obj1: {
            img: imgs[0],
            imgAttr: {
                className: imgAttrs[0]
            },
            imgStyle: imgStyles[0]
        },
        obj2: {
            img: imgs[1],
            imgAttr: {
                className: imgAttrs[1]
            },
            imgStyle: imgStyles[0]
        }
    };
    var father_frame = this.createChildFrame(getFrameStyle(contain, 2).frameStyle, innerObjs);
    obj_2.innerHTML="";
    obj_2.appendChild(father_frame);

};
PFrame.prototype.convertThree = function(obj_3){
    var imgs = obj_3.children;
    var width = obj_3.offsetWidth;
    var height = obj_3.offsetHeight;
    var frameStyles = getFrameStyle({
        width: width,
        height: height
    }, 3);
    var innerFrameStyles = frameStyles.innerFrameStyles;

    var imgObjs = Array.prototype.map.call(imgs, function(img){
        return img;
    });
    var imgStyles = getImgStyles(imgs, innerFrameStyles);
    var innerObjs = {
        obj1: {
            innerFrameStyle: innerFrameStyles[0],
            img: imgs[0],
            imgStyle: imgStyles[0]
        },
        obj2: {
            innerFrameStyle: '',
            innerObj: {
                sameNums: Array.prototype.slice.apply(imgs,[1,3]),
                obj: {
                    innerFrameStyle: innerFrameStyles[1],
                    imgStyle: imgStyles[1]
                }

            }
        }
    };
    var father_frame = this.createChildFrame(frameStyles.frameStyle, innerObjs);
    obj_3.innerHTML="";
    obj_3.appendChild(father_frame);

};

PFrame.prototype.convertFour = function(obj_4){
    var imgs = obj_4.children;

    var width = obj_4.offsetWidth;
    var height = obj_4.offsetHeight;
    var frameStyles = getFrameStyle({
        width: width,
        height: height
    }, 4);
    var innerFrameStyle = frameStyles.innerFrameStyles;
    var imgStyles = getImgStyles(imgs, innerFrameStyle);
    var innerObjs = {
        sameNums: Array.prototype.slice.apply(imgs,[0,4]),
        obj: {
            innerFrameStyle: innerFrameStyle,
            imgStyle: imgStyles[0]
        }
    };
    var frame = this.createChildFrame(frameStyles.frameStyle, innerObjs);
    obj_4.innerHTML="";
    obj_4.appendChild(frame);
};

PFrame.prototype.convertFive = function(obj_5){
    var imgs = obj_5.children;
    var width = obj_5.offsetWidth;
    var height = obj_5.offsetHeight;
    var frameStyles = getFrameStyle({
        width: width,
        height: height
    }, 5);
    var innerFrameStyles = frameStyles.innerFrameStyles;
    var imgStyles = getImgStyles(imgs, innerFrameStyles);
    var innerObjs = {
        obj1: {
            innerFrameStyle: '',
            innerObj: {
                obj1: {
                    innerFrameStyle: innerFrameStyles[0],
                    img: imgs[0],
                    imgStyle: imgStyles[0]
                },
                obj2: {
                    innerFrameStyle: frameStyles.outterFrameStyle,
                    innerObj: {
                        sameNums: Array.prototype.slice.apply(imgs,[1,3]),
                        obj: {
                            innerFrameStyle: innerFrameStyles[1],
                            imgStyle: imgStyles[1]
                        }
                    }
                }
            }
        },
        obj2: {
            innerFrameStyle: '',
            innerObj: {
                obj1: {
                    innerFrameStyle: innerFrameStyles[3],
                    img: imgs[3],
                    imgStyle: imgStyles[3]
                },
                obj2: {
                    innerFrameStyle: innerFrameStyles[4],
                    img: imgs[4],
                    imgStyle: imgStyles[4]
                }
            }
        }
    };

    var frame = this.createChildFrame(frameStyles.frameStyle, innerObjs);
    obj_5.innerHTML="";
    obj_5.appendChild(frame);
};

PFrame.prototype.convertSix = function(obj_6){
    var imgs = obj_6.children;

    var width = obj_6.offsetWidth;
    var height = obj_6.offsetHeight;
    var frameStyles = getFrameStyle({
        width: width,
        height: height
    }, 6);
    var innerFrameStyles = frameStyles.innerFrameStyles;
    var imgStyles = getImgStyles(imgs, innerFrameStyles);
    var innerObjs = {
        obj1: {
            innerFrameStyle: '',
            innerObj: {
                obj1: {
                    innerFrameStyle: innerFrameStyles[0],
                    img: imgs[0],
                    imgStyle: imgStyles[0]
                },
                obj2: {
                    innerFrameStyle: frameStyles.outterFrameStyle,
                    innerObj: {
                        sameNums: Array.prototype.slice.apply(imgs,[1,3]),
                        obj: {
                            innerFrameStyle: innerFrameStyles[1],
                            imgStyle: imgStyles[1]
                        }
                    }
                }
            }
        },
        obj2: {
            innerFrameStyle: '',
            innerObj: {
                sameNums: Array.prototype.slice.apply(imgs,[3,6]),
                obj: {
                    innerFrameStyle: innerFrameStyles[3],
                    imgStyle: imgStyles[3]
                }
            }
        }
    };

    var frame = this.createChildFrame(frameStyles.frameStyle, innerObjs);
    obj_6.innerHTML="";
    obj_6.appendChild(frame);
};
function convert() {
    var frames = document.getElementsByClassName('puzzle');
    var handle = new PFrame();
    for(var i=0;i<frames.length;i++){
        switch (frames[i].childElementCount){
            case 1:
                handle.convertOne(frames[i]);
                break;
            case 2:
                handle.convertTwo(frames[i]);
                break;
            case 3:
                handle.convertThree(frames[i]);
                break;
            case 4:
                handle.convertFour(frames[i]);
                break;
            case 5:
                handle.convertFive(frames[i]);
                break;
            case 6:
                handle.convertSix(frames[i]);
                break;
        }
    }
}
(function() {
    convert();

})();