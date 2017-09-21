<p align="center">
  <a href="http://ant.design">
    <img width="150" src="https://github.com/love-fay/fay-sso/blob/master/fay-admin/src/assets/images/logo/150%3D150.png">
  </a>
</p>

# Fay Sso

## Test

> > 让我们直接先来测试这个例子，然后看下我实现的想法，你会发现它是如此的简单！
>
> > 下载这个例子，你需要下载整个fay-sso文件夹，因为fay-uc中的lib被fay-admin中的main.js使用了（当然也可以单独打包给fay-admin使用，因为我们项目中经常会涉及与服务端的对接代码，所以每次更换地址都要重新打包很麻烦，于是直接引用了），所以我需要添加package.json在fay-admin和fay-uc的父级目录，当然我们需要再fay-sso目录下执行npm install
>
> > 进入fay-admin目录下，然后npm start，进入fay-uc，然后npm start
>
> > fay-admin的服务默认端口8000，fay-uc的服务默认端口为8100，你也可以修改它。
>
> > 启动成功后，打开浏览器，进入http://127.0.0.1:8000/ 如果你没有登录，将跳转到登录页面，然后随便输入账号密码，点击回车将跳转至主页面，这时你可以在右上角看到你登录后的用户名。
>
> > 安全是相对的，session是基于cookie的，这样我们为什么使用session来实现sso，我们完全可以很简单地使用cookie实现sso，请求服务端的时候带入token（你可以使用jwt实现你的token）。

## 装逼时刻
> > let us test this example,then see my idea,you will find it is so simple!
> 
> > download this example,you need down all of fay-sso,because lib of fay-uc is used by main.js of fay-admin,so I need to add package.json in father of fay-admin and fay-uc,of course,we need npm install under fay-sso。
> 
> > npm install under fay-sso and fay-admin and fay-uc
> 
> > cd fay-admin and npm start,then cd fay-uc and npm start
> 
> > The fay-admin's server port default is 8000, the fay-uc's server port default is 8100,you can also change it.
> 
> > All ready,you could open the browser,look for 127.0.0.1:8000,if you not login,it returns to login page,then you input any word to login.You will find it returns to home page and look top right corner.
> 
> > let's change fay-admin's server port to 8001,and open 127.0.0.1:8001 in your browser,you can find it has logined.Yeah,this is sso.
> 
> > Safety is relative,session is based on cookie,so why we use session achieve sso?We use cookie completely,then request server with token(you can use jwt).
> 

## fay-uc/src/目录下有一个config.json文件
  <pre>
  {
    "location": "http://127.0.0.1:8100",
    "postMessageDomain": "http://127.0.0.1:8100",
    "cookieMaxAge": "604800",
    "allowedDomain": [
      "127.0.0.1:8000",
      "*"
    ],
    "secure": "false"
  }
  </pre>
> location是fay-uc的域，postMessageDomain是fay-admin利用postMessageDomain发送给指定的域（也就是fay-uc啦），cookieMaxAge是记住密码保存的时间，allowedDomain是允许那么域使用fay-uc进行sso，这里的*就是通配。secure是实现https需要使用到的，代码里暂时没涉及。

## How
> 首先先上两张图，主要是根据这两张图实现，你会发现就是这么简单！
<p align="center">
  <a href="http://ant.design">
    <img src="https://github.com/love-fay/images/blob/master/sso/20170210150705196.jpeg">
  </a>
</p>

<p align="center">
  <a href="http://ant.design">
    <img src="https://github.com/love-fay/images/blob/master/sso/20170210150735478.jpeg">
  </a>
</p>

> > 我简单描述下：比如现在有a.com、b.com、uc.com；a.com和b.com中利用iframe嵌套uc.com，利用html5跨域通讯postMessage将在a.com中登录的信息告知uc.com,然后uc.com将需要保存的信息存入cookie，a.com也将需要保存的信息存入cookie；此时访问b.com时，b.com中的iframe中的uc.com会将cookie中的登录信息通过postMessage告知b.com这些信息，然后b.com将这些信息存入cookie中，此时b.com就是已登录状态了，无需再登录，这样便实现了单点登录。以上反之则是未登录。
>
> > 上一种方式对于安全性较高的Safari和Opera浏览器是不可行的，不同之处在于这些浏览器不允许iframe中跨域存储cookie，此时解决方案是在a.com中登录后将信息存入cookie，然后跳转至利用iframe嵌套a.com的uc.com，a.com将cookie中的登录信息传递给uc.com，这样uc.com就获取到了登录信息，然后存储进cookie，然后利用浏览器路径替换方式进入a.com，这样便实现了单点登录。
>
> > 需要注意一点：postMessage只将信息发送给约定好的域，iframe只被约定好的域嵌套！

## Why I do it
> 以前我项目凡是涉及到单点登录的时候都是基本需要用到cas等这些框架，繁琐的很，改源码又很麻烦，主要是实现各种弹出框登录、指定跳转、前后端分离等会难以控制。服务端控制前端用户信息基本就是session，而session又是基于cookie的，那为什么我们不直接用cookie。以前没有H5的年代，光有cookie很难实现单点登录，如今使用H5的postMessage很容易实现了。于是我决定在前端实现了单点登录。我的代码都很基础，非常简单，坦白了说没什么东西。但是从无到有的那段时间让我很纠结。不要相信第三方实现单点登录的框架多安全，安全这东西很透明的，都是相对的，最好是自己内部定义一套安全的标准以防止被攻击。
