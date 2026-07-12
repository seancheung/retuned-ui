import { SettingsIcon } from "lucide-react";
import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Collapsible from "@/components/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <ComponentGroup title="Collapsible">
      <ComponentRow title="Default">
        <Collapsible title="章节简介" className="flex-1">
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Open">
        <Collapsible title="章节简介" defaultValue className="flex-1">
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Icon">
        <Collapsible
          title="高级设置"
          icon={<SettingsIcon />}
          className="flex-1"
        >
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Bordered">
        <Collapsible title="章节简介" bordered className="flex-1">
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Collapsible title="章节简介" disabled className="flex-1">
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
    </ComponentGroup>
  );
}
