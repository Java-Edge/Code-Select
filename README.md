# 编程严选网

## 1 图片调整路径
docs/.vuepress/public/images

## 2 提交文章
1. 新增 md 文件
在 md 目录新建 concurrency 目录，新建00-Java并发编程.md文件，将文章内容放进去
2. 修改 config.js，配置专栏和下面文章路径
```js
{
    text: '并发编程',
    items: [
        {text: '00-Java并发编程', link: '/md/concurrency/00-Java并发编程.md'},
    ]
},
```
3. 修改 config.js，配置专栏侧边导航栏
如
```js
"/md/concurrency/": [
    {
        title: "并发编程",
        collapsable: false,
        sidebarDepth: 0,
        children: [
            "00-Java并发编程.md"
        ]
    }
],
```
4. 本地调试，浏览器前端能正常看到文章，即可提交代码
