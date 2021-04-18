# vscode里的所有插件都可以通过应用商店免费下载

### VScode常用快捷键
	tab: 缩进一个表单空位
	标签名+tab: 快速生成标签
	shift+tab: 反方向缩进一个表单空位
	ctrl+a:全选
	ctrl+s:保存
	ctrl+z:返回一步操作
	ctrl+y:前进一步操作
	ctrl+alt+ ↑ : 向上面添加光标
	ctrl+alt+ ↓ : 向下面添加光标
	ctrl+f:搜索,同时操作多个一样的词组
  ctrl+shift+→：向右选择到空格为止
  shift+end: 光标跳转至行位
	**以下是Hbuilder中快捷键,在vscode需要修改快捷键,[]中是vscode原本的快捷键**
	ctrl+左键:选中多个光标 [alt+左键]
  ctrl+r:预览网页 [alt+l alt+o]
	ctrl+shift+r:复制内容到下面 [shift+alt+↓]
	ctrl+d:删除当前行 [ctrl+shift+k]
	ctrl+k:格式化代码 [shift+alt+f]
	ctrl+↑:向上移动选中行 [alt+↑]
	ctrl+↓:向下移动选中行 [alt+↓]
  ctrl+shift+p: 选择join line一键清除换行
  //[\s\S]*?\n: ctrl+f用第三个正则一键删除单行注释
  /\*(.|\r\n|\n)*?\*/: 正则一键删除多行注释
  <!--(.*?)-->: 正则一键删除html注释
  \s: 正则一键删除空格

### 一个换行为2个空格
	到设置中找到Tab Size 修改一个表单空两个空格,再单击Editor:Detect Indentation 把勾取消就可以更改一个

### 软换行
  在设置中搜索wrap,把word wrap设置为on,这样在单行超出视口范围自动换行

	表格缩减的长度了,主题默认就使用Dark+(default dark)

### 网页拖放即时预览
  关于网页拖动即时预览,而不是在拖动网页结束以后才预览网页的问题,右键我的电脑->属性->高级->性能效果->设置->让windows选择计算机的最佳设置->勾选拖动时显示窗口内容->应用->确认

### 打开文件过多的处理
  不需要点击文件目录然后点击打开的编辑器来查看,太麻烦,直接在上面标题栏hover就会出现横向滚动条,或者直接在标题栏上滑动鼠标滚轮

### typescript配置的json跨域
点开设置 -> 搜索Proxy Authorization -> 然后再setting.json里打开 -> "http.proxyAuthorization": "false" -> 解决报错

### 在有唯一子文件夹时,文件目录并列显示
  选择左下角设置 -> 搜索Compact Folders -> 把勾去掉即可
	
### Hbuilder 常用快捷键
	tab: 缩进一个表单空位
	标签名+tab: 快速生成标签
	shift+tab: 反方向缩进一个表单空位
	ctrl+a:全选
	ctrl+s:保存
	ctrl+z:返回一步操作
	ctrl+y:前进一步操作
	ctrl+alt+ ↑ : 向上面添加光标
	ctrl+alt+ ↓ : 向下面添加光标
	ctrl+左键:选中多个光标
	ctrl+f:搜索,同时操作多个一样的词组
	ctrl+r:预览网页
	ctrl+shift+r:复制内容到下面
	ctrl+d:删除当前行
	ctrl+k:格式化代码
	ctrl+↑:向上移动选中行
	ctrl+↓:向下移动选中行
	alt+q:切换显示/隐藏文件树
	ctrl+alt + →:将光标切换至下一个标签内部或单词
	ctrl+e: 选中下一个同样的词
	ctrl+alt+e: 选中所有同类词

### vscode快捷生成标签的用法大全

类 div.wrapper
```html
  <div class="wrapper"></div>
```

id div#wrapper
```html
  <div id="wrapper"></div>
```



属性 span[title="test"]
```html
  <span title="test"></span>
```



下级和括号 div>(div>span)+a
```html
  <div>  <div><span></span></div>  <a href=""></a>  </div>
```

