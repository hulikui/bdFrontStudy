### [flex布局详解](https://segmentfault.com/a/1190000002910324)
 *  flex-flow:0, 1 
    // 0:flex-direction: row | row-reverse | column | column-reverse  1: flex-wrap: nowrap | wrap | wrap-reverse 多行显示
 *  justify-content: 
    flex-start | flex-end | center | space-between | space-around;//规定一行内显示方式
 *  align-content: 
    flex-start | flex-end | center | space-between | space-around | stretch //规定容器内 每行对齐方式
 *  align-items: 
    flex-start | flex-end | center | baseline | stretch// 容器内 每个元素对齐方式
 *  order:
    int值 值越小越靠前
 *  align-self（flex items） 用来在单独的伸缩项目上覆写默认的对齐方式
 *  flex-grow 、.flex-shrink 伸缩倍数