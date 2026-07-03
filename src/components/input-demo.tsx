import { SearchIcon } from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Input from "@/components/ui/input";

export default function InputDemo() {
  return (
    <ComponentGroup title="Input">
      <ComponentRow title="Default">
        <Input defaultValue="这是示例文本" />
      </ComponentRow>
      <ComponentRow title="Error">
        <Input defaultValue="这是示例文本" error />
      </ComponentRow>
      <ComponentRow title="Icon">
        <Input defaultValue="这是示例文本" icon={<SearchIcon />} />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Input defaultValue="这是示例文本" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
