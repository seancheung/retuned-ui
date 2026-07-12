import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Popover from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <ComponentGroup title="Popover">
      <ComponentRow title="Default">
        <Popover content={SAMPLE}>
          <Button variant="secondary">打开</Button>
        </Popover>
      </ComponentRow>
      <ComponentRow title="Title">
        <Popover title="章节简介" content={SAMPLE}>
          <Button variant="secondary">带标题</Button>
        </Popover>
      </ComponentRow>
      <ComponentRow title="Sides">
        <Popover content={SAMPLE} side="top">
          <Button variant="ghost">上</Button>
        </Popover>
        <Popover content={SAMPLE} side="bottom">
          <Button variant="ghost">下</Button>
        </Popover>
        <Popover content={SAMPLE} side="left">
          <Button variant="ghost">左</Button>
        </Popover>
        <Popover content={SAMPLE} side="right">
          <Button variant="ghost">右</Button>
        </Popover>
      </ComponentRow>
      <ComponentRow title="Form">
        <Popover
          title="重命名章节"
          content={({ close }) => (
            <div className="flex flex-col gap-2">
              <Input placeholder="输入新名称…" className="min-w-0" />
              <Button size="sm" className="self-end" onClick={close}>
                确定
              </Button>
            </div>
          )}
        >
          <Button variant="secondary">表单</Button>
        </Popover>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Popover content={SAMPLE} disabled>
          <Button variant="secondary" disabled>
            禁用
          </Button>
        </Popover>
      </ComponentRow>
    </ComponentGroup>
  );
}
