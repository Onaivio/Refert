import React, { useState } from "react";
import { Post } from "../types/post";
import { formatDate } from "../utils/formatDate";
import siteMetadata from "../utils/siteMetadata";
import PostModal from "./PostModal";

interface PostCardProps {
  post: Post;
  innerRef?: React.Ref<HTMLDivElement>;
}

const PostCard: React.FC<PostCardProps> = ({ post, innerRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <article className="py-12" ref={innerRef}>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Posted on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime="2024-09-05">
                {formatDate("2024-09-05", siteMetadata.locale)}
              </time>
            </dd>
          </dl>

          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2
                  onClick={openModal}
                  className="md:text-2xl hover:underline cursor-pointer sm:text-xl text-lg font-medium leading-8 text-gray-900 dark:text-gray-100 tracking-tight"
                >
                  {post.title}
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {post.body}.
              </div>
            </div>
            <div
              onClick={openModal}
              className="text-base font-medium leading-6 text-primary cursor-pointer hover:text-primary/80"
            >
              Read more &rarr;
            </div>
          </div>
        </div>
      </article>

      {/* Modal Component */}
      <PostModal post={post} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default PostCard;
