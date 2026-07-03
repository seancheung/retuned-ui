import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Textarea from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <ComponentGroup title="Textarea">
      <ComponentRow title="Default">
        <Textarea
          defaultValue={SAMPLE}
          className="flex-1"
          placeholder="输入内容…"
        />
      </ComponentRow>
      <ComponentRow title="Error">
        <Textarea defaultValue={SAMPLE} error className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Textarea defaultValue={SAMPLE} disabled className="flex-1" />
      </ComponentRow>
    </ComponentGroup>
  );
}
