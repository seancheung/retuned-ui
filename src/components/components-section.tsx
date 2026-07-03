import AlertDemo from "@/components/alert-demo";
import BadgeDemo from "@/components/badge-demo";
import ButtonDemo from "@/components/button-demo";
import CheckboxDemo from "@/components/checkbox-demo";
import ComboboxDemo from "@/components/combobox-demo";
import ContextMenuDemo from "@/components/context-menu-demo";
import { SectionHeader } from "@/components/demo";
import DialogDemo from "@/components/dialog-demo";
import DrawerDemo from "@/components/drawer-demo";
import DropdownDemo from "@/components/dropdown-demo";
import InputDemo from "@/components/input-demo";
import InputNumberDemo from "@/components/input-number-demo";
import InputPasswordDemo from "@/components/input-password-demo";
import KnobDemo from "@/components/knob-demo";
import ProgressDemo from "@/components/progress-demo";
import RadioDemo from "@/components/radio-demo";
import SelectDemo from "@/components/select-demo";
import SkeletonDemo from "@/components/skeleton-demo";
import SliderDemo from "@/components/slider-demo";
import SwitchDemo from "@/components/switch-demo";
import TabDemo from "@/components/tab-demo";
import TableDemo from "@/components/table-demo";
import TextareaDemo from "@/components/textarea-demo";
import ToastDemo from "@/components/toast-demo";
import ToggleDemo from "@/components/toggle-demo";
import TooltipDemo from "@/components/tooltip-demo";

export default function ComponentsSection() {
  return (
    <section>
      <SectionHeader number="03" title="组件" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ButtonDemo />
        <SliderDemo />
        <InputDemo />
        <SelectDemo />
        <ComboboxDemo />
        <DropdownDemo />
        <ContextMenuDemo />
        <TooltipDemo />
        <TextareaDemo />
        <DrawerDemo />
        <DialogDemo />
        <AlertDemo />
        <ToggleDemo />
        <CheckboxDemo />
        <RadioDemo />
        <SwitchDemo />
        <TabDemo />
        <InputNumberDemo />
        <InputPasswordDemo />
        <KnobDemo />
        <ToastDemo />
        <ProgressDemo />
        <BadgeDemo />
        <SkeletonDemo />
        <TableDemo />
      </div>
    </section>
  );
}