兄弟 div+p+span
```html
<div></div>
<p></p>
<span></span>
```

上级 div>span^i
```html
<div><span></span></div>
<i></i>
```



乘法  ul>li*2
```html
<ul>
  <li></li>
  <li></li>
</ul>
```

文本  div>span{this is test}
```html
<div><span>this is test</span></div>
```

自增符  ul>li.item$@0*3{list $}（@0表示从0开始计数）
```html
<ul>
  <li class="item0">list 1</li>
  <li class="item1">list 2</li>
  <li class="item2">list 3</li>
</ul>
```

 div可以省略 .class
```html
<div class="class"></div>
```

## 实战案例
.box1>(ul>li.item$@0*3>a[href="javascript:void(0);"])+.box2>img[src="00$@1"]*4+p{这是p标签}>a[href="javascript:void(0);"]^span{123}


一键生成html  ! + tab
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
</body>
</html>
```

### 中文插件
名称: Chinese (Simplified) Language Pack for Visual Studio Code
描述: 该插件可以让vscode的文字显示为中文

### vue后缀文件的高亮插件
名称: Vetur
描述: 该插件可以让你的vue后缀文件高亮显示,不需要再去配置".vue"的配置文件关联

### less插件
名称: Easy LESS
描述: 该插件可以将用户编写的less文件保存时即时编译成css或者wxss

### vw插件
名称: px2vw
描述: 该插件可以将用户输入的px单位转换成vw单位

### 图标插件
名称: vscode-icons
描述: 该插件可以美化vsoce里的文件树图标

### 预览网页效果
名称: Live Server
描述: 该插件可以将html代码通过浏览器打开,默认打开的是你的默认浏览器

### 小程序高亮
名称: minapp
描述: 该插件可以把wxml wxss等文件语法高亮显示

### PHP代码提示
名称: PHP Intelephense
描述: 解决PHP中css 和 php没有正确提示的情况

### 彩色缩进
名称: indent-rainbow
描述: 可以让缩进出现彩色

### 发光字主题
名称: SynthWave '84
描述: 可以让你的编辑器主题变成高亮彩色系
如果需要再实现文字发光需要执行以下操作
1. SynthWave '84下载并且安装
2. 输入Enable Neon Dreams 回车出现发光字
3. 右下角重启vscode

### Vue代码提示
名称: Vue 3 Snippets
描述: 解决vue2 vue3在vscode中缺乏的代码提示

### less配置显示在浏览器的行数提示中
显示起作用的样式在less的第几行,而不要显示在css文件的第几行,css不要去改,ctrl+g可以跳转到指定行,在扩展中找到esay less点击小齿轮选择扩展设置,然后选择在setting.json中打开,"less.compile"在这个属性下面编写
```json5
{
  "less.compile": {
    "outExt": ".css",
    "compress": true, // 是否换行,false不换行
    "sourceMap": true, // 是否应该监听map
    "out": true // 是否输出
  }
}
```

### 小程序代码提示
名称: 小程序开发助手1.0.3
描述: 该插件可以让vsode和微信小程序一样用拥有代码提示,也可以自己自定义代码提示
文件地址:C:\Users\Administrator\.vscode\extensions\overtrue.miniapp-helper-1.0.3\snippets\wxml.json
把这个文件在vscode里面打开后找到这段代码
```json
// 自带的
"view": {
  "prefix": "view",
  "description": "基础的视图容器",
  "body": "<view>\n\t$0</view>"
},

// 我自己加的,$0代表光标位置,以view-user来区分,还是一样输入view触发
"view-user": {
  "prefix": "view",
  "description": "基础的视图容器",
  "body": "<view>$0</view>"
},
```

自带的效果,我不喜欢换行于是
```xml
<view>
  |
