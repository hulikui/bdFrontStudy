(function (window) {

    // �����ǵ������⣬����ʹ���ϸ�ģʽ�������ܷ���Ǳ������
    'use strict';



    function IfeAlbum() {

        // ���ֵ�ö������
        this.LAYOUT = {
            PUZZLE: 1,    // ƴͼ����
            WATERFALL: 2, // �ٲ�����
            BARREL: 3     // ľͰ����
        };

        // ���б�������д������
        this.padding = {
            PUZZLE: {
                x: '',
                y: ''
            },
            WATERFALL: {
                x: '',
                y: ''
            }, // �ٲ�����
            BARREL: {
                x: '',
                y: ''
            }
        }


    }

    // ˽�б�������д������
    // var xxx = ...
    var padding = {
        PUZZLE: {
            x: 0,
            y: 0
        },
        WATERFALL: {
            x: 0,
            y: 0
        }, // �ٲ�����
        BARREL: {
            x: 0,
            y: 0
        }
    };
    //��ʱ������
    var temp;
    //��ȡ��Ҫ�ü�ͼƬ����ʽ
    function getClipImgStyle(contain, img) {
        var wdiff = img.width-contain.width*img.height/contain.height;
        var hdiff=0;
        var styles;
        wdiff = parseInt(wdiff);
        if(wdiff<0){//�߶Ȳ���,�Կ�ȶ������ţ��߶����
            hdiff = img.height-contain.height*img.width/contain.width;
            hdiff = parseInt(hdiff);
            var height = img.height*contain.width/img.width;
            hdiff = height-contain.height;
            styles={
                width: contain.width,
                height: height,
                marginTop: -hdiff/2
            }
        }else if(wdiff == 0){//֤������һ��
            styles = {
                width: '100%',
                height: '100%'
            }
        }else{//�����߶�Ϊ������,������
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
    //���ݶ���������ʽ
    var setStyles = function (obj, styles) {
        for (var style in styles) {
            obj['style'][style] = styles[style];
        }
    };
    //���ݶ�����������
    var setAttr = function(obj, attrs){
        for (var attr in attrs) {
            obj[attr] = attrs[attr];
        }
    };
    //����ͼƬ
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
        var innerFrameStyles = []; //����ͼƬ����div��ʽ
        var outterFrameStyle = [];//�غ�ͼ�񲼾ֵ�div��ʽ
        var frameStyle = { //����style
            width: width,
            height: height,
            display: 'flex'
        };
        //��������Ч�� ���λ��
        var paddingStyles = {};
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
            paddingStyles = {
                obj1: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.x*2,
                    height: height
                },
                obj2: {
                    top: height/2 - padding.PUZZLE.x,
                    right: 0,
                    width: height/2,
                    height: padding.PUZZLE.x*2
                }
            };
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
            paddingStyles = {
                obj1: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.x*2,
                    height: height
                },
                obj2: {
                    left: 0,
                    top: height/2-padding.PUZZLE.x,
                    width: width,
                    height: padding.PUZZLE.x*2
                }
            };
            innerFrameStyles = {
                width: left_width,
                height: right_width,
                overflow: 'hidden'
            };
        }else if(nums == 5){
            left_width = width*2/3;
            right_width = width/3;
            paddingStyles = {
                obj1: {
                    left: 0,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: left_width,
                    height: padding.PUZZLE.x*2
                },
                obj2: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.y*2,
                    height: height
                },
                obj3: {
                    left: right_width-padding.PUZZLE.y,
                    top: min_height*2,
                    width: padding.PUZZLE.y*2,
                    height: min_height
                },
                obj4: {
                    top: right_width - padding.PUZZLE.x,
                    right: 0,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                }
            };
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
            paddingStyles = {
                obj1: {
                    left: 0,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: left_width,
                    height: padding.PUZZLE.x*2
                },
                obj2: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.y*2,
                    height: height
                },
                obj3: {
                    left: right_width-padding.PUZZLE.y,
                    top: min_height*2,
                    width: padding.PUZZLE.y*2,
                    height: min_height
                },
                obj4: {
                    left: left_width,
                    top: min_height - padding.PUZZLE.x,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                },
                obj5: {
                    left: left_width,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                }
            };
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
            innerFrameStyles: innerFrameStyles, //����ͼƬ����div��ʽ
            outterFrameStyle: outterFrameStyle, //�غ�ͼ�񲼾ֵ�div��ʽ
            frameStyle: frameStyle,              //����������ʽ
            paddingStyles: paddingStyles        //padding������Ч��
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
    //���ݶ������ȷ��ƴͼ����
    var puzzleLayout = function(obj) {//obj���

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
        var imgPaddings = {};
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
            var imgAttrs = ['left_tx', 'right_tx'];//img ����
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
            frameStyles = getPuzzleFrameStyle(contain, 3);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
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
            frameStyles = getPuzzleFrameStyle(contain, 4);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
            innerObjs = {
                sameNums: Array.prototype.slice.apply(imgs,[0,4]),
                obj: {
                    innerFrameStyle: innerFrameStyles,
                    imgStyle: imgStyles[0]
                }
            };
        }else if(imgs.length == 5){
            frameStyles = getPuzzleFrameStyle(contain, 5);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
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
            frameStyles = getPuzzleFrameStyle(contain, 6);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
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
            innerObjs: innerObjs,   //����ڲ����ж���
            frameStyle: frameStyle,  //���
            imgPaddings: imgPaddings // ��Ƭ���
        };

    }

    // ƴͼ������������� ƴͼ���ֱȽϸ���
    function puzzleReSet(albumStyles, innerObjs) {
        var frame = document.createElement('DIV');
        setStyles(frame, albumStyles);
        if (innerObjs.sameNums) {
            for (var i = 0; i < innerObjs.sameNums.length; i++) {
                var box = document.createElement('DIV');
                setStyles(box, innerObjs.obj.innerFrameStyle);
                if (innerObjs.obj.attr) {
                    setAttr(box, innerObjs.obj.attr);
                }
                if(innerObjs.obj.imgStyle){
                    setStyles(innerObjs.sameNums[i], innerObjs.obj.imgStyle);
                }

                box.appendChild(innerObjs.sameNums[i]);

                frame.appendChild(box);
            }
        } else {
            for (var obj in innerObjs) {
                if (innerObjs[obj].innerObj) {//������ģ��ݹ�����
                    var box = puzzleReSet(innerObjs[obj].innerFrameStyle, innerObjs[obj].innerObj);
                } else {
                    var box = document.createElement('DIV');
                    setStyles(box, innerObjs[obj].innerFrameStyle);//�������
                    if (innerObjs[obj].attr) {
                        setAttr(box, innerObjs[obj].attr);
                    }
                    if (innerObjs[obj].img) {
                        if(innerObjs[obj].imgAttr){
                            setAttr(innerObjs[obj].img, innerObjs[obj].imgAttr);
                        }
                        if(innerObjs[obj].imgStyle){
                            setStyles(innerObjs[obj].img, innerObjs[obj].imgStyle);
                        }
                        box.appendChild(innerObjs[obj].img);
                    }
                }
                frame.appendChild(box);
            }
        }
        return frame;
    }

    function setPaddings(frame, paddings) {
        for(var style in paddings) {
            var label = document.createElement('LABEL');
            label.className = 'label_imgPadding';
            setStyles(label, paddings[style]);
            frame.appendChild(label);
        }
    }

    function getFrames(divs){
        return Array.prototype.map.call(divs, function(div){
            return div;
        });
    }
    function createFallFrame(fallFarme) { //���ɿ��,Ĭ������
        var cols = parseInt(fallFarme.className.split(' ')[0].split('_')[1]) || 4;
        var col_width = (fallFarme.offsetWidth - padding.WATERFALL.y*(cols + 1)) / cols;
        var frame = document.createElement('DIV');// �����
        var styles = {
            width: fallFarme.offsetWidth,
            minHeight: fallFarme.offsetHeight
        };
        frame.className = 'fall_cols_parent';
        setStyles(frame, styles);
        for(var i=0;i<cols;i++) {//����
            var item = document.createElement('DIV');
            item.className = 'fall_cols';
            var itemStyle = {
                width: col_width,
                minHeight: styles.minHeight,
                marginLeft: padding.WATERFALL.y,
                marginTop: padding.WATERFALL.y
            };
            if(i === (cols-1)){
                itemStyle.marginRight = padding.WATERFALL.y;
            }
            setStyles(item, itemStyle);
            frame.appendChild(item);
        }
        return {
            frame: frame,
            col_width: col_width
        };
    }

    function getPhotoStyles(frame, width) {//style , src
        return Array.prototype.map.call(frame.children, function(img){
            var contain = {
                width: width,
                height: width + Math.random()*100
            };
            var imgWh = {
                width:img.naturalWidth,
                height: img.naturalHeight
            };

            var imgStyles = getClipImgStyle(contain, imgWh);
            return {
                src: img.src,
                style: imgStyles,
                contain: contain
            };
        });

    }
    function getHight(obj){
        var sum = 0;
        var items = obj.children;
        Array.prototype.forEach.call(items, function(item){
            var height = parseInt(item.style.height.split('px')[0]);
            sum += height;
        });
        return sum;
    }

     function getFallTarget(frame) {
        var cols = frame.children;
        var res = getHight(cols[0]);
        var node=cols[0];
        for(var i=1;i<cols.length;i++){
            var height = getHight(cols[i]);
            if(res > height){
                res = height;
                node=cols[i];
            }
        }
        return node;
    }

        function createChildFrame(frameObj, img) {
            var div = document.createElement('DIV');
            if(frameObj.attr){
                setAttr(div, frameObj.attr);
            }
            if(frameObj.styles){
                setStyles(div, frameObj.styles);
            }
            div.appendChild(img);

            return div;
        }
    /************* �����Ǳ����ṩ�Ĺ��з��� *************/



    /**
     * ��ʼ�����������
     * �����ԭ������ͼƬʱ���÷������滻ԭ��ͼƬ
     * @param {(string|string[])} image  һ��ͼƬ�� URL �����ͼƬ URL ��ɵ�����
     * @param {object}            option ������
     */
    IfeAlbum.prototype.setImage = function (images, option) {//ÿ��ִ������һ�����

        if (typeof images === 'string') {
            // ��װ�����鴦��
            this.setImage([images]);
            return;
        }

        // ʵ��ƴͼ����
        if(option.type == 'puzzle'){
            var puzzleNewLayouts = puzzleLayout(images);//����img_frame���ɲ���
            var newFrame = puzzleReSet(puzzleNewLayouts.frameStyle, puzzleNewLayouts.innerObjs);//���ݲ�����������frame_dom
            images.innerHTML = '';
            images.appendChild(newFrame);
            setPaddings(images, puzzleNewLayouts.imgPaddings);//��������-ͼƬpadding
        }else if(option.type == 'falls'){
            var imgObjs = images.map(function(img){
                var imgDom = document.createElement('IMG');
                imgDom.src = img.src;
                setStyles(imgDom, img.style);
                img.contain.marginBottom = padding.WATERFALL.x;
                var childFrame = createChildFrame({
                    styles: img.contain
                }, imgDom);

                return childFrame;
            });
            this.LAYOUT.WATERFALL[option.index] = imgObjs;//�������index�滻ԭ�е�img
        }

    };

    IfeAlbum.prototype.run = function () {//ÿ��ִ������һ�����

        // ʵ��ƴͼ����
        var _this = this;
        this.setLayout('puzzle');
        this.setLayout('falls');
        var layouts = this.getLayout();
        var puzzles = layouts.PUZZLE;//�������
        var falls = layouts.WATERFALL;
        puzzles.forEach(function(frame){
            _this.setImage(frame, {type: 'puzzle'});
        });
        falls.forEach(function(frame, index){
            //�����ٲ���������
            var newFallFrame = createFallFrame(frame);
            //����ÿ��ͼƬ����ʽ
            temp = newFallFrame.frame;
            var imgObjs = getPhotoStyles(frame, newFallFrame.col_width);
            //���ɺ����ͼƬ
            _this.addImage(imgObjs, {
                type: 'falls',
                index: index
            });
            //�滻ԭ��������Ԫ��
            frame.innerHTML = '';
            frame.appendChild(temp);

        })


    };

    /**
     * ��ȡ�������ͼ���Ӧ�� DOM Ԫ��
     * ���Բ��� �����Ǹ�����Ԫ��
     * @return {HTMLElement[]} �������ͼ���Ӧ�� DOM Ԫ����ɵ�����
     */
    IfeAlbum.prototype.getImageDomElements = function(frame) {
        //ƴͼ���ִ���
        var imgs = frame.children;
        return Array.prototype.map.call(imgs, function(img){//�������Ԕ��M
            return img;
        });

    };



    /**
     * ��������ͼƬ
     * ��ƴͼ�����£�����ͼƬ�������¼��㲼�ַ�ʽ��������������β��׷��ͼƬ
     * @param {(string|string[])} image һ��ͼƬ�� URL �����ͼƬ URL ��ɵ�����
     */
    IfeAlbum.prototype.addImage = function (image, option) {
        //����imgs������ʽ
        if(option.type=='falls'){
            this.setImage(image, {
                type: option.type,
                index: option.index
            });
            var imgs = this.LAYOUT.WATERFALL[option.index];
            imgs.forEach(function(img){
                var target = getFallTarget(temp);
                target.appendChild(img);
            });
        }

    };



    /**
     * �Ƴ�����е�ͼƬ
     * @param  {(HTMLElement|HTMLElement[])} image ��Ҫ�Ƴ���ͼƬ
     * @return {boolean} �Ƿ�ȫ���Ƴ��ɹ�
     */
    IfeAlbum.prototype.removeImage = function (image) {

    };



    /**
     * �������Ĳ���
     * @param {number} layout ����ֵ��IfeAlbum.LAYOUT �е�ֵ
     */
    IfeAlbum.prototype.setLayout = function (className) {//�洢���������Ϣ


        if(className == 'puzzle'){
            var divs = document.getElementsByClassName(className);
            this.LAYOUT.PUZZLE = getFrames(divs);

        }else if(className.indexOf('falls')>=0){
            this.LAYOUT.WATERFALL = getFrames(document.querySelectorAll('div[class^="falls"]'));

        }else if(className.indexOf('bucket')>0){
            this.LAYOUT.BARREL = frames;
        }

    };



    /**
     * ��ȡ���Ĳ���
     * @return {number} ����ö�����͵�ֵ
     */
    IfeAlbum.prototype.getLayout = function() {
        return this.LAYOUT;
    };



    /**
     * ����ͼƬ֮��ļ��
     * ע�����ֵ������ͼƬ��ļ�࣬��Ӧֱ������ͼƬ�� margin ���ԣ������Ͻ�ͼ����ߺ��ϱ�Ӧ�ý���������ߺ��ϱ�
     * ��᱾��� padding ʼ���� 0���û����޸�������Ŀհ���Ҫ�Լ��������Ԫ�ص� padding
     * @param {number}  x  ͼƬ֮��ĺ�����
     * @param {number} [y] ͼƬ֮��������࣬����� undefined ���ͬ�� x
     */
    IfeAlbum.prototype.setGutter = function (type, x, y) {
        if(typeof x != 'number'){
            return;
        }
        if(!y || typeof y!='number'){
            y = x;
        }
        if(type == 'PUZZLE' || type == 'WATERFALL' || type == 'BARREL'){
            padding[type].x = x;
            padding[type].y = y;
        }
    };



    /**
     * ������ͼƬʱȫ�����ͼƬ
     */
    IfeAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * ��ֹ���ͼƬʱȫ�����ͼƬ
     */
    IfeAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * ��ȡ���ͼƬʱȫ�����ͼƬ�Ƿ�����
     * @return {boolean} �Ƿ�����ȫ�����
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**
     * ����ľͰģʽÿ��ͼƬ����������
     * @param {number} min ����ͼƬ��������
     * @param {number} max ���ͼƬ��������
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // ע���쳣����Ĵ�����һ����׳�Ŀ�
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // ���ʵ��

    };



    /**
     * ��ȡľͰģʽÿ��ͼƬ��������
     * @return {number} ���ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * ��ȡľͰģʽÿ��ͼƬ��������
     * @return {number} ����ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * ����ľͰģʽÿ�и߶ȵ������ޣ���λ����
     * @param {number} min ��С�߶�
     * @param {number} max ���߶�
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * ��ȡľͰģʽÿ�и߶ȵ�����
     * @return {number} ���ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * ��ȡľͰģʽÿ�и߶ȵ�����
     * @return {number} ����ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // �������ӵ������ӿ�



    /************* �����Ǳ����ṩ�Ĺ��з��� *************/



    // ʵ����
    if (typeof window.ifeAlbum === 'undefined') {
        // ֻ�е�δ��ʼ��ʱ��ʵ����
        window.ifeAlbum = new IfeAlbum();
        window.ifeAlbum.setGutter('PUZZLE', 2);
        window.ifeAlbum.setGutter('WATERFALL', 2);
        window.ifeAlbum.run();
    }

}(window));