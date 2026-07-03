import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ClipboardIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  FolderIcon,
  GlobeIcon,
  HomeIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  MicIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/alert";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Combobox from "@/components/ui/combobox";
import ContextMenu from "@/components/ui/context-menu";
import Dialog from "@/components/ui/dialog";
import Drawer from "@/components/ui/drawer";
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import InputNumber from "@/components/ui/input-number";
import InputPassword from "@/components/ui/input-password";
import Knob from "@/components/ui/knob";
import Progress from "@/components/ui/progress";
import Radio, { RadioGroup } from "@/components/ui/radio";
import Select from "@/components/ui/select";
import Slider from "@/components/ui/slider";
import Switch from "@/components/ui/switch";
import Tabs from "@/components/ui/tab";
import Textarea from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import Toggle, { ToggleGroup } from "@/components/ui/toggle";
import Tooltip from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

export default function App() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12">
      <TypographySection />
      <ColorSection />
      <ComponentsSection />
    </div>
  );
}

function ComponentsSection() {
  return (
    <section>
      <SectionHeader number="03" title="组件" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComponentGroup title="Button">
          <ComponentRow title="Variant">
            <Button>
              <PlusIcon />
              Primary
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </ComponentRow>
          <ComponentRow title="Size">
            <Button variant="primary" size="lg">
              <PlusIcon />
              Large
            </Button>
            <Button variant="secondary" size="md">
              Medium
            </Button>
            <Button variant="danger" size="sm">
              Small
            </Button>
          </ComponentRow>
          <ComponentRow title="Shape">
            <Button shape="normal">
              <PlusIcon />
              Button
            </Button>
            <Button shape="square">
              <PlusIcon />
            </Button>
            <Button shape="circle">
              <PlusIcon />
            </Button>
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Button variant="primary" disabled>
              <PlusIcon />
              Disabled
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="danger" disabled>
              Disabled
            </Button>
            <Button variant="ghost" disabled>
              <HomeIcon />
            </Button>
          </ComponentRow>
          <ComponentRow title="Loading">
            <Button variant="primary" disabled>
              <Loader2Icon className="animate-spin" />
              Loading
            </Button>
            <Button variant="secondary" disabled>
              <Loader2Icon className="animate-spin" />
              Loading
            </Button>
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Slider">
          <ComponentRow title="Default">
            <Slider className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Slider className="flex-1" disabled />
          </ComponentRow>
        </ComponentGroup>
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
        <ComponentGroup title="Select">
          <ComponentRow title="Default">
            <Select options={voiceOptions} defaultValue="shimmer" />
          </ComponentRow>
          <ComponentRow title="Placeholder">
            <Select options={voiceOptions} placeholder="选择声音…" />
          </ComponentRow>
          <ComponentRow title="Clearable">
            <Select options={voiceOptions} defaultValue="onyx" clearable />
          </ComponentRow>
          <ComponentRow title="Icon">
            <Select
              options={voiceOptions}
              defaultValue="onyx"
              icon={<MicIcon />}
            />
          </ComponentRow>
          <ComponentRow title="Error">
            <Select options={voiceOptions} defaultValue="onyx" error />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Select options={voiceOptions} defaultValue="alloy" disabled />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Combobox">
          <ComponentRow title="Default">
            <Combobox options={voiceOptions} defaultValue="shimmer" />
          </ComponentRow>
          <ComponentRow title="Clearable">
            <Combobox options={voiceOptions} defaultValue="nova" clearable />
          </ComponentRow>
          <ComponentRow title="Icon">
            <Combobox
              options={voiceOptions}
              defaultValue="nova"
              icon={<MicIcon />}
            />
          </ComponentRow>
          <ComponentRow title="Custom">
            <Combobox
              options={voiceOptions}
              acceptCustom
              placeholder="选择或输入自定义名称…"
            />
          </ComponentRow>
          <ComponentRow title="Async">
            <AsyncComboboxDemo />
          </ComponentRow>
          <ComponentRow title="Error">
            <Combobox options={voiceOptions} defaultValue="onyx" error />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Combobox options={voiceOptions} defaultValue="alloy" disabled />
          </ComponentRow>
        </ComponentGroup>
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
        <ComponentGroup title="Tooltip">
          <ComponentRow title="Top">
            <Tooltip content="导出为 M4B 有声书">
              <Button variant="secondary">悬停查看</Button>
            </Tooltip>
          </ComponentRow>
          <ComponentRow title="Sides">
            <Tooltip content="顶部" side="top">
              <Button variant="ghost" size="sm" shape="circle">
                <HomeIcon />
              </Button>
            </Tooltip>
            <Tooltip content="右侧" side="right">
              <Button variant="ghost" size="sm" shape="circle">
                <PlusIcon />
              </Button>
            </Tooltip>
            <Tooltip content="底部" side="bottom">
              <Button variant="ghost" size="sm" shape="circle">
                <SearchIcon />
              </Button>
            </Tooltip>
            <Tooltip content="左侧" side="left">
              <Button variant="ghost" size="sm" shape="circle">
                <DownloadIcon />
              </Button>
            </Tooltip>
          </ComponentRow>
          <ComponentRow title="Long">
            <Tooltip content="生成完成后会按章节自动切片，包含元数据、封面与章节点信息。">
              <Button variant="secondary">长文本</Button>
            </Tooltip>
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Tooltip content="不会显示" disabled>
              <Button variant="secondary">已禁用提示</Button>
            </Tooltip>
          </ComponentRow>
        </ComponentGroup>
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
        <ComponentGroup title="Drawer">
          <ComponentRow title="Right">
            <DrawerDemo side="right" triggerLabel="从右侧打开" />
          </ComponentRow>
          <ComponentRow title="Left">
            <DrawerDemo side="left" triggerLabel="从左侧打开" />
          </ComponentRow>
          <ComponentRow title="Top">
            <DrawerDemo side="top" triggerLabel="从顶部打开" />
          </ComponentRow>
          <ComponentRow title="Bottom">
            <DrawerDemo side="bottom" triggerLabel="从底部打开" />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Dialog">
          <ComponentRow title="Default">
            <DialogDemo
              size="md"
              triggerLabel="打开 Dialog"
              title="确认导出"
              description="即将把 1,247 句句子合并并导出为 M4B 有声书文件。"
            >
              <p>预计耗时约 3 分钟，过程中无法继续编辑。</p>
            </DialogDemo>
          </ComponentRow>
          <ComponentRow title="Small">
            <DialogDemo
              size="sm"
              triggerLabel="删除项目"
              title="删除「三体 · 黑暗森林」？"
              description="删除后已生成的音频和元数据将全部移除，此操作不可恢复。"
              danger
            />
          </ComponentRow>
          <ComponentRow title="Large">
            <DialogDemo
              size="lg"
              triggerLabel="查看日志"
              title="生成日志"
              description="最近一次任务运行的完整输出"
            >
              <pre className="max-h-60 overflow-auto rounded-md bg-base-100 p-3 font-mono text-content-300 text-xs">
                {`[12:01:22] sent_03_041 → success (3.2s)\n[12:01:25] sent_03_042 → success (4.8s)\n[12:01:30] sent_03_043 → generating…\n[12:01:33] sent_03_043 → success (3.1s)\n[12:01:36] sent_03_044 → failed (401 Unauthorized)\n[12:01:36] sent_03_044 → retry 1/3\n[12:01:39] sent_03_044 → success (3.3s)`}
              </pre>
            </DialogDemo>
          </ComponentRow>
          <ComponentRow title="Non-closable">
            <DialogDemo
              size="md"
              triggerLabel="强制确认"
              title="必须确认"
              description="必须点击下方按钮才能关闭，点击外部 / Esc 无效。"
              closable={false}
            />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Alert">
          <Alert variant="success" title="连接成功">
            已拉取到 12 个可用声音，可以进入下一步。
          </Alert>
          <Alert variant="warning" title="尚有 23 句未生成">
            导出前请选择缺失句子的处理策略（跳过 / 静音占位 / 取消）。
          </Alert>
          <Alert variant="error" title="鉴权失败 · 401 Unauthorized">
            API Key 无效或已过期。打开 TTS 配置 → 重新测试。
          </Alert>
          <Alert variant="info" title="检测到上次有未完成任务">
            已从中断点继续，共 247 句待生成。
          </Alert>
        </ComponentGroup>
        <ComponentGroup title="Toggle">
          <ComponentRow title="Group">
            <ToggleGroup defaultValue="grid">
              <Toggle value="grid">网格</Toggle>
              <Toggle value="list">列表</Toggle>
              <Toggle value="board">看板</Toggle>
            </ToggleGroup>
          </ComponentRow>
          <ComponentRow title="Cancelable">
            <ToggleGroup defaultValue="m4b" cancelable>
              <Toggle value="m4b">M4B</Toggle>
              <Toggle value="mp3">MP3</Toggle>
              <Toggle value="wav">WAV</Toggle>
            </ToggleGroup>
          </ComponentRow>
          <ComponentRow title="Standalone">
            <Toggle defaultValue>独立 · 默认开</Toggle>
            <Toggle>独立 · 默认关</Toggle>
          </ComponentRow>
          <ComponentRow title="Variant">
            <Toggle variant="default" defaultValue>
              Default
            </Toggle>
            <Toggle variant="success" defaultValue>
              Success
            </Toggle>
            <Toggle variant="info" defaultValue>
              Info
            </Toggle>
            <Toggle variant="error" defaultValue>
              Error
            </Toggle>
          </ComponentRow>
          <ComponentRow title="Size">
            <ToggleGroup defaultValue="md">
              <Toggle value="sm" size="sm">
                Small
              </Toggle>
              <Toggle value="md" size="md">
                Medium
              </Toggle>
              <Toggle value="lg" size="lg">
                Large
              </Toggle>
            </ToggleGroup>
          </ComponentRow>
          <ComponentRow title="Group · Disabled">
            <ToggleGroup defaultValue="b" disabled>
              <Toggle value="a">未选中</Toggle>
              <Toggle value="b">选中</Toggle>
            </ToggleGroup>
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Toggle disabled>未选中 · 禁用</Toggle>
            <Toggle disabled defaultValue>
              选中 · 禁用
            </Toggle>
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Checkbox">
          <ComponentRow title="Default">
            <Checkbox label="生成完成后发送系统通知" />
          </ComponentRow>
          <ComponentRow title="Checked">
            <Checkbox label="自动跳过已忽略的句子" defaultValue />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Checkbox label="未选中 · 禁用" disabled />
            <Checkbox label="选中 · 禁用" disabled defaultValue />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Radio">
          <ComponentRow title="Group">
            <RadioGroup defaultValue="m4b">
              <Radio value="m4b" label="M4B（带章节）" />
              <Radio value="mp3" label="MP3（分章节）" />
              <Radio value="wav" label="WAV（无损）" />
            </RadioGroup>
          </ComponentRow>
          <ComponentRow title="Disabled">
            <RadioGroup defaultValue="high" disabled className="flex-row gap-4">
              <Radio value="standard" label="标准品质" />
              <Radio value="high" label="高品质" />
            </RadioGroup>
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Switch">
          <ComponentRow title="Default">
            <Switch label="启用 GPU 加速" />
          </ComponentRow>
          <ComponentRow title="Checked">
            <Switch label="自动保存进度" defaultValue />
          </ComponentRow>
          <ComponentRow title="Size">
            <Switch size="sm" label="Small" defaultValue />
            <Switch size="md" label="Medium" defaultValue />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Switch label="未选中 · 禁用" disabled />
            <Switch label="选中 · 禁用" disabled defaultValue />
          </ComponentRow>
        </ComponentGroup>
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
        <ComponentGroup title="Input Number">
          <ComponentRow title="Default">
            <InputNumber defaultValue={50} />
          </ComponentRow>
          <ComponentRow title="Range">
            <InputNumber defaultValue={1.5} min={0} max={2} step={0.1} />
          </ComponentRow>
          <ComponentRow title="Clearable">
            <InputNumber defaultValue={1.5} clearable />
          </ComponentRow>
          <ComponentRow title="Integer">
            <InputNumber defaultValue={1} integer />
          </ComponentRow>
          <ComponentRow title="Error">
            <InputNumber defaultValue={101} error />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <InputNumber defaultValue={42} disabled />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Input Password">
          <ComponentRow title="Default">
            <InputPassword defaultValue="12345" />
          </ComponentRow>
          <ComponentRow title="Icon">
            <InputPassword defaultValue="12345" icon={<LockIcon />} />
          </ComponentRow>
          <ComponentRow title="Error">
            <InputPassword defaultValue="12345" error />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <InputPassword defaultValue="12345" disabled />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Knob">
          <ComponentRow title="Default">
            <Knob defaultValue={50} />
          </ComponentRow>
          <ComponentRow title="Size">
            <Knob defaultValue={30} size="sm" />
            <Knob defaultValue={70} size="md" />
          </ComponentRow>
          <ComponentRow title="Disabled">
            <Knob defaultValue={50} disabled />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Toast">
          <ComponentRow title="Variant">
            <Button
              variant="secondary"
              onClick={() =>
                toast.success({
                  title: "导出完成",
                  description: "已生成 1,247 句音频，可前往输出目录查看。",
                })
              }
            >
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.warning({
                  title: "尚有 23 句未生成",
                  description: "导出前请选择缺失句子的处理策略。",
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.error({
                  title: "鉴权失败 · 401",
                  description: "API Key 无效或已过期，请检查 TTS 配置。",
                })
              }
            >
              Error
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.info({
                  title: "检测到上次有未完成任务",
                  description: "已从中断点继续，共 247 句待生成。",
                })
              }
            >
              Info
            </Button>
          </ComponentRow>
          <ComponentRow title="Default">
            <Button variant="secondary" onClick={() => toast("已复制到剪贴板")}>
              触发简单 Toast
            </Button>
          </ComponentRow>
          <ComponentRow title="Action">
            <Button
              variant="secondary"
              onClick={() =>
                toast.info({
                  title: "已删除「三体 · 黑暗森林」",
                  description: "音频与元数据已移除。",
                  duration: 8000,
                  action: {
                    label: "撤销",
                    onClick: () => toast.success("已恢复项目"),
                  },
                })
              }
            >
              带操作按钮
            </Button>
          </ComponentRow>
          <ComponentRow title="Persistent">
            <Button
              variant="secondary"
              onClick={() =>
                toast.warning({
                  title: "需要手动关闭",
                  description: "duration 设为 0 时不会自动消失。",
                  duration: 0,
                })
              }
            >
              不自动消失
            </Button>
            <Button variant="ghost" onClick={() => toast.dismiss()}>
              清除全部
            </Button>
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Progress">
          <ComponentRow title="Default">
            <Progress value={67} className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Success">
            <Progress variant="success" value={100} className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Info">
            <Progress variant="info" value={20} className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Error">
            <Progress variant="error" value={40} className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Small">
            <Progress size="sm" value={50} className="flex-1" />
          </ComponentRow>
          <ComponentRow title="Circular">
            <Progress shape="circular" value={67} />
            <Progress shape="circular" variant="success" value={100} />
            <Progress
              shape="circular"
              variant="info"
              className="animate-spin"
              value={20}
            />
            <Progress shape="circular" variant="error" value={40} />
            <Progress shape="circular" size="sm" value={45} />
          </ComponentRow>
        </ComponentGroup>
        <ComponentGroup title="Badge">
          <ComponentRow title="Variant">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </ComponentRow>
          <ComponentRow title="Rounded">
            <Badge variant="primary" rounded>
              Primary
            </Badge>
            <Badge variant="secondary" rounded>
              Secondary
            </Badge>
            <Badge variant="success" rounded>
              Success
            </Badge>
            <Badge variant="info" rounded>
              Info
            </Badge>
            <Badge variant="warning" rounded>
              Warning
            </Badge>
            <Badge variant="error" rounded>
              Error
            </Badge>
          </ComponentRow>
          <ComponentRow title="Bordered">
            <Badge variant="primary" bordered>
              Primary
            </Badge>
            <Badge variant="secondary" bordered>
              Secondary
            </Badge>
            <Badge variant="success" bordered>
              Success
            </Badge>
            <Badge variant="info" bordered>
              Info
            </Badge>
            <Badge variant="warning" bordered>
              Warning
            </Badge>
            <Badge variant="error" bordered>
              Error
            </Badge>
          </ComponentRow>
          <ComponentRow title="Opaque">
            <Badge variant="primary" opaque>
              Primary
            </Badge>
            <Badge variant="secondary" opaque>
              Secondary
            </Badge>
            <Badge variant="success" opaque>
              Success
            </Badge>
            <Badge variant="info" opaque>
              Info
            </Badge>
            <Badge variant="warning" opaque>
              Warning
            </Badge>
            <Badge variant="error" opaque>
              Error
            </Badge>
          </ComponentRow>
          <ComponentRow title="Small">
            <Badge variant="primary" size="sm">
              Primary
            </Badge>
            <Badge variant="secondary" size="sm">
              Secondary
            </Badge>
            <Badge variant="success" size="sm">
              Success
            </Badge>
            <Badge variant="info" size="sm">
              Info
            </Badge>
            <Badge variant="warning" size="sm">
              Warning
            </Badge>
            <Badge variant="error" size="sm">
              Error
            </Badge>
          </ComponentRow>
        </ComponentGroup>
      </div>
    </section>
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
        "flex h-16 flex-1 select-none items-center justify-center rounded-md border border-content-400/30 border-dashed bg-base-300 px-4 text-content-300 text-xs",
        "hover:border-primary-500/50 hover:text-content-200",
        props.className,
      )}
    >
      {label}
    </div>
  );
}

