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
            description: "Java求职面经手册和攻略，大厂设计模式、DDD实践，大厂各大中台系统设计真实案例...集全网干货于一站！"
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
            content: "JavaEdge, DDD抽奖系统，数据结构，重学Java设计模式, 字节码编程, 中间件, 手写Spring, 手写MyBatis，Java基础, 面经手册，Java面试题，API网关，SpringBoot Stater, ChatGPT"
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
                        text: 'RPC',
                        items: [
                            {text: '熔断限流', link: '/md/rpc/熔断限流.md'},
                        ]
                    },
                    {
                        text: '业务架构',
                        items: [
                            {text: '00-聚合支付架构', link: '/md/biz-arch/00-聚合支付架构从零到一.md'},
                            {text: '01-供应链域数据中台设计', link: '/md/biz-arch/01-供应链域数据中台设计.md'},
                            {text: '02-供应链采购视角的业务系统架构', link: '/md/biz-arch/02-供应链采购视角的业务系统架构.md'},
                            {text: '03-客服平台架构实践', link: '/md/biz-arch/03-客服平台架构实践.md'},
                            {text: '04-数据质量中心系统设计', link: '/md/biz-arch/04-数据质量中心系统设计.md'},
                            {text: '05-大厂CRM系统架构优化实战', link: '/md/biz-arch/05-大厂CRM系统架构优化实战.md'},
                            {text: '06-运营后台系统设计', link: '/md/biz-arch/06-运营后台系统设计.md'},
                        ]
                    },
                    {
                        text: '交易中台',
                        items: [
                            {text: '00-如何防止订单二次重复支付？', link: '/md/trade/00-如何防止订单二次重复支付？.md'},
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
                        text: 'DDD',
                        items: [
                            {text: '基于电商履约场景的DDD实战', link: '/md/DDD/基于电商履约场景的DDD实战.md'},
                        ]
                    },
                    {
                        text: '计算机网络',
                        items: [
                            {text: '00-计算机网络-网络层原理', link: '/md/network/计算机网络-网络层原理.md'},
                        ]
                    },
                    {
                        text: 'MQTT',
                        items: [
                            {text: '07-MQTT发布订阅模式介绍', link: '/md/MQTT/07-MQTT发布订阅模式介绍.md'},
                        ]
                    },
                    {
                        text: '设计模式',
                        items: [
                        ]
                    },
                    {
                        text: '并发编程',
                        items: [
                            {text: '00-Java并发编程', link: '/md/concurrency/00-Java并发编程.md'},
                        ]
                    },
                    {
                        text: 'Dubbo',
                        link: '/md/Dubbo/01-互联网架构的发展历程.md'
                    },
                    {
                        text: 'Spring Cloud Alibaba',
                        items: [
                            {text: 'SpringCloudAlibaba介绍', link: '/md/spring/spring-cloud/SpringCloudAlibaba介绍.md'},
                            {text: 'SpringCloudAlibaba技术栈介绍', link: '/md/spring/spring-cloud/SpringCloudAlibaba技术栈介绍.md'}
                        ]
                    },
                    {
                        text: '爬虫',
                        items:[{link: '/md/spider/00-爬虫基础.md'},
                        {text: '利用python实现小说自由', link: '/md/spider/利用python实现小说自由.md'},
                        {text:'python高级爬虫实战之Headers信息校验-User-Agent',link:'/md/spider/python高级爬虫实战之Headers信息校验-User-Agent.md'},
                        {text:'python高级爬虫实战之Headers信息校验-Cookie',link:'/md/spider/python高级爬虫实战之Headers信息校验-Cookie.md'}

                        ]
                    },
                    {
                        text: '面试题',
                        link: '/md/zqy/面试题/01-分布式技术面试实战.md'
                    }
                ],
                // 配置文章的侧边导航栏  新增文章提交前都需要在此处操作！！！
                sidebar: {
                    "/md/Dubbo/": [
                        {
                            title: "Dubbo深入理解系列",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "01-互联网架构的发展历程.md",
                                "02-Dubbo特性及工作原理.md",
                                "03-Dubbo的负载均衡及高性能RPC调用.md",
                                "04-Dubbo的通信协议.md",
                                "05-Dubbo的应用及注册和SPI机制.md",
                                "06-Dubbo相关面试题和源码使用技巧.md",
                                "07-Dubbo真实生产环境思考.md"
                            ]
                        }
                    ],
                    "/md/zqy/面试题/": [
                        {
                            title: "面试突击",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "01-分布式技术面试实战.md",
                                "02-注册中心和网关面试实战.md",
                                "03-生产部署面试实战.md",
                                "04-分布式锁、幂等性问题实战.md",
                                "05-Java基础面试实战.md",
                                "06-Spring面试实战.md",
                                "07-计算机网络面试实战.md",
                                "08-数据库面试实战.md",
                                "09-网络通信及可见性面试实战.md",
                                "10-Java 系统架构安全面试实战.md",
                                "11-深挖网络 IO 面试实战.md",
                                "12-分布式架构、性能优化、场景设计面试实战.md",
                            ]
                        },
                        {

                            title: "面试大全",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "面试题-Java基础.md",
                                "面试题-MySQL.md",
                                "面试题-Netty.md",
                                "面试题-Redis.md",
                                "面试题-场景题.md"
                            ]
                        }
                    ],
                    "/md/biz-arch/": [
                        {
                            title: "业务架构设计",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "00-聚合支付架构从零到一.md",
                                "01-供应链域数据中台设计.md",
                                "02-供应链采购视角的业务系统架构.md",
                                "03-客服平台架构实践.md",
                                "04-数据质量中心系统设计.md",
                                "05-大厂CRM系统架构优化实战.md",
                                "06-运营后台系统设计.md",
                            ]
                        }
                    ],
                    "/md/trade/": [
                        {
                            title: "交易中台",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "00-如何防止订单二次重复支付？.md",
                            ]
                        }
                    ],
                    "/md/bigdata/": [
                        {
                            title: "大数据平台",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "大数据平台架构.md",
                                "数据库的下一站：对象存储.md",
                            ]
                        }
                    ],
                    "/md/rpc/": [
                        {
                            title: "RPC",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "熔断限流.md",
                            ]
                        }
                    ],
                    "/md/network/": [
                        {
                            title: "计算机网络",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "计算机网络-网络层原理.md"
                            ]
                        }
                    ],
                    "/md/MQTT/": [
                        {
                            title: "MQTT",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "07-MQTT发布订阅模式介绍.md"
                            ]
                        }
                    ],
                    "/md/spider/": [
                        {
                            title: "MQTT",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "00-爬虫基础.md",
                                "利用python实现小说自由.md",
                                "python高级爬虫实战之Headers信息校验-User-Agent",
                                "python高级爬虫实战之Headers信息校验-Cookie"
                            ]
                        }
                    ],
                    "/md/concurrency/": [
                        {
                            title: "并发编程",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "00-Java并发编程.md",
                            ]
                        }
                    ],
                    "/md/spring/spring-cloud/": [
                        {
                            title: "Spring Cloud",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "SpringCloudAlibaba介绍.md",
                                "SpringCloudAlibaba技术栈介绍.md"
                            ]
                        }
                    ],
                    "/md/DDD/": [
                        {
                            title: "DDD领域驱动设计",
                            collapsable: false,
                            sidebarDepth: 0,
                            children: [
                                "基于电商履约场景的DDD实战.md",
                            ]
                        }
                    ],
                }
            }
        }
    }
};

