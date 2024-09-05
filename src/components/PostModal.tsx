import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Post } from "../types/post";
import { formatDate } from "../utils/formatDate";
import siteMetadata from "../utils/siteMetadata";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ModalProps {
  post: Post;
  isOpen: boolean;
  closeModal: () => void;
}

const PostModal: React.FC<ModalProps> = ({ post, isOpen, closeModal }) => {
  const dummyDate = "2024-09-05";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Post Preview
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="mt-4">
                  <div className="prose dark:prose-dark">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-medium leading-6 text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Posted on:{" "}
                      <time dateTime={dummyDate}>
                        {formatDate(dummyDate, siteMetadata.locale)}
                      </time>
                    </p>
                    <div className="mt-4 text-gray-700 dark:text-gray-300">
                      {post.body}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Share this post
                  </h4>
                  <div className="flex space-x-4">
                    <Link
                      to="#"
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                    >
                      <FacebookIcon size={24} />
                    </Link>
                    <Link
                      to="#"
                      className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <TwitterIcon size={24} />
                    </Link>
                    <Link
                      to="#"
                      className="text-blue-700 hover:text-blue-900 dark:hover:text-blue-500"
                    >
                      <LinkedinIcon size={24} />
                    </Link>
                    <Link
                      to="#"
                      className="text-pink-600 hover:text-pink-800 dark:hover:text-pink-400"
                    >
                      <InstagramIcon size={24} />
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PostModal;
