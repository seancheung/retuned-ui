import { useState } from "react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";
import Drawer from "@/components/ui/drawer";

export default function DrawerDemo() {
  return (
    <ComponentGroup title="Drawer">
      <ComponentRow title="Right">
        <DrawerExample side="right" triggerLabel="从右侧打开" />
      </ComponentRow>
      <ComponentRow title="Left">
        <DrawerExample side="left" triggerLabel="从左侧打开" />
      </ComponentRow>
      <ComponentRow title="Top">
        <DrawerExample side="top" triggerLabel="从顶部打开" />
      </ComponentRow>
      <ComponentRow title="Bottom">
        <DrawerExample side="bottom" triggerLabel="从底部打开" />
      </ComponentRow>
    </ComponentGroup>
  );
}

function DrawerExample({
  side,
  triggerLabel,
}: {
  side: "left" | "right" | "top" | "bottom";
  triggerLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side={side}
        title="项目设置"
        description="调整 TTS 服务、声音、导出格式等参数"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setOpen(false)}>保存</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p>从这里可以快速调整当前项目的运行参数。</p>
          <p className="text-content-300">
            修改后立即生效，但已生成的音频不会重新合成，除非手动触发重新生成。
          </p>
          <p className="text-content-300">
            完整设置请前往设置页面，里面提供更丰富的高级选项。
          </p>
        </div>
      </Drawer>
    </>
  );
}
