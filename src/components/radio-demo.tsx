import { ComponentGroup, ComponentRow } from "@/components/demo";
import Radio, { RadioGroup } from "@/components/ui/radio";

export default function RadioDemo() {
  return (
    <ComponentGroup title="Radio">
      <ComponentRow title="Group">
        <RadioGroup defaultValue="m4b">
          <Radio value="m4b" label="M4B（带章节）" />
          <Radio value="mp3" label="MP3（分章节）" />
          <Radio value="wav" label="WAV（无损）" />
        </RadioGroup>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <RadioGroup defaultValue="high" disabled className="flex-row gap-4">
          <Radio value="standard" label="标准品质" />
          <Radio value="high" label="高品质" />
        </RadioGroup>
      </ComponentRow>
    </ComponentGroup>
  );
}
