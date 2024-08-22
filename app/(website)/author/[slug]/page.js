import Container from "@/components/container";
import PostList from "@/components/postlist";
import { getAuthorPostsBySlug } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Archive from "./archive";

export const dynamic = "force-dynamic";

export const runtime = "edge";

// postsbyauthorquery
// getAuthorPostsBySlug
export default async function AuthorDefault({ params, searchParams }) {
  const posts = await getAuthorPostsBySlug(params.slug);
  const post = posts[0]
  const AuthorimageProps = post?.author?.image
  ? urlForImage(post.author.image)
  : null;

  return (
    <Container>
      {/* <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
        {`Author  - ${params.slug}`}
        {JSON.stringify(posts)}
      </div> */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={AuthorimageProps.src}
          alt={post?.author?.name}
          className="rounded-full object-cover"
          fill
          sizes="500px"
        />
        </div>
        <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">{post.author.name}</h1>
        <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
            {post.body && <PortableText value={post.author.bio} />}
        </div>
      </div>
      {/* <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
        {posts.slice(0, 6).map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div> */}
          <Suspense
            key={searchParams.page || "1"}
            fallback={<Loading />}>
            <Archive searchParams={searchParams} slug={params.slug} type={'author'} />
          </Suspense>
    </Container>  
  )
}