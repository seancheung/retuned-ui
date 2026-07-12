import { MicIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ComponentGroup, ComponentRow, voiceOptions } from "@/components/demo";
import MultiCombobox from "@/components/ui/multi-combobox";

export default function MultiComboboxDemo() {
  return (
    <ComponentGroup title="Multi Combobox">
      <ComponentRow title="Default">
        <MultiCombobox
          options={voiceOptions}
          defaultValue={["alloy", "nova"]}
        />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <MultiCombobox
          options={voiceOptions}
          defaultValue={["onyx", "echo"]}
          clearable
        />
      </ComponentRow>
      <ComponentRow title="Max tags">
        <MultiCombobox
          options={voiceOptions}
          defaultValue={["alloy", "echo", "fable", "onyx"]}
          maxTagCount={2}
        />
      </ComponentRow>
      <ComponentRow title="Icon">
        <MultiCombobox
          options={voiceOptions}
          defaultValue={["nova"]}
          icon={<MicIcon />}
        />
      </ComponentRow>
      <ComponentRow title="Custom">
        <MultiCombobox
          options={voiceOptions}
          acceptCustom
          placeholder="选择或输入自定义名称…"
        />
      </ComponentRow>
      <ComponentRow title="Async">
        <AsyncMultiCombobox />
      </ComponentRow>
      <ComponentRow title="Error">
        <MultiCombobox options={voiceOptions} defaultValue={["onyx"]} error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <MultiCombobox
          options={voiceOptions}
          defaultValue={["alloy", "nova"]}
          disabled
        />
      </ComponentRow>
    </ComponentGroup>
  );
}

function AsyncMultiCombobox() {
  const [query, setQuery] = useState("");
  const [opts, setOpts] = useState<typeof voiceOptions>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setOpts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      const matched = voiceOptions.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase()),
      );
      setOpts(matched);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <MultiCombobox
      options={opts}
      onSearch={setQuery}
      loading={loading}
      placeholder="异步搜索声音…"
      emptyMessage={query ? "未找到匹配项" : "输入关键字开始搜索"}
    />
  );
}
