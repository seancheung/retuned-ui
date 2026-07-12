import AccordionDemo from "@/components/accordion-demo";
import AlertDemo from "@/components/alert-demo";
import BadgeDemo from "@/components/badge-demo";
import ButtonDemo from "@/components/button-demo";
import CheckboxDemo from "@/components/checkbox-demo";
import CollapsibleDemo from "@/components/collapsible-demo";
import ComboboxDemo from "@/components/combobox-demo";
import ContextMenuDemo from "@/components/context-menu-demo";
import DatePickerDemo from "@/components/date-picker-demo";
import { SectionHeader } from "@/components/demo";
import DialogDemo from "@/components/dialog-demo";
import DrawerDemo from "@/components/drawer-demo";
import DropdownDemo from "@/components/dropdown-demo";
import InputDemo from "@/components/input-demo";
import InputNumberDemo from "@/components/input-number-demo";
import InputPasswordDemo from "@/components/input-password-demo";
import KnobDemo from "@/components/knob-demo";
import MultiComboboxDemo from "@/components/multi-combobox-demo";
import MultiSelectDemo from "@/components/multi-select-demo";
import PopoverDemo from "@/components/popover-demo";
import ProgressDemo from "@/components/progress-demo";
import RadioDemo from "@/components/radio-demo";
import RatingDemo from "@/components/rating-demo";
import SegmentedControlDemo from "@/components/segmented-control-demo";
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
        <ToggleDemo />
        <InputDemo />
        <InputNumberDemo />
        <InputPasswordDemo />
        <TextareaDemo />
        <SelectDemo />
        <MultiSelectDemo />
        <ComboboxDemo />
        <MultiComboboxDemo />
        <DatePickerDemo />
        <CheckboxDemo />
        <RadioDemo />
        <SwitchDemo />
        <SliderDemo />
        <KnobDemo />
        <RatingDemo />
        <SegmentedControlDemo />
        <TabDemo />
        <CollapsibleDemo />
        <AccordionDemo />
        <DropdownDemo />
        <ContextMenuDemo />
        <TooltipDemo />
        <PopoverDemo />
        <DialogDemo />
        <DrawerDemo />
        <ToastDemo />
        <AlertDemo />
        <ProgressDemo />
        <BadgeDemo />
        <SkeletonDemo />
        <TableDemo />
      </div>
    </section>
  );
}
