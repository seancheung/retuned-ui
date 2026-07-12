import { Mic2Icon, MicIcon } from "lucide-react";
import { ComponentGroup, ComponentRow, voiceOptions } from "@/components/demo";
import MultiSelect from "@/components/ui/multi-select";

export default function MultiSelectDemo() {
  return (
    <ComponentGroup title="Multi Select">
      <ComponentRow title="Default">
        <MultiSelect options={voiceOptions} defaultValue={["alloy", "nova"]} />
      </ComponentRow>
      <ComponentRow title="Placeholder">
        <MultiSelect options={voiceOptions} placeholder="选择声音…" />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <MultiSelect
          options={voiceOptions}
          defaultValue={["onyx", "echo"]}
          clearable
        />
      </ComponentRow>
      <ComponentRow title="Max tags">
        <MultiSelect
          options={voiceOptions}
          defaultValue={["alloy", "echo", "fable", "onyx"]}
          maxTagCount={2}
        />
      </ComponentRow>
      <ComponentRow title="Icon">
        <MultiSelect
          options={voiceOptions}
          defaultValue={["onyx"]}
          icon={<MicIcon />}
        />
      </ComponentRow>
      <ComponentRow title="Renderer">
        <MultiSelect
          options={voiceOptions}
          defaultValue={["onyx"]}
          renderOption={(o) => (
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0 text-content-300">
                <Mic2Icon className="size-3.5" />
              </span>
              <span className="truncate">{o.label}</span>
            </span>
          )}
        />
      </ComponentRow>
      <ComponentRow title="Error">
        <MultiSelect options={voiceOptions} defaultValue={["onyx"]} error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <MultiSelect
          options={voiceOptions}
          defaultValue={["alloy", "nova"]}
          disabled
        />
      </ComponentRow>
    </ComponentGroup>
  );
}
