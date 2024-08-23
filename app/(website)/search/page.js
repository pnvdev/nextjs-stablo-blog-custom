import Container from "@/components/container";
import PostList from "@/components/postlist";
import { getPostsByQuery } from "@/lib/sanity/client";
import SearchBar from "@/components/searchbar";

// export const dynamic = "force-dynamic";

// export const runtime = "edge";

// postsbyauthorquery
// getAuthorPostsBySlug
export default async function CategoryDefault({ searchParams }) {
  const { query } = searchParams;

  const posts = await getPostsByQuery(query || "");

  return (
    <>
      <div>
        <div className="mt-14 flex items-center justify-center ">
          <h1 className="text-brand-primary text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
            Search results for {`"${query || ''}"`}
          </h1>
        </div>
        <div className="mx-auto mt-5 max-w-md">
          <div className="relative">
            <SearchBar />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-4 w-4 text-gray-400">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {/* {JSON.stringify(posts)} */}
          {posts.length > 0
            ? posts.map(post => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))
            : null}
        </div>
      </Container>
    </>
  );
}
