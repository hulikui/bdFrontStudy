## 前端基础知识
### 一个普通网站访问的过程
简单概括一下，对于我们普通的网站访问，涉及到的技术就是：

* 用户操作浏览器访问，浏览器向服务器发出一个 HTTP 请求；
* 服务器接收到 HTTP 请求，Web Server 进行相应的初步处理，使用服务器脚本生成页面；
* 服务器脚本（利用Web Framework）调用本地和客户端传来的数据，生成页面；
* Web Server 将生成的页面作为 HTTP 响应的 body，根据不同的处理结果生成 HTTP header，发回给客户端；
* 客户端（浏览器）接收到 HTTP 响应，通常第一个请求得到的 HTTP 响应的 body 里是 HTML 代码，于是对 HTML 代码开始解析；
* 解析过程中遇到引用的服务器上的资源（额外的 CSS、JS代码，图片、音视频，附件等），再向 Web Server 发送请求，Web Server 找到对应的文件，发送回来；
* 浏览器解析 HTML 包含的内容，用得到的 CSS 代码进行外观上的进一步渲染，JS 代码也可能会对外观进行一定的处理；
* 用户与页面交互（点击，悬停等等）时，JS 代码对此作出一定的反应，添加特效与动画；
* 交互的过程中可能需要向服务器索取或提交额外的数据（局部的刷新，类似微博的新消息通知），一般不是跳转就是通过 JS 代码（响应某个动作或者定时）向 Web Server 发送请求，Web Server 再用服务器脚本进行处理（生成资源or写入数据之类的），把资源返回给客户端，客户端用得到的资源来实现动态效果或其他改变。

### [flex布局运用][1]
导航居中

``` stylus
  display: flex;
  justify-content: space-between;//两端对齐
  align-items:center;//居中
```
### css 样式

``` stylus
  box-shadow: 3px 3px 3px;//阴影
  white-space:normal;//强制换行
  border-collapse:collapse;// table 中把边框合并为一条边
  <td rowspan="2">跨列</td>
  <td colspan="2">跨行</td>
```
### html5 标签

``` stylus
<dl>
<dt>列表标题</dt>
<dd>列表内容</dd>
<dd>列表内容</dd>
...
</dl>
文章组织结构
<header></header>
<article></article>
<footer></footer>
```




  [1]: http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool