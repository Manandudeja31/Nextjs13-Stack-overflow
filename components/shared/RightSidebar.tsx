import Link from "next/link";
import React from "react";
import Image from "next/image";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.actions";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const Tags = await getPopularTags();
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
          {Tags.map((tag) => (
            <RenderTag
              key={tag.id}
              _id={tag.id}
              name={tag.name}
              totalQuestions={tag.numberofQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
