import 'dotenv/config';

export default {
    title: "Docusaurus",
    tagline: "Dinosaurs are cool",
    favicon: "img/favicon.ico",
    url: "https://your-docusaurus-site.example.com",
    baseUrl: "/",
    // Env variables to use in React Components
    customFields: {
        APP_ENV: process.env.APP_ENV,
    },
    organizationName: "gammeter-media",
    projectName: "docusaurus",
    onBrokenLinks: "throw", // Change to "throw" for production else use "ignore"
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "de-CH",
        locales: ["de-CH"],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.js",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
				pages: {
					path: 'src/pages',
					routeBasePath: '/',
					include: ['**/*.{js,md,mdx}'],
					mdxPageComponent: '@theme/MDXPage',
				},
            },
        ],
    ],

    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'tutorial',
                path: 'manuals/docs-tutorial',
                routeBasePath: 'tutorial',
            },
        ],
    ],

    themeConfig:
        ({
            navbar: {
                title: "Docusaurus",
                logo: {
                    alt: "Logo",
                    src: "img/logo.png",
                },
                items: [
                    {
                        to: "/tutorial/",
                        label: "Tutorial",
                    },
                ],
            },
            footer: {
                style: "dark",
                copyright: `Copyright © ${new Date().getFullYear()} Gammeter Media AG. Built with Docusaurus.`
            },
        }),

    scripts: [
        {
            src: "/js/marker-creator-script.js",
            async: true,
        },
        {
            src: "/js/page-editor.js",
            async: true,
        },
    ],
};

