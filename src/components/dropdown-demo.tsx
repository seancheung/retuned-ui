import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  CopyIcon,
  DownloadIcon,
  GlobeIcon,
  MailIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";

export default function DropdownDemo() {
  return (
    <ComponentGroup title="Dropdown">
      <ComponentRow title="Default">
        <Dropdown
          items={[
            { label: "复制链接", icon: <CopyIcon /> },
            { label: "重命名", icon: <PencilIcon /> },
            { label: "分享", icon: <ShareIcon /> },
          ]}
        >
          <Button variant="secondary">
            操作
            <ChevronDownIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
      <ComponentRow title="Danger">
        <Dropdown
          items={[
            { label: "下载", icon: <DownloadIcon /> },
            { label: "重命名", icon: <PencilIcon /> },
            { type: "separator" },
            { label: "删除项目", icon: <Trash2Icon />, danger: true },
          ]}
        >
          <Button variant="ghost" size="sm" shape="circle">
            <MoreHorizontalIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
      <ComponentRow title="Shortcut">
        <Dropdown
          align="end"
          items={[
            { label: "复制", icon: <CopyIcon />, shortcut: "⌘C" },
            { label: "重命名", icon: <PencilIcon />, shortcut: "F2" },
            { type: "separator" },
            {
              label: "删除",
              icon: <Trash2Icon />,
              shortcut: "⌫",
              danger: true,
            },
          ]}
        >
          <Button variant="secondary">
            更多
            <ChevronDownIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
      <ComponentRow title="Submenu">
        <Dropdown
          items={[
            { label: "复制", icon: <CopyIcon />, shortcut: "⌘C" },
            { label: "重命名", icon: <PencilIcon /> },
            {
              label: "分享至…",
              icon: <ShareIcon />,
              items: [
                { label: "邮件", icon: <MailIcon /> },
                { label: "聊天", icon: <MessageCircleIcon /> },
                { type: "separator" },
                {
                  label: "更多渠道…",
                  icon: <GlobeIcon />,
                  items: [
                    { label: "微博", icon: <ArrowUpRightIcon /> },
                    { label: "Twitter", icon: <ArrowUpRightIcon /> },
                    { label: "复制链接", icon: <CopyIcon /> },
                  ],
                },
              ],
            },
            { type: "separator" },
            {
              label: "导出为…",
              icon: <DownloadIcon />,
              items: [
                { label: "M4B 有声书" },
                { label: "MP3 分章节" },
                { label: "WAV 无损" },
              ],
            },
            { type: "separator" },
            { label: "删除", icon: <Trash2Icon />, danger: true },
          ]}
        >
          <Button variant="secondary">
            操作
            <ChevronDownIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
      <ComponentRow title="Compact">
        <Dropdown
          compact
          items={[
            { label: "复制链接", icon: <CopyIcon /> },
            { label: "重命名", icon: <PencilIcon /> },
            { label: "分享", icon: <ShareIcon /> },
          ]}
        >
          <Button variant="ghost" size="sm" shape="circle">
            <MoreHorizontalIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Dropdown
          items={[
            { label: "可用项", icon: <CopyIcon /> },
            { label: "暂不可用", icon: <DownloadIcon />, disabled: true },
            { label: "另一项", icon: <ShareIcon /> },
          ]}
        >
          <Button variant="secondary">
            选项
            <ChevronDownIcon />
          </Button>
        </Dropdown>
      </ComponentRow>
    </ComponentGroup>
  );
}
