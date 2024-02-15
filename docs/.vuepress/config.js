module.exports = {
    port: "8080",
    dest: "./dist",
    base: "/",
    // 是否开启默认预加载js
    shouldPrefetch: (file, type) => {
        return false;
    },
    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "编程严选网",
            description: "包含: Java 基础，面经手册，Netty4.x，手写Spring，用Java实现JVM，重学Java设计模式，SpringBoot中间件开发，IDEA插件开发，Lottery抽奖系统，字节码编程..."
        }
    },
    head: [
        // ico
        ["link", {rel: "icon", href: `/favicon.ico`}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "JavaEdge"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "JavaEdge, bugstack 虫洞栈, DDD抽奖系统，数据结构，重学Java设计模式, 字节码编程, 中间件, 手写Spring, 手写MyBatis，Java基础, 面经手册，Java面试题，API网关，SpringBoot Stater, ChatGPT"
        }],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
    ],
    plugins: [
        // [
        //     {globalUIComponents: ['LockArticle', 'PayArticle']}
        // ],
        // ['@vuepress/medium-zoom', {
        //     selector: 'img:not(.nozoom)',
        //     // See: https://github.com/francoischalifour/medium-zoom#options
        //     options: {
        //         margin: 16
        //     }
        // }],
        // ['vuepress-plugin-baidu-autopush', {}],
        // // see: https://github.com/znicholasbrown/vuepress-plugin-code-copy
        ['vuepress-plugin-code-copy', {
            align: 'bottom',
            color: '#3eaf7c',
            successText: '@JavaEdge: 代码已经复制到剪贴板'
        }],
        // // see: https://github.com/tolking/vuepress-plugin-img-lazy
        // ['img-lazy', {}],
        // ["vuepress-plugin-tags", {
        //     type: 'default', // 标签预定义样式
        //     color: '#42b983',  // 标签字体颜色
        //     border: '1px solid #e2faef', // 标签边框颜色
        //     backgroundColor: '#f0faf5', // 标签背景颜色
        //     selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；
        // }],
    ],
    themeConfig: {
        docsRepo: "Java-Edge/Code-Select",
        // 编辑文档的所在目录
        docsDir: 'docs',
        // 文档放在一个特定的分支下：
        docsBranch: 'main',
        //logo: "/logo.png",
        editLinks: true,
        sidebarDepth: 0,
        //smoothScroll: true,
        locales: {
            "/": {
                label: "简体中文",
                selectText: "Languages",
                editLinkText: "在 GitHub 上编辑此页",
                lastUpdated: "上次更新",
                nav: [
                    {
                        text: '导读', link: '/md/other/guide-to-reading.md'
                    },
                    {
                        text: '路书', link: 'http://www.javaedge.cn/#/index'
                    },
                    {
                        text: '业务架构',
                        items: [
                            {text: '00-聚合支付架构', link: '/md/biz-arch/00-聚合支付架构从零到一.md'},
                            {text: '01-供应链域数据中台设计', link: '/md/biz-arch/01-供应链域数据中台设计.md'},
                        ]
                    },
                    {
                        text: '大数据平台',
                        items: [
                            {text: '00-互联网大厂的大数据平台架构', link: '/md/bigdata/大数据平台架构.md'},
                            {text: '01-数据库的下一站：对象存储', link: '/md/bigdata/数据库的下一站：对象存储.md'},
                        ]
                    },
                    {
                        text: '设计模式',
                        items: [
                        ]
                    },
                    {
                        text: '面试题',
                        items: [
                            {text: '面试突击', link: '/md/zqy/面试题/面试突击.md'},
                            {text: '面试题-Java基础', link: '/md/zqy/面试题/面试题-Java基础.md'},
                            {text: '面试题-MySQL', link: '/md/zqy/面试题/面试题-MySQL.md'},
                            {text: '面试题-Netty', link: '/md/zqy/面试题/面试题-Netty.md'},
                            {text: '面试题-Redis', link: '/md/zqy/面试题/面试题-Redis.md'},
                            {text: '面试题-场景题', link: '/md/zqy/面试题/面试题-场景题.md'},
                        ]
                    }
                ],
                sidebar: {
                    "/md/zqy/面试题/": [
                        {
                            title: "面试大全",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "面试突击.md",
                                "面试题-Java基础",
                                "面试题-MySQL.md",
                                "面试题-Netty.md",
                                "面试题-Redis.md",
                                "面试题-场景题.md"
                            ]
                        }
                    ],
                }
            }
        }
    }
};

