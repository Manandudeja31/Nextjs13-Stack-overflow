import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp, formatBigNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const page = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();
  let mongoUser;

  if (!clerkId) redirect("/sign-up");

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div
          className="w-full flex-col-reverse
        justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
        >
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="Profile"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
          <div
            className="h2-semibold text-dark200_light900 mt-3.5
          w-full text-left"
          >
            {result.title}
          </div>
          <div className="mb-8 mt-5 flex flex-wrap gap-4">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt="clock"
              value={` - asked ${getTimestamp(result.createdAt)}`}
              title="Asked"
              textStyles="small-medium text-dark400_light800"
            />

            <Metric
              imgUrl="/assets/icons/message.svg"
              alt="Message"
              value={formatBigNumber(result.answers.length)}
              title="Answers"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              imgUrl="/assets/icons/eye.svg"
              alt="eye"
              value={formatBigNumber(result.views)}
              title="views"
              textStyles="small-medium text-dark400_light800"
            />
          </div>

          <ParseHTML data={result.content} />

          <div className="mt-8 flex flex-wrap gap-2">
            {result.tags.map((tag: any) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                showCount={false}
              />
            ))}
          </div>

          <AllAnswers
            questionId={result._id}
            userId={mongoUser._id}
            totalAnswers={result.answers.length}
            page={searchParams?.page}
            filter={searchParams?.filter}
          />

          <Answer
            question={result.content}
            questionId={JSON.stringify(result._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        </div>
      </div>
    </>
  );
};

export default page;
