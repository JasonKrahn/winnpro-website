const postcssPresetEnv = require('postcss-preset-env')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'WinnPro',
    siteUrl: 'https://winnproconstruction.ca',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        /*id: 'GTM-add_your_tag_here',*/
        id: 'GTM-N8XK2GT',
        defaultDataLayer: { platform: 'gatsby' },
        includeInDevelopment: true,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`,
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`,
          },
          {
            // uploadcare
            urlPattern: /^https:\/\/ucarecdn.com\/[-a-zA-Z0-9@:%_\+.~#?&//=]*?\/10x\//,
            handler: `staleWhileRevalidate`,
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'WinnPro',
        short_name: 'WinnPro',
        start_url: '/',
        background_color: '#661b18',
        theme_color: '#661b18',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: `${__dirname}/static/images/logo.svg`, // This path is relative to the root of the site.
      },
    },

    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages',
      },
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11',
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11',
          }),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Exo 2`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Exo 2`,
            variants: [`300`, `400`, `500`, `600`],
            subsets: ['latin-ext'],
          },
          {
            family: `Open Sans`,
            variants: [`300`, `400`, `500`, `600`],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: `/sitemap.xml`,
      // Exclude specific pages or groups of pages using glob parameters
      // See: https://github.com/isaacs/minimatch
      // The example below will exclude the single `path/to/page` and all routes beginning with `category`
      // exclude: [`/category/*`, `/path/to/page`],
      query: `
        {
          wp {
            generalSettings {
              siteUrl
            }
          }

          allSitePage {
            nodes {
              path
            }
          }`
      },
      resolveSiteUrl: ({site, allSitePage}) => {
        //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
        return site.wp.generalSettings.siteUrl
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/cms/admin.css`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `WinnPro Content Manager`,
        includeRobots: false,
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true,
        ignore: [
          'photoswipe/',
          '/globalStyles.css',
          '/admin.css',
          '/BackgroundVideo.css',
        ],
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
