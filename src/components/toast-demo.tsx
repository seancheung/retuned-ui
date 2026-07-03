import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDemo() {
  return (
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
  );
}
