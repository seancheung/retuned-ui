import { ComponentGroup, ComponentRow } from "@/components/demo";
import Switch from "@/components/ui/switch";

export default function SwitchDemo() {
  return (
    <ComponentGroup title="Switch">
      <ComponentRow title="Default">
        <Switch label="启用 GPU 加速" />
      </ComponentRow>
      <ComponentRow title="Checked">
        <Switch label="自动保存进度" defaultValue />
      </ComponentRow>
      <ComponentRow title="Size" vertical>
        <Switch size="sm" label="Small" defaultValue />
        <Switch size="md" label="Medium" defaultValue />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Switch label="未选中 · 禁用" disabled />
        <Switch label="选中 · 禁用" disabled defaultValue />
      </ComponentRow>
    </ComponentGroup>
  );
}
