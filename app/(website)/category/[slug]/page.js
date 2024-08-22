import Container from "@/components/container";
import PostList from "@/components/postlist";
import { getPostsByCategory } from "@/lib/sanity/client";
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
export default async function CategoryDefault({ params, searchParams }) {
  const posts = await getPostsByCategory(params.slug);
  // console.log(posts);
  
  // const post = posts[0]
  // const AuthorimageProps = post?.author?.image
  // ? urlForImage(post.author.image)
  // : null;

  return (
    <Container>
      {/* <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
        {`Author  - ${params.slug}`}
      
      </div> */}
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-semibold tracking-tight lg:leading-tight text-brand-primary lg:text-5xl dark:text-white">{params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}</h1>
        <p class="mt-1 text-gray-600">{posts.length} Articles</p>
      </div>
      {/* { <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
          {JSON.stringify(posts)}
        </div>
      } */}
          <Suspense
            key={searchParams.page || "1"}
            fallback={<Loading />}>
            <Archive searchParams={searchParams} slug={params.slug}/>
          </Suspense>
    </Container>  
  )
}