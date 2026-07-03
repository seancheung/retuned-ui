import { ComponentGroup, ComponentRow } from "@/components/demo";
import Slider from "@/components/ui/slider";

export default function SliderDemo() {
  return (
    <ComponentGroup title="Slider">
      <ComponentRow title="Default">
        <Slider className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Slider className="flex-1" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
