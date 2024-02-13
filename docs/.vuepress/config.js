module.exports = {
    port: "8080",
    dest: ".site",
    base: "/",
    // 是否开启默认预加载js
    shouldPrefetch: (file, type) => {
        return false;
    },
    // webpack 配置 https://vuepress.vuejs.org/zh/config/#chainwebpack
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const dateTime = new Date().getTime();

            // 清除js版本号
            config.output.filename('assets/js/cg-[name].js?v=' + dateTime).end();
            config.output.chunkFilename('assets/js/cg-[name].js?v=' + dateTime).end();

            // 清除css版本号
            config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
                filename: 'assets/css/[name].css?v=' + dateTime,
                chunkFilename: 'assets/css/[name].css?v=' + dateTime
            }]).end();

        }
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
            description: "包含: Java八股文、面经..."
        }
    },
    head: [
        // ico
        ["link", {rel: "icon", href: `/favicon.ico`}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "Ken"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "Java，Mysql，redis，MQ，Spring，SpringBoot，SpringCloud，Jvm，设计模式，K8s，知识库"
        }],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                // src: 'https://code.jquery.com/jquery-3.5.1.min.js',
                src: '/js/jquery.min.js',
            }],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                // src: 'https://code.jquery.com/jquery-3.5.1.min.js',
                src: '/js/global.js',
            }],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                src: '/js/fingerprint2.min.js',
            }],
        // 添加百度统计
        ["script", {},
            `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?0b31b4c146bf7126aed5009e1a4a11c8";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `
        ]
    ],
    plugins: [
        [
            {globalUIComponents: ['LockArticle', 'PayArticle']}
        ],
        ['@vuepress/medium-zoom', {
            selector: 'img:not(.nozoom)',
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }],
        // see: https://github.com/IOriens/vuepress-plugin-baidu-autopush
        ['vuepress-plugin-baidu-autopush', {}],
        // see: https://github.com/znicholasbrown/vuepress-plugin-code-copy
        ['vuepress-plugin-code-copy', {
            align: 'bottom',
            color: '#3eaf7c',
            successText: '@ken: 代码已经复制到剪贴板'
        }],
        // see: https://github.com/tolking/vuepress-plugin-img-lazy
        ['img-lazy', {}],
        ["vuepress-plugin-tags", {
            type: 'default', // 标签预定义样式
            color: '#42b983',  // 标签字体颜色
            border: '1px solid #e2faef', // 标签边框颜色
            backgroundColor: '#f0faf5', // 标签背景颜色
            selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；
        }],
        // https://github.com/lorisleiva/vuepress-plugin-seo
        ["seo", {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            // twitterCard: _ => 'summary_large_image',
            type: $page => 'article',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }]
    ],
    themeConfig: {
        // 文档所在仓库
        docsRepo: "Java-Edge/Code-Select",
        // 编辑文档的所在目录
        docsDir: 'docs',
        // 文档所在分支：
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
                    },
                    {
                        text: '🌍知识星球',
                        link: '#'
                    },
                    {
                        text: 'Github',
                        items: [
                            {text: 'Github', link: 'https://github.com/Java-Edge'}
                        ]
                    }
                ],
                sidebar: {
                    "/md/other/": genBarOther(),
                    "/md/algorithm/data-structures/": genAlgorithmDataStructures(),
                    "/md/algorithm/logic/": genAlgorithmLogic(),
                    "/md/algorithm/model/": genAlgorithmModel(),
                    "/md/java/interview/": genBarJavaInterview(),
                    "/md/java/develop-jvm/": genBarJavaDevelopJvm(),
                    "/md/java/core/": genBarJavaCore(),
                    "/md/spring/develop-spring/": genBarSpringDevelopSpring(),
                    "/md/spring/develop-mybatis/": genBarSpringDevelopMybatis(),
                    "/md/spring/source-code/": genBarSpringSourceCode(),
                    "/md/spring/spring-cloud/": genBarSpringSpringCloud(),
                    "/md/develop/design-pattern/": genBarDevelopDesignPattern(),
                    "/md/develop/framework/": genBarDevelopFramework(),
                    "/md/develop/standard/": genBarDevelopStandard(),
                    "/md/devops/": genBarDevOPS(),
                    "/md/assembly/middleware/": genBarAssembly(),
                    "/md/assembly/idea-plugin/": genBarAssemblyIDEAPlugin(),
                    "/md/assembly/api-gateway/": genApiGateway(),
                    "/md/netty/": genBarNetty(),
                    "/md/bytecode/asm-document/": genBarBytecode(),
                    "/md/bytecode/agent/": genBarBytecodeAgent(),
                    "/md/bytecode/": genBarBytecodeAsmJavassistByteBuddy(),
                    "/md/project/springboot-middleware/": getBarProjectSpringBootMiddleware(),
                    "/md/project/chatgpt/": getBarProjectChatGPT(),
                    "/md/project/lottery/": getBarProjectLottery(),
                    "/md/project/im/": getBarProjectIM(),
                    "/md/project/chatbot-api/": getBarProjectChatBotApi(),
                    "/md/project/big-market/": getBarBigMarket(),
                    "/md/project/ddd-scene-solution/": getBarDDDSceneSolution(),
                    "/md/zsxq/": getBarZSXQ(),
                    "/md/product/": getBarProduct(),
                    "/md/road-map/": genBarGuide(),
                    "/md/about/": genBarAbout()
                }
            }
        }
    }
};

