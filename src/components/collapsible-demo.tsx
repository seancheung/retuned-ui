import {
  ArrowDownIcon,
  ArrowUpIcon,
  SaveIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Button from "@/components/ui/button";
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
      <ComponentRow title="Bordered">
        <Collapsible title="章节简介" bordered className="flex-1">
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Custom title">
        <Collapsible
          title={
            <div className="flex flex-1 shrink-0 items-center gap-2">
              <SettingsIcon className="size-3.5 text-content-400" />
              <span className="flex-1 truncate">高级设置</span>
            </div>
          }
          className="flex-1"
        >
          {SAMPLE}
        </Collapsible>
      </ComponentRow>
      <ComponentRow title="Custom chevron">
        <Collapsible
          title="章节简介"
          bordered
          className="flex-1"
          chevron={() => (
            <div className="flex shrink-0 items-center gap-1 pr-3">
              <Button
                variant="ghost"
                shape="square"
                size="sm"
                aria-label="上移"
              >
                <ArrowUpIcon />
              </Button>
              <Button
                variant="ghost"
                shape="square"
                size="sm"
                aria-label="下移"
              >
                <ArrowDownIcon />
              </Button>
              <Button
                variant="ghost"
                shape="square"
                size="sm"
                aria-label="保存"
              >
                <SaveIcon />
              </Button>
              <Button
                variant="ghost"
                shape="square"
                size="sm"
                aria-label="删除"
              >
                <Trash2Icon />
              </Button>
            </div>
          )}
        >
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
