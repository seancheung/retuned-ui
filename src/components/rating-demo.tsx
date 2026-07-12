import { HeartIcon } from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Rating from "@/components/ui/rating";

export default function RatingDemo() {
  return (
    <ComponentGroup title="Rating">
      <ComponentRow title="Default">
        <Rating defaultValue={3} />
      </ComponentRow>
      <ComponentRow title="Sizes">
        <Rating defaultValue={3} size="sm" />
        <Rating defaultValue={3} />
        <Rating defaultValue={3} size="lg" />
      </ComponentRow>
      <ComponentRow title="Count">
        <Rating defaultValue={7} count={10} />
      </ComponentRow>
      <ComponentRow title="Half">
        <Rating defaultValue={2.5} allowHalf />
      </ComponentRow>
      <ComponentRow title="Custom">
        <Rating defaultValue={3} icon={<HeartIcon />} />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <Rating defaultValue={4} clearable />
      </ComponentRow>
      <ComponentRow title="Read only">
        <Rating value={4} readOnly />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Rating defaultValue={2} disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
