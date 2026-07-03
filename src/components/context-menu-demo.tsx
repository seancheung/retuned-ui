import {
  ClipboardIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  FolderIcon,
  PencilIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import ContextMenu from "@/components/ui/context-menu";
import { cn } from "@/utils/cn";

export default function ContextMenuDemo() {
  return (
    <ComponentGroup title="Context Menu">
      <ComponentRow title="Default">
        <ContextMenu
          items={[
            { label: "复制", icon: <CopyIcon />, shortcut: "⌘C" },
            { label: "粘贴", icon: <ClipboardIcon />, shortcut: "⌘V" },
            { label: "重命名", icon: <PencilIcon />, shortcut: "F2" },
            { type: "separator" },
            { label: "删除", icon: <Trash2Icon />, danger: true },
          ]}
        >
          <ContextMenuTarget label="在此区域右键" />
        </ContextMenu>
      </ComponentRow>
      <ComponentRow title="Submenu">
        <ContextMenu
          items={[
            { label: "打开", icon: <FolderIcon /> },
            {
              label: "添加标签",
              icon: <TagIcon />,
              items: [
                { label: "重要" },
                { label: "稍后处理" },
                { label: "已归档" },
                { type: "separator" },
                {
                  label: "更多…",
                  items: [
                    { label: "草稿" },
                    { label: "推荐" },
                    { label: "实验" },
                  ],
                },
              ],
            },
            {
              label: "导出为…",
              icon: <DownloadIcon />,
              items: [
                { label: "PDF", icon: <FileTextIcon /> },
                { label: "Word", icon: <FileTextIcon /> },
                { label: "Markdown", icon: <FileTextIcon /> },
              ],
            },
            { type: "separator" },
            { label: "删除", icon: <Trash2Icon />, danger: true },
          ]}
        >
          <ContextMenuTarget label="带子菜单 · 右键试试" />
        </ContextMenu>
      </ComponentRow>
      <ComponentRow title="Dynamic">
        <ContextMenu
          items={(event: Event) => {
            const target = event.target as HTMLElement;
            const label = target.dataset.label ?? "未知";
            return [
              { label: `选中：${label}`, disabled: true },
              { type: "separator" },
              { label: "复制", icon: <CopyIcon /> },
              { label: "删除", icon: <Trash2Icon />, danger: true },
            ];
          }}
        >
          <div className="flex flex-1 gap-2">
            <ContextMenuTarget label="片段 A" data-label="片段 A" />
            <ContextMenuTarget label="片段 B" data-label="片段 B" />
            <ContextMenuTarget label="片段 C" data-label="片段 C" />
          </div>
        </ContextMenu>
      </ComponentRow>
      <ComponentRow title="Compact">
        <ContextMenu
          compact
          items={[
            { label: "打开", icon: <FolderIcon /> },
            {
              label: "添加标签",
              icon: <TagIcon />,
              items: [
                { label: "重要" },
                { label: "稍后处理" },
                { label: "已归档" },
                { type: "separator" },
                {
                  label: "更多…",
                  items: [
                    { label: "草稿" },
                    { label: "推荐" },
                    { label: "实验" },
                  ],
                },
              ],
            },
            { type: "separator" },
            { label: "删除", icon: <Trash2Icon />, danger: true },
          ]}
        >
          <ContextMenuTarget label="带子菜单 · 右键试试" />
        </ContextMenu>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <ContextMenu disabled items={[{ label: "不会显示" }]}>
          <ContextMenuTarget label="已禁用 · 右键浏览器原生菜单" />
        </ContextMenu>
      </ComponentRow>
    </ComponentGroup>
  );
}

function ContextMenuTarget({
  label,
  ...props
}: { label: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex h-16 flex-1 select-none items-center justify-center rounded-md border border-base-400 border-dashed bg-base-300 px-4 text-content-300 text-xs",
        "hover:border-primary-500/50 hover:text-content-200",
        props.className,
      )}
    >
      {label}
    </div>
  );
}
