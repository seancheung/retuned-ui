import { ComponentGroup, ComponentRow } from "@/components/demo";
import DatePicker from "@/components/ui/date-picker";

export default function DatePickerDemo() {
  const today = new Date();
  const inTwoWeeks = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 14,
  );

  return (
    <ComponentGroup title="Date Picker">
      <ComponentRow title="Default">
        <DatePicker defaultValue={today} />
      </ComponentRow>
      <ComponentRow title="Placeholder">
        <DatePicker placeholder="选择发布日期…" />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <DatePicker defaultValue={today} clearable />
      </ComponentRow>
      <ComponentRow title="Range">
        <DatePicker min={today} max={inTwoWeeks} placeholder="未来两周内…" />
      </ComponentRow>
      <ComponentRow title="Locale">
        <DatePicker defaultValue={today} locale="zh-CN" />
      </ComponentRow>
      <ComponentRow title="Error">
        <DatePicker defaultValue={today} error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <DatePicker defaultValue={today} disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
