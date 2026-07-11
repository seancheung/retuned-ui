import { ComponentGroup, ComponentRow } from "@/components/demo";
import SegmentedControl from "@/components/ui/segmented-control";

const segments = [
  { value: "day", label: "日" },
  { value: "week", label: "周" },
  { value: "month", label: "月" },
  { value: "year", label: "年" },
];

export default function SegmentedControlDemo() {
  return (
    <ComponentGroup title="Segmented Control">
      <ComponentRow title="Primary">
        <SegmentedControl items={segments} />
      </ComponentRow>
      <ComponentRow title="Secondary">
        <SegmentedControl items={segments} variant="secondary" />
      </ComponentRow>
      <ComponentRow title="Small">
        <SegmentedControl items={segments} size="sm" />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <SegmentedControl
          items={[
            { value: "day", label: "日" },
            { value: "week", label: "周" },
            { value: "year", label: "年", disabled: true },
          ]}
        />
      </ComponentRow>
      <ComponentRow title="Full width">
        <SegmentedControl items={segments} className="flex-1" />
      </ComponentRow>
    </ComponentGroup>
  );
}
