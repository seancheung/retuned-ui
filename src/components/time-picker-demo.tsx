import { ComponentGroup, ComponentRow } from "@/components/demo";
import TimePicker from "@/components/ui/time-picker";

export default function TimePickerDemo() {
  return (
    <ComponentGroup title="Time Picker">
      <ComponentRow title="Default">
        <TimePicker defaultValue="09:30" />
      </ComponentRow>
      <ComponentRow title="Placeholder">
        <TimePicker placeholder="选择提醒时间…" />
      </ComponentRow>
      <ComponentRow title="Seconds">
        <TimePicker defaultValue="09:30:45" showSeconds />
      </ComponentRow>
      <ComponentRow title="Steps">
        <TimePicker defaultValue="09:15" minuteStep={15} />
      </ComponentRow>
      <ComponentRow title="12 hours">
        <TimePicker defaultValue="21:30" use12Hours />
      </ComponentRow>
      <ComponentRow title="Range">
        <TimePicker min="09:00" max="18:00" placeholder="工作时间内…" />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <TimePicker defaultValue="21:00" clearable />
      </ComponentRow>
      <ComponentRow title="Error">
        <TimePicker defaultValue="09:30" error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <TimePicker defaultValue="09:30" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
