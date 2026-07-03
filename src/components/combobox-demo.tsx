import { MicIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ComponentGroup, ComponentRow, voiceOptions } from "@/components/demo";
import Combobox from "@/components/ui/combobox";

export default function ComboboxDemo() {
  return (
    <ComponentGroup title="Combobox">
      <ComponentRow title="Default">
        <Combobox options={voiceOptions} defaultValue="shimmer" />
      </ComponentRow>
      <ComponentRow title="Clearable">
        <Combobox options={voiceOptions} defaultValue="nova" clearable />
      </ComponentRow>
      <ComponentRow title="Icon">
        <Combobox
          options={voiceOptions}
          defaultValue="nova"
          icon={<MicIcon />}
        />
      </ComponentRow>
      <ComponentRow title="Custom">
        <Combobox
          options={voiceOptions}
          acceptCustom
          placeholder="选择或输入自定义名称…"
        />
      </ComponentRow>
      <ComponentRow title="Async">
        <AsyncCombobox />
      </ComponentRow>
      <ComponentRow title="Error">
        <Combobox options={voiceOptions} defaultValue="onyx" error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Combobox options={voiceOptions} defaultValue="alloy" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}

function AsyncCombobox() {
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
    <Combobox
      options={opts}
      onSearch={setQuery}
      loading={loading}
      placeholder="异步搜索声音…"
      emptyMessage={query ? "未找到匹配项" : "输入关键字开始搜索"}
    />
  );
}
