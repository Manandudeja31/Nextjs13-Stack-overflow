import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
const hotQuestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const Tags = [
  {
    id: 1,
    name: "Javascript",
    count: "20152+",
  },
  {
    id: 2,
    name: "Next.js",
    count: "20152+",
  },
  {
    id: 3,
    name: "React.js",
    count: "20152+",
  },
  {
    id: 4,
    name: "Node.js",
    count: "20152+",
  },
  {
    id: 5,
    name: "Python",
    count: "20152+",
  },
  {
    id: 6,
    name: "Microsoft Azure",
    count: "20152+",
  },
  {
    id: 7,
    name: "SQL",
    count: "20152+",
  },
  {
    id: 8,
    name: "Machine Learning",
    count: "20152+",
  },
];
const RightSidebar = () => {
  return (
    <section
      className=" background-light900_dark200 custom-scrollbar 
    light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col 
    overflow-y-auto border-l p-6 pt-36 shadow-light-300 
    dark:shadow-none max-xl:hidden"
    >
      <div className="">
        <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => {
            return (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="text-dark200_light900 base-medium">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {Tags.map((tag) => {
            return (
              <Link
                href={`/tag/${tag.id}`}
                key={tag.id}
                className="flex justify-between gap-2"
              >
                <Badge
                  className="text-light400_light500 
                background-light800_dark300 rounded-md 
                border-none px-4 py-2 uppercase "
                >
                  {tag.name}
                </Badge>
                <p className="text-dark500_light700 small-medium">
                  {tag.count}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
