## 定位 [position][1] 

``` stylus
/* 关键字值 */
position: static;//正常的布局行为，即元素在文档流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效
position: relative;
position: absolute;//不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置
position: fixed;//不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素会出现在的每页的固定位置
position: sticky;

/* 全局值 */
position: inherit;
position：initial;
position: unset;
```

### float
居中自适应
* 左边div设置左浮动，右边设置右浮动，在左右div后添加一个div后，最后一个div自动居中，并自适应

``` stylus
<div>左</div>
<div>右</div>
<div>中</div>
```
### css

``` stylus
display: inline-block;//限制div内
overflow:hidden 
```



  [1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/position