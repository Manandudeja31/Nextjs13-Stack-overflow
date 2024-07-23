import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 bg-gray-300" />
        <Skeleton className="h-14 w-28 bg-gray-300" />
      </div>
      <div className=" flex flex-wrap items-center justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-40 w-[260px] rounded-2xl bg-gray-300 lg:w-full"
          />
        ))}
      </div>
    </section>
  );
};

export default loading;
