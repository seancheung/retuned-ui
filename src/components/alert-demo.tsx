import { ComponentGroup } from "@/components/demo";
import Alert from "@/components/ui/alert";

export default function AlertDemo() {
  return (
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
  );
}
