import { Mic2Icon, MicIcon, XIcon } from "lucide-react";
import { useState } from "react";
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
      <ComponentRow title="Hide tags" vertical>
        <HideTagsMultiSelect />
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

function HideTagsMultiSelect() {
  const [values, setValues] = useState<string[]>(["alloy", "echo"]);
  const selected = voiceOptions.filter((o) => values.includes(o.value));

  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        options={voiceOptions}
        value={values}
        onChange={setValues}
        hideTags
      />
      {selected.length > 0 && (
        <div className="flex flex-col gap-1">
          {selected.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center justify-between rounded-sm bg-base-300 p-1.5 text-content-200 text-xs"
            >
              <span>{opt.label}</span>
              <button
                type="button"
                aria-label={`Remove ${opt.label}`}
                onClick={() =>
                  setValues((prev) => prev.filter((v) => v !== opt.value))
                }
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-content-400 transition hover:text-content-200"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
