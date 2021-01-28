import React from 'react';
import { Helmet } from 'react-helmet';

export default ({
    title,
    children,
    description,
    largeThumbnail,
    isArticle,
    publishedDate,
    siteUrl,
    path = '',
}) => {
    return (
        <Helmet>
            <title>{`${title} | Chris Beley`}</title>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="robots" content="index, follow" />
            {description ? (
                <meta name="description" content={description} />
            ) : null}
            <meta
                name="twitter:card"
                content={largeThumbnail ? 'summary_large_image' : 'summary'}
            />
            <meta name="twitter:site" content="@Chris_Beley" />
            <meta name="twitter:creator" content="@Chris_Beley" />
            <meta name="twitter:title" content={title.substring(0, 70)} />
            {description && (
                <meta
                    name="twitter:description"
                    content={description.substring(0, 200)}
                />
            )}
            {largeThumbnail && (
                <meta
                    name="twitter:image"
                    content={
                        new URL(largeThumbnail.twitter.fixed.src, siteUrl).href
                    }
                />
            )}

            <meta property="og:url" content={new URL(path, siteUrl).href} />
            <meta property="og:title" content={title} />
            {description && (
                <meta property="og:description" content={description} />
            )}
            {largeThumbnail && (
                <meta
                    property="og:image"
                    content={new URL(largeThumbnail.og.fixed.src, siteUrl).href}
                />
            )}

            {isArticle && <meta property="og:type" content="article" />}
            {isArticle && <meta property="og:author" content="Chris Beley" />}
            {isArticle && publishedDate && (
                <meta property="og:published_time" content={publishedDate} />
            )}

            {children}
        </Helmet>
    );
};
