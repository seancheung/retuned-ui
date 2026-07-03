import { ComponentGroup, ComponentRow } from "@/components/demo";
import Checkbox from "@/components/ui/checkbox";

export default function CheckboxDemo() {
  return (
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
  );
}