function AsyncComboboxDemo() {
  const [query, setQuery] = useState("");
  const [opts, setOpts] = useState<typeof voiceOptions>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setOpts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      const matched = voiceOptions.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase()),
      );
      setOpts(matched);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Combobox
      options={opts}
      onSearch={setQuery}
      loading={loading}
      placeholder="异步搜索声音…"
      emptyMessage={query ? "未找到匹配项" : "输入关键字开始搜索"}
    />
  );
}

function DrawerDemo({
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

function DialogDemo({
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

const tabItems = [
  { value: "overview", label: "总览" },
  { value: "voices", label: "声音" },
  { value: "sentences", label: "句子" },
  { value: "export", label: "导出" },
];

const voiceOptions = [
  { value: "alloy", label: "Alloy · 中性" },
  { value: "echo", label: "Echo · 男声" },
  { value: "fable", label: "Fable · 英式男声" },
  { value: "onyx", label: "Onyx · 低沉男声" },
  { value: "nova", label: "Nova · 女声" },
  { value: "shimmer", label: "Shimmer · 柔和女声" },
];

function ComponentRow({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-20 font-mono text-content-300 text-xs uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  );
}

function ComponentGroup({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-content-400/30 bg-base-200 p-6">
      <div className="mb-5 flex items-center gap-2 font-semibold text-content-300 text-sm uppercase tracking-wider">
        <span className="h-1 w-1 rounded-full bg-primary-500" />
        {title}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ColorSection() {
  return (
    <section>
      <SectionHeader number="02" title="色彩体系" />
      <div className="flex flex-col gap-8">
        {colorGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-4 font-semibold text-content-300 text-sm uppercase tracking-wider">
              {group.title}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
              {group.colors.map((color) => (
                <div
                  key={color.name}
                  className="overflow-hidden rounded-lg border border-content-400/30 bg-base-300"
                >
                  <div
                    className={cn(
                      "flex h-18 items-center justify-center",
                      color.className,
                    )}
                  >
                    {color.text && <span className="text-3xl">Aa</span>}
                  </div>
                  <div className="p-3">
                    <div className="mb-0.5 font-medium text-content-100 text-sm">
                      {color.name}
                    </div>
                    <div className="mt-1 text-content-300 text-xs">
                      {color.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section>
      <SectionHeader number="01" title="字体排版" />
      <div className="flex flex-col">
        {typeRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[140px_1fr] items-center gap-6 border-content-400/30 border-b border-dashed py-5 last:border-b-0"
          >
            <div className="pt-2 font-mono text-content-300 text-xs">
              <strong className="mb-1 block font-medium text-content-200 uppercase tracking-wider">
                {row.label}
              </strong>
              {row.spec}
            </div>
            <div className={row.className}>{SAMPLE}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-6 border-content-400/30 border-b pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-primary-500 text-xs">{number}</span>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <p className="max-w-sm text-right text-content-300 text-xs">{desc}</p>
    </div>
  );
}

const SAMPLE = "开始你的第一本有声书 · Start your first audiobook";

const typeRows = [
  {
    label: "Display",
    spec: "text-3xl",
    className: "text-3xl",
  },
  {
    label: "H1",
    spec: "text-2xl",
    className: "text-2xl",
  },
  {
    label: "H2",
    spec: "text-xl",
    className: "text-xl",
  },
  {
    label: "H3",
    spec: "text-lg",
    className: "text-lg",
  },
  {
    label: "Body",
    spec: "text-base",
    className: "text-base text-content-200",
  },
  {
    label: "Label",
    spec: "text-sm",
    className: "text-sm tracking-wider text-content-200",
  },
  {
    label: "Caption",
    spec: "text-xs",
    className: "text-xs text-content-300",
  },
  {
    label: "Tiny",
    spec: "text-tiny",
    className: "text-tiny text-content-300",
  },
];

const colorGroups = [
  {
    title: "品牌主色 · 琥珀色系",
    colors: [
      {
        name: "primary-400",
        className: "bg-primary-400",
        role: "悬停 / 高亮",
      },
      {
        name: "primary-500",
        className: "bg-primary-500",
        role: "主操作 / 品牌锚点",
      },
      {
        name: "primary-600",
        className: "bg-primary-600",
        role: "按下 / 活动状态",
      },
      {
        name: "primary-content",
        className: "bg-primary-500 text-primary-content",
        role: "主色上的文字",
        text: true,
      },
    ],
  },
  {
    title: "基础层 · 分层暗色",
    colors: [
      {
        name: "base-100",
        className: "bg-base-100",
        role: "窗口底层",
      },
      {
        name: "base-200",
        className: "bg-base-200",
        role: "主工作区",
      },
      {
        name: "base-300",
        className: "bg-base-300",
        role: "面板 / 卡片",
      },
      {
        name: "base-400",
        className: "bg-base-400",
        role: "弹窗 / 菜单",
      },
    ],
  },
  {
    title: "文字 · Off-white 阶梯",
    colors: [
      {
        name: "content-100",
        role: "标题 / 重要内容",
        className: "bg-base-100 text-content-100",
        text: true,
      },
      {
        name: "content-200",
        className: "bg-base-100 text-content-200",
        role: "正文",
        text: true,
      },
      {
        name: "content-300",
        className: "bg-base-100 text-content-300",
        role: "辅助说明",
        text: true,
      },
      {
        name: "content-400",
        className: "bg-base-100 text-content-400",
        role: "禁用 / 占位",
        text: true,
      },
    ],
  },
  {
    title: "语义色 · 为深色底调校",
    colors: [
      {
        name: "success",
        className: "bg-success",
        role: "成功",
      },
      {
        name: "success-content",
        className: "bg-success text-success-content",
        role: "成功色上的文字",
        text: true,
      },
      {
        name: "warning",
        className: "bg-warning",
        role: "警告",
      },
      {
        name: "warning-content",
        className: "bg-warning text-warning-content",
        role: "警告色上的文字",
        text: true,
      },
      { name: "error", className: "bg-error", role: "失败" },
      {
        name: "error-content",
        className: "bg-error text-error-content",
        role: "失败色上的文字",
        text: true,
      },
      { name: "info", className: "bg-info", role: "信息" },
      {
        name: "info-content",
        className: "bg-info text-info-content",
        role: "信息色上的文字",
        text: true,
      },
    ],
  },
];
