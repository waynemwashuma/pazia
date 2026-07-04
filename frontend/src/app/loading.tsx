import { LoadingPanel } from "@/components/page-states";

export default function Loading() {
  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <LoadingPanel label="Loading page" className="min-h-[28rem]" />
      </div>
    </div>
  );
}
