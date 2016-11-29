(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';



    function IfeAlbum() {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };

        // 公有变量可以写在这里
        // this.xxx = ...

    }

    // 私有变量可以写在这里
    // var xxx = ...
    //获取需要裁剪图片的样式
    function getClipImgStyle(contain, img) {
        var wdiff = img.width-contain.width*img.height/contain.height;
        var hdiff=0;
        var styles;
        wdiff = parseInt(wdiff);
        if(wdiff<0){//高度不够,以宽度对齐缩放，高度溢出
            hdiff = img.height-contain.height*img.width/contain.width;
            hdiff = parseInt(hdiff);
            var height = img.height*contain.width/img.width;
            hdiff = height-contain.height;
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
            wdiff = width -contain.width;
            styles = {
                width: width,
                height: contain.height,
                marginLeft: -wdiff/2
            }
        }
        return styles;
    }
    //根据对象设置样式
    var setStyles = function (obj, styles) {
        for (var style in styles) {
            obj['style'][style] = styles[style];
        }
    };
    //根据对象设置属性
    var setAttr = function(obj, attrs){
        for (var attr in attrs) {
            obj[attr] = attrs[attr];
        }
    };
    //重塑图片
    var setImg = function(imgs, contains) {
        var imgObjs = [];
        for(var i=0;i<imgs.length;i++){
            var img_wh ={
                width: imgs[i].naturalWidth,
                height: imgs[i].naturalHeight
            };
            var imgStyles = getClipImgStyle(contains[i], img_wh);
            this.setStyles(imgs[i],imgStyles);
            imgObjs.push(imgs[i]);
        }
        return imgObjs;
    };
    function getPuzzleFrameStyle(frameObj, nums) {
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

    function getPuzzleImgStyles(imgs, contain) {

        return Array.prototype.map.call(imgs, function(img, index){
            var container = contain;
            if(imgs.length>2 && imgs.length!=4){
                container = contain[index];
            }
            var imgStyle = getClipImgStyle(container, {
                width: img.naturalWidth,
                height: img.naturalHeight
            });
            if(imgs.length == 2){
                imgStyle.position = 'absolute';
            }

            return imgStyle;
        });
    }
    //根据对象个数确定拼图布局
    var puzzleLayout = function(obj) {//obj相册

        var imgs = obj.children;
        var contain = {
            width: obj.offsetWidth,
            height: obj.offsetHeight
        };
        var imgStyles;
        var frameStyles;
        var frameStyle;
        var innerObjs;
        var innerFrameStyles;
        if(imgs.length == 1){
            imgStyles = getPuzzleImgStyles(imgs, contain);
            frameStyles = getPuzzleFrameStyle(contain, 1);
            frameStyle = frameStyles.frameStyle;
            innerObjs = {
                obj: {
                    innerFrameStyle: '',
                    imgStyle: imgStyles[0],
                    img: imgs[0]
                }
            };
        }else if(imgs.length == 2){
            var imgAttrs = ['left_tx', 'right_tx'];//img 属性
            imgStyles = getPuzzleImgStyles(imgs, contain);
            frameStyles = getPuzzleFrameStyle(contain, 2);
            frameStyle = frameStyles.frameStyle;
            innerObjs = {
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

        }else if(imgs.length ==3){
            frameStyles = getPuzzleFrameStyle({
                width: width,
                height: height
            }, 3);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            innerObjs = {
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

        }else if(imgs.length == 4){
            frameStyles = getPuzzleFrameStyle({
                width: width,
                height: height
            }, 4);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            innerObjs = {
                sameNums: Array.prototype.slice.apply(imgs,[0,4]),
                obj: {
                    innerFrameStyle: innerFrameStyles,
                    imgStyle: imgStyles[0]
                }
            };
        }else if(imgs.length == 5){
            frameStyles = getPuzzleFrameStyle({
                width: width,
                height: height
            }, 5);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            innerObjs = {
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


        }else if(imgs.length == 6) {
            frameStyles = getPuzzleFrameStyle({
                width: width,
                height: height
            }, 6);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            innerObjs = {
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
                                sameNums: Array.prototype.slice.apply(imgs, [1, 3]),
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
                        sameNums: Array.prototype.slice.apply(imgs, [3, 6]),
                        obj: {
                            innerFrameStyle: innerFrameStyles[3],
                            imgStyle: imgStyles[3]
                        }
                    }
                }
            };
        }
        return {
            innerObjs: innerObjs,   //相册内部所有对象
            frameStyle: frameStyle  //相框
        };

    }

    // 拼图布局下重塑相册 拼图布局比较复杂
    function puzzleReSet(albumStyles, innerObjs) {
        var frame = document.createElement('DIV');
        this.setStyles(frame, albumStyles);
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


    /************* 以下是本库提供的公有方法 *************/



    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    IfeAlbum.prototype.setImage = function (images, option) {//每次执行设置一次相册

        if (typeof images === 'string') {
            // 包装成数组处理
            this.setImage([images]);
            return;
        }

        // 实现拼图布局
        if(option.type == 'puzzle'){
            var puzzleNewLayouts = puzzleLayout(images);
            puzzleReSet(puzzleNewLayouts.frameStyle, puzzleNewLayouts.innerObjs);
        }

    };

    IfeAlbum.prototype.run = function () {//每次执行设置一次相册

        // 实现拼图布局
        this.setLayout('puzzle');
        var layouts = this.getLayout();
        var puzzles = layouts.PUZZLE;//所有相册
        puzzles.forEach(function(frame, index){

        });


    };

    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function(key, index) {
        //拼图布局处理
        var imgs = this.LAYOUT[key][index].children;
        return Array.prototype.map.call(imgs, function(img){//返回相冊數組
            return img;
        });

    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.addImage = function (image) {
        //根据img的长度确定拼图布局


    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {

    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (className) {//存储相册所有信息
        var divs = document.getElementsByClassName(className);
        var frames =  Array.prototype.map.call(divs, function(div){
            return div;
        });
        if(className == 'puzzle'){
            this.LAYOUT.PUZZLE = frames;
        }else if(className.indexOf('falls')>0){
            this.LAYOUT.WATERFALL = frames;

        }else if(className.indexOf('bucket')>0){
            this.LAYOUT.BARREL = frames;
        }

    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {
        return this.LAYOUT;
    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口



    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));