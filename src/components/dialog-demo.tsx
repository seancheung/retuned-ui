import { useState } from "react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";

export default function DialogDemo() {
  return (
    <ComponentGroup title="Dialog">
      <ComponentRow title="Default">
        <DialogExample
          size="md"
          triggerLabel="打开 Dialog"
          title="确认导出"
          description="即将把 1,247 句句子合并并导出为 M4B 有声书文件。"
        >
          <p>预计耗时约 3 分钟，过程中无法继续编辑。</p>
        </DialogExample>
      </ComponentRow>
      <ComponentRow title="Small">
        <DialogExample
          size="sm"
          triggerLabel="删除项目"
          title="删除「三体 · 黑暗森林」？"
          description="删除后已生成的音频和元数据将全部移除，此操作不可恢复。"
          danger
        />
      </ComponentRow>
      <ComponentRow title="Large">
        <DialogExample
          size="lg"
          triggerLabel="查看日志"
          title="生成日志"
          description="最近一次任务运行的完整输出"
        >
          <pre className="max-h-60 overflow-auto rounded-md bg-base-100 p-3 font-mono text-content-300 text-xs">
            {`[12:01:22] sent_03_041 → success (3.2s)\n[12:01:25] sent_03_042 → success (4.8s)\n[12:01:30] sent_03_043 → generating…\n[12:01:33] sent_03_043 → success (3.1s)\n[12:01:36] sent_03_044 → failed (401 Unauthorized)\n[12:01:36] sent_03_044 → retry 1/3\n[12:01:39] sent_03_044 → success (3.3s)`}
          </pre>
        </DialogExample>
      </ComponentRow>
      <ComponentRow title="Non-closable">
        <DialogExample
          size="md"
          triggerLabel="强制确认"
          title="必须确认"
          description="必须点击下方按钮才能关闭，点击外部 / Esc 无效。"
          closable={false}
        />
      </ComponentRow>
    </ComponentGroup>
  );
}

function DialogExample({
  size,
  triggerLabel,
  title,
  description,
  children,
  closable,
  danger,
}: {
  size?: "sm" | "md" | "lg";
  triggerLabel: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  closable?: boolean;
  danger?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size={size}
        title={title}
        description={description}
        closable={closable}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button
              variant={danger ? "danger" : "primary"}
              onClick={() => setOpen(false)}
            >
              {danger ? "删除" : "确认"}
            </Button>
          </>
        }
      >
        {children}
      </Dialog>
    </>
  );
}
