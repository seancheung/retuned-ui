import { ComponentGroup, ComponentRow } from "@/components/demo";
import InputNumber from "@/components/ui/input-number";

export default function InputNumberDemo() {
  return (
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
  );
}
