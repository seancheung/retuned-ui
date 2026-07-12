import { ComponentGroup, ComponentRow } from "@/components/demo";
import Toggle, { ToggleGroup } from "@/components/ui/toggle";

export default function ToggleDemo() {
  return (
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
      <ComponentRow title="Size" vertical>
        <ToggleGroup defaultValue="md" className="flex-col items-start">
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
  );
}
