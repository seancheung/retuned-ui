import { ComponentGroup, ComponentRow } from "@/components/demo";
import Calendar from "@/components/ui/calendar";

export default function CalendarDemo() {
  const today = new Date();
  const inTwoWeeks = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 14,
  );

  return (
    <ComponentGroup title="Calendar">
      <ComponentRow title="Default">
        <Calendar defaultValue={today} />
      </ComponentRow>
      <ComponentRow title="Range">
        <Calendar min={today} max={inTwoWeeks} />
      </ComponentRow>
    </ComponentGroup>
  );
}
