# beleyBlog

The non-content portion for my blog at https://ChrisBeley.com

Instead of utilizing a Gatsby starter project, this blog was started from scratch. I may write a blog series on it one day, but you can see some the initial stages of implementing it at https://github.com/cbeley/gatsby-blog-from-scratch-stages.

A few random curiosities about how this blog is set-up:

-   A custom, fully mobile-optimized design.
-   CSS modules only.
-   [classnames](https://github.com/JedWatson/classnames) library for joining CSS classes.
-   MDX for posts.
-   Dynamic category generation (See `gatsby-node.js`).
-   Draft flag support (See `gatsby-node.js`).
-   Separation of GraphQL fragments into `src/gqlFragments`.
-   Dockerized deployment (See `Dockerfile` and `package.json`)
-   Automatic code style enforcement/error checking:
    -   eslint (with modified Airbnb rules)
    -   prettier
-   Content separated from this repo and pulled in at deploy time. (The content repo is private.)
-   Fully automatic deployments upon new content merges. Unfortunately, I choose to not make this public, but maybe I'll write more about it later. Infrastructure is all self-hosted with the exception of Github actions.
