import { SectionHeader } from "@/components/demo";
import { cn } from "@/utils/cn";

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

export default function ColorSection() {
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
                  className="overflow-hidden rounded-lg border border-base-400 bg-base-100"
                >
                  <div
                    className={cn(
                      "flex h-18 items-center justify-center border-base-200 border-b",
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
