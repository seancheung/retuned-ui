import { ComponentGroup, ComponentRow } from "@/components/demo";
import Knob from "@/components/ui/knob";

export default function KnobDemo() {
  return (
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
  );
}
