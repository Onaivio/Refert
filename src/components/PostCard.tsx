import React from "react";
import { Post } from "../types/post";
import { formatDate } from "../utils/formatDate";
import siteMetadata from "../utils/siteMetadata";

interface PostCardProps {
  post: Post;
  innerRef?: React.Ref<HTMLDivElement>;
}

const dummyDate = "2024-09-05";

const PostCard: React.FC<PostCardProps> = ({ post, innerRef }) => {
  return (
    <>
      <article className="py-12" ref={innerRef}>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Posted on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={dummyDate}>
                {formatDate(dummyDate, siteMetadata.locale)}
              </time>
            </dd>
          </dl>

          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="md:text-2xl sm:text-xl text-lg font-medium leading-8 text-gray-900 dark:text-gray-100 tracking-tight">
                  {post.title}
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {post.body}.
              </div>
            </div>
            <div className="text-base font-medium leading-6 text-primary cursor-pointer hover:text-primary/80">
              Read more &rarr;
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostCard;
