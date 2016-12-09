### 已完成
* 实现基本的拼图、瀑布和木桶功能
* 曝露的接口只能设置padding
* 相框div必须设置高度和宽度(px)
* 拼图布局
    ``` stylus
        <div classname="puzzle">
           <img>
           <img>
            ……
        </div>
         根据div内img的个数（1-6）自动布局
    ``` 

* 瀑布布局
    
    ``` stylus
        <div classname="waterfalls_x">
                <img>
                <img>
                 ……
         </div>
         x 代表瀑布布局内部有x列放置图片 默认为四列
         根据 div 的宽度设置每张图片的显示宽度和生成随机高度
         内部 img 数量不限 div 高度设置最小高度
         瀑布布局每次选择最小高度列插入图片
    ``` 

*  木桶布局

    ``` stylus
        <div classname="barrel">
           <img>
           <img>
            ……
        </div>
        每行实际高度围绕 200px 上下浮动, 暂时默认 200px 上下浮动
        图片的实际大小 根据 原始长宽比 和 实际相框的大小以及每行高度进行缩放
        内部 img 数量不限 div 高度设置最小高度
        内部布局为 flex且无额外div 用户设置为padding转为margin即可
    ``` 

### 未完成
* 封装的不是太好
* 木桶布局相每行最小和最大张数等相关功能未实现