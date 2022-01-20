import { Fragment } from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage({ post }) {
    const { title, excerpt } = post;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={excerpt} />
            </Head>
            <PostContent post={post} />
        </Fragment>
    );
}

export default PostDetailPage;

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postContent = getPostData(slug);

    return {
        props: {
            post: postContent
        },
        revalidate: 600
    };
}

export function getStaticPaths() {
    const fileNames = getPostsFiles();

    const slugs = fileNames.map((f) => f.replace(/\.md$/, ""));

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false
    };
}