// other
function genBarOther() {
    return [
        {
            title: "学习指引",
            collapsable: true,
            sidebarDepth: 2,
            children: [
                "road-map.md",
                "guide-to-reading.md"
            ]
        }
    ]
}

function genBarGuide() {
    return [

    ]
}

// algorithm/data-structures
function genAlgorithmDataStructures() {
    return [
    ]
}

// algorithm/logic
function genAlgorithmLogic() {
    return [

    ]
}

// algorithm/model
function genAlgorithmModel() {
    return [

    ]
}

// java-interview
function genBarJavaInterview() {
    return [

    ]
}

// java-develop-jvm
function genBarJavaDevelopJvm() {
    return [
    ]
}

// java-core
function genBarJavaCore() {
    return [
    ]
}

// spring-develop-mybatis
function genBarSpringDevelopMybatis() {
    return [
    ]
}

// spring-develop-spring
function genBarSpringDevelopSpring() {
    return [
    ]
}

// spring-spring-cloud
function genBarSpringSpringCloud() {
    return [
    ]
}

// spring-source-code
function genBarSpringSourceCode() {
    return [
    ]
}

// develop design-pattern
function genBarDevelopDesignPattern() {
    return [
    ]
}

// devops
function genBarDevOPS() {
    return [
    ]
}

// develop ddd\frame\framework
function genBarDevelopFramework() {
    return [
    ]
}

// develop standard
function genBarDevelopStandard() {
    return [
    ]
}

// Assembly
function genBarAssembly() {
    return [
    ]

}

// Assembly idea-plugin
function genBarAssemblyIDEAPlugin() {
    return [
    ];
}

// api-gateway
function genApiGateway() {
    return [
    ];
}

// netty 4.x
function genBarNetty() {
    return [
    ]
}

function genBarBytecodeAsmJavassistByteBuddy() {
    return [
    ]
}

function genBarBytecodeAgent() {
    return [
    ]
}

// bytecode-asm-document
function genBarBytecode() {
    return [
    ];
}

function getBarZSXQ() {
    return [
    ]
}

function getBarProduct() {
    return [
    ]
}

// project im
function getBarProjectIM() {
    return [
    ];
}

function getBarProjectChatBotApi() {
    return [
    ];
}

// project springboot-middleware
function getBarProjectSpringBootMiddleware() {
    return [
    ];
}

function getBarProjectChatGPT() {
    return [
    ]
}

function getBarBigMarket() {
    return [
    ]
}

function getBarDDDSceneSolution() {
    return [
    ]
}

// project lottery
function getBarProjectLottery() {
    return [
    ]
}

// About page
function genBarAbout() {
    return [
    ];
}

