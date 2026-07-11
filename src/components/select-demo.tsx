import { Mic2Icon, MicIcon } from "lucide-react";
import { ComponentGroup, ComponentRow, voiceOptions } from "@/components/demo";
import Select from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <ComponentGroup title="Select">
      <ComponentRow title="Default">
        <Select options={voiceOptions} defaultValue="shimmer" />
      </ComponentRow>
      <ComponentRow title="Placeholder">
        <Select options={voiceOptions} placeholder="选择声音…" />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <Select options={voiceOptions} defaultValue="onyx" clearable />
      </ComponentRow>
      <ComponentRow title="Icon">
        <Select options={voiceOptions} defaultValue="onyx" icon={<MicIcon />} />
      </ComponentRow>
      <ComponentRow title="Renderer">
        <Select
          options={voiceOptions}
          defaultValue="onyx"
          icon={<MicIcon />}
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
        <Select options={voiceOptions} defaultValue="onyx" error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Select options={voiceOptions} defaultValue="alloy" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
