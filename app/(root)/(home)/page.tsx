/* eslint-disable tailwindcss/no-custom-classname */
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div
        className="flex w-full flex-col-reverse
      justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="primary-gradient !text-light-900
          min-h-[46px] px-4 py-3"
          >
            Ask a Question
          </Button>
        </Link>
      </div>

      <div
        className="mt-11 flex flex-wrap justify-between gap-5
      max-sm:flex-col sm:items-center"
      >
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              clerkId={question.clerkId}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no question to show"
            description="Be the first to break the silence! 
              🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
