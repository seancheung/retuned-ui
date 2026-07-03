import { ComponentGroup, ComponentRow } from "@/components/demo";
import Tabs from "@/components/ui/tab";

const tabItems = [
  { value: "overview", label: "总览" },
  { value: "voices", label: "声音" },
  { value: "sentences", label: "句子" },
  { value: "export", label: "导出" },
];

export default function TabDemo() {
  return (
    <ComponentGroup title="Tabs">
      <ComponentRow title="Default">
        <Tabs items={tabItems} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Small">
        <Tabs items={tabItems} size="sm" className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Tabs
          items={[
            { value: "overview", label: "总览" },
            { value: "voices", label: "声音" },
            { value: "export", label: "导出", disabled: true },
          ]}
          className="flex-1"
        />
      </ComponentRow>
    </ComponentGroup>
  );
}
