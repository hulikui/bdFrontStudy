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
    this.setImg = function(imgs) {
        var imgstyles = {
            width: '100%',
            height: '100%'
        };
        var imgObjs = [];
        for(var i=0;i<imgs.length;i++){
            this.setStyles(imgs[i],imgstyles);
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
                this.setStyles(box, innerObjs.obj.styles);
                if (innerObjs.obj.attr) {
                    this.setAttr(box, innerObjs.obj.attr);
                }
                box.appendChild(innerObjs.sameNums[i]);

                frame.appendChild(box);
            }
        } else {
            for (var obj in innerObjs) {
                if (innerObjs[obj].innerObj) {//若有子模块递归生成
                    var box = this.createChildFrame(innerObjs[obj].styles, innerObjs[obj].innerObj);
                } else {
                    var box = document.createElement('DIV');
                    this.setStyles(box, innerObjs[obj].styles);
                    if (innerObjs[obj].attr) {
                        this.setAttr(box, innerObjs[obj].attr);
                    }
                    if (innerObjs[obj].img) {
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
    var img = obj_1.children[0];
    var imgstyles = {
        width: '100%',
        height: '100%'
    };
    this.setStyles(img, imgstyles);

};
PFrame.prototype.convertTwo = function(obj_2){
    var imgs = obj_2.children;
    obj_2.style.position ="relative";

    var styles = {
        position: 'absolute',
        left: '0',
        right: '0',
        width: '100%',
        height: '100%'
    };
    var attr1 = {
        className: "left_tx"
    };
    var attr2 = {
        className: "right_tx"
    };
    this.setStyles(imgs[0], styles);
    this.setAttr(imgs[0], attr1);
    this.setStyles(imgs[1], styles);
    this.setAttr(imgs[1], attr2);

};
PFrame.prototype.convertThree = function(obj_3){
    var imgs = obj_3.children;
    var width = obj_3.offsetWidth;
    var height = obj_3.offsetHeight;
    var left_width = width - height/2;
    var right_width = height/2;
    var imgObjs = this.setImg(imgs);

    var styles = {
        width: this.width,
        height: this.height,
        display: 'flex'
    };
    var innerObjs = {
        obj1: {
            styles: {
                width: left_width,
                height: height
            },
            img: imgs[0]
        },
        obj2: {
            styles: {
                width: right_width,
                height: this.height,
            },
            innerObj: {
                sameNums: imgObjs.splice(1,3),
                obj: {
                    styles: {
                        width: right_width,
                        height: right_width
                    }
                }

            }
        }
    };

    var father_frame = this.createChildFrame(styles, innerObjs);
    obj_3.innerHTML="";
    obj_3.appendChild(father_frame);

};

PFrame.prototype.convertFour = function(obj_4){
    var imgs = obj_4.children;
    var imgObjs = this.setImg(imgs);
    var width = obj_4.offsetWidth;
    var height = obj_4.offsetHeight;
    var box_width = width/2 ;
    var box_height = height/2;
    var styles = {
        width: this.width,
        height: this.height,
        display: 'flex',
        flexWrap: 'wrap'
    };

    var innerObjs = {
        sameNums: imgObjs,
        obj: {
            styles: {
                width: box_width,
                height: box_height
            }
        }
    };
    var frame = this.createChildFrame(styles, innerObjs);
    obj_4.innerHTML="";
    obj_4.appendChild(frame);
};

PFrame.prototype.convertFive = function(obj_5){
    var imgs = obj_5.children;
    var imgObjs = this.setImg(imgs);
    var width = obj_5.offsetWidth;
    var height = obj_5.offsetHeight;
    var left_width = width*2/3;
    var right_width = width/3;
    var min_height = height/3;
    var styles = {
        width: width,
        height: height,
        display: 'flex'
    };
    var innerObjs = {
        obj1: {
            styles: {
                width: left_width,
                height: height,
                float: 'left'
            },
            innerObj: {
                obj1: {
                    styles: {
                        width: left_width,
                        height: min_height*2
                    },
                    img: imgObjs[0]
                },
                obj2: {
                    styles: {
                        width: left_width,
                        height: min_height,
                        display: 'flex'
                    },
                    innerObj: {
                        sameNums: [imgObjs[1], imgObjs[2]],
                        obj: {
                            styles: {
                                width: left_width/2,
                                height: min_height,
                            }
                        }
                    }
                }
            }
        },
        obj2: {
            styles: {
                width: right_width,
                height: height
            },
            innerObj: {
                obj1: {
                    styles: {
                        width: right_width,
                        height: right_width
                    },
                    img: imgs[3]
                },
                obj2: {
                    styles: {
                        width: right_width,
                        height: height-right_width
                    },
                    img: imgs[4]
                }
            }
        }
    };

    var frame = this.createChildFrame(styles, innerObjs);
    obj_5.innerHTML="";
    obj_5.appendChild(frame);
};

PFrame.prototype.convertSix = function(obj_6){
    var imgs = obj_6.children;
    var imgObjs = this.setImg(imgs);
    var width = obj_6.offsetWidth;
    var height = obj_6.offsetHeight;
    var left_width = width*2/3;
    var right_width = width/3;
    var min_height = height/3;
    var styles = {
        width: width,
        height: height,
        display: 'flex'
    };
    var innerObjs = {
        obj1: {
            styles: {
                width: left_width,
                height: height
            },
            innerObj: {
                obj1: {
                    styles: {
                        width: left_width,
                        height: min_height*2
                    },
                    img: imgObjs[0]
                },
                obj2: {
                    styles: {
                        width: left_width,
                        height: min_height,
                        display: 'flex'
                    },
                    innerObj: {
                        sameNums: [imgObjs[1], imgObjs[2]],
                        obj: {
                            styles: {
                                width: left_width/2,
                                height: min_height
                            }
                        }
                    }
                }
            }
        },
        obj2: {
            styles: {
                width: right_width,
                height: height
            },
            innerObj: {
                sameNums: imgObjs.splice(3,6),
                obj: {
                    styles: {
                        width: right_width,
                        height: min_height
                    }
                }
            }
        }
    };

    var frame = this.createChildFrame(styles, innerObjs);
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