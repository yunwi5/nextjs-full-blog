import { Fragment } from 'react';
import Head from 'next/head';
import Hero from "../components/home-page/hero";
import FeaturedPost from "../components/home-page/featured-post";

import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
    const { posts } = props;
    return (
        <Fragment>
            <Head>
                <title>Blog Home</title>
                <meta name="description" content="I post about programming and web development" />
            </Head>
            <Hero />
            <FeaturedPost posts={posts} />
        </Fragment>
    );
}

export default HomePage;

export async function getStaticProps(context) {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 120
    }
}