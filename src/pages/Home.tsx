import { useInView } from "react-intersection-observer";
import siteMetadata from "../utils/siteMetadata";
import { Post } from "../types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import PostCard from "../components/PostCard";
import LoaderSpinner from "../components/LoaderSpinner";
import ErrorPage from "../components/ErrorPage";

export default function Home() {
  const { ref, inView } = useInView();
  const prevInViewRef = useRef<boolean>(false);

  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
      );

      if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(
          `Error: ${res.status} ${res.statusText}. Details: ${errorDetails}`
        );
      }

      return res.json() as Promise<Post[]>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch posts failed:", error.message);
        throw new Error(
          "Failed to fetch posts. Please check your network connection or try again later."
        );
      } else {
        console.error("An unexpected error occurred:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !prevInViewRef.current) {
      fetchNextPage();
    }
    prevInViewRef.current = inView; // Update ref with the current value
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <LoaderSpinner className="min-h-screen" />;
  }

  if (status === "error") {
    return (
      <ErrorPage
        title="Data Fetch Error"
        message="Failed to fetch data"
        error={error}
      />
    );
  }

  const content = data?.pages.flatMap((posts, pageIndex) =>
    posts.map((post: Post, index: number) => {
      const isLastPost =
        pageIndex === data.pages.length - 1 && index === posts.length - 1;
      return (
        <PostCard
          innerRef={isLastPost ? ref : undefined}
          key={post.id}
          post={post}
        />
      );
    })
  );

  return (
    <>
      <div className="container max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 md:pt-36 pt-28">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {content}
        </ul>
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <LoaderSpinner />
          </div>
        )}
      </div>
    </>
  );
}
