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
``` 
    <div classname="waterfalls_x">
            <img>
            <img>
             ……
     </div>
     x 代表几列瀑布布局 默认为四列
     根据div的宽度设置每张图片的显示宽度和生成随机高度
     内部img数量不限 div高度设置最小高度
``` 
*  木桶布局
``` 
    <div classname="barrel">
       <img>
       <img>
        ……
    </div>
    高度默认为200px 上下浮动,接口可以曝露给用户
    根据div的宽度设置每张图片的显示宽度和生成随机高度
    内部img数量不限 div高度设置最小高度
``` 
### 未完成
* 封装的不是太好
* 木桶布局相每行最小和最大张数等相关功能未实现