</view>
```

自己做的
```xml
<view>|</view>
```

### 小程序中使用less
原生微信小程序不支持less,其他基于小程序的框架大体都支持,如wepy,mpvue,taro等,但是仅仅因为一个less功能,而去引入一个框架,肯定是不可取的,因此可以用一下方式来省市县
1. 编辑器是vscode
2. 安装插件easy less
3. 在cscode的最下面齿轮菜单选择设置,在右上角中三个小图标,选择最左边的打开设置json,在大括号里面的最下边粘贴下面配置就行
```json
"less.compile": {
  "outExt": ".wxss"
}
```
4. 在要编写样式的地方,新建less文件,如index.less然后正常编写即可
在less写的语法,会被自动编译到wxss里面

### 自定义用户代码片段
vscode -> 文件 -> 首选项 -> 用户片段 -> 新建全局片段 -> 取名wx-view -> 添加如下数据
自定义用户代码片段

user-view: 片段提示
prefix: 片段触发条件和名称
body: 确认后添加的代码,$0代表默认光标位置"<view>$0</view>"
description: 片段描述
```json
"view": { 
  "prefix": "view", 
  "body": [ 
    "<view>$0</view>"
  ],
  "description": "user-view"
}
```

### 设置vscode的编辑区背景
下载background插件,下载好以后我们选择左下角的齿轮 --> 扩展 --> 右键已经安装好的background插件 --> 扩展设置 --> Background:Custom Images 选择在setting.json中设置,把下面的代码复制在大括号的里面的最下面
```json
"background.enabled": true,
"background.useDefault": false,
"background.customImages": [
  "file:///图片路径"
],
"background.style": {
  "content": "''",
  "pointer-events": "none",
  "position": "absolute",
  "top": "0",
  "right": "0",
  "background-size": "cover",
  "opacity": 0.1,
  "z-index": "99999",
  "width": "100%",
  "height": "100%",
  "background-repeat": "no-repeat",
  }
```

### 解决GitHub访问速度太慢的办法
搜索站长之家,进入官网后点击站长工具,找到DNS工具,[链接地址](http://tool.chinaz.com/),输入github.com检测
一直检测到台湾地区的IP 后面的数字最小,复制那个ip
然后找到这个文件使用记事本打开,在最下面换行,粘贴ip +空格 + github.com
C:\Windows\System32\drivers\etc\hosts

然后打开cmd输入ping github 如果没有请求超时,你访问github就会非常顺畅

### 无法解析的DNS服务器地址
如果访问网页时,提示无法解析服务器的DNS地址,此时不是服务器出问题,是我们自己的电脑有问题,window下打开cmd,输入**ipconfig/flushdns**,输入后回车,出现,已成功刷新DNS解析缓存就表示DNS缓存**已经成功清空**,然后打开控制面板找到你的联网方式,**右键属性**,设置**自动获取ip**,和**自动解析DNS地址**保存即可打开网页

### 环境变量
右键我的电脑-->属性-->高级系统设置-->环境变量-->系统变量
找到path变量,在path变量的最后加上D:\node-v13.4.0-win-x64路径,注意不同路径直接需要以分号;间隔

### 右键菜单中的powershell
1. win+r运行regedit打开注册表管理
2. HKEY_CLASSES_ROOT --> Directory --> Background --> shell
在这个目录下新建一个cmd项
3. 单击cmd文件将默认属性修改为cmd,如果需要shift加右键打开则右键右侧界面新建一个字符串值,属性值名为Extended即可
4. 在cmd目录下新建一个项为command,将默认的字符串值的内容填写为cmd.exe /s /k pushd "%V"在这个目录下新建一个powershell项
5. 单击powershell文件将默认属性修改为powershell,如果需要shift加右键打开则右键右侧界面新建一个字符串值,属性值名为Extended即可,然后在powershell目录下新建一个项为command,将默认的字符串值的内容填写为C:\Windows\system32\WindowsPowerShell\v1.0\powershell.exe

### 修改网关
所有人的电脑网关设置都是192.168.1.1,密码都在你的路由器底部可以查看到,在这里可以设置你的路由器防火墙,给不同设备限速等操作