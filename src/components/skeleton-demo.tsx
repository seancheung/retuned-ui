import { ComponentGroup, ComponentRow } from "@/components/demo";
import Skeleton from "@/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <ComponentGroup title="Skeleton">
      <ComponentRow title="Text">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </ComponentRow>
      <ComponentRow title="Card">
        <div className="flex flex-1 items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </ComponentRow>
      <ComponentRow title="Shape">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="size-12" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-12 flex-1" />
      </ComponentRow>
    </ComponentGroup>
  );
}
