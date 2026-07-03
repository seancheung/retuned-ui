import { DownloadIcon, HomeIcon, PlusIcon, SearchIcon } from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <ComponentGroup title="Tooltip">
      <ComponentRow title="Top">
        <Tooltip content="导出为 M4B 有声书">
          <Button variant="secondary">悬停查看</Button>
        </Tooltip>
      </ComponentRow>
      <ComponentRow title="Sides">
        <Tooltip content="顶部" side="top">
          <Button variant="ghost" size="sm" shape="circle">
            <HomeIcon />
          </Button>
        </Tooltip>
        <Tooltip content="右侧" side="right">
          <Button variant="ghost" size="sm" shape="circle">
            <PlusIcon />
          </Button>
        </Tooltip>
        <Tooltip content="底部" side="bottom">
          <Button variant="ghost" size="sm" shape="circle">
            <SearchIcon />
          </Button>
        </Tooltip>
        <Tooltip content="左侧" side="left">
          <Button variant="ghost" size="sm" shape="circle">
            <DownloadIcon />
          </Button>
        </Tooltip>
      </ComponentRow>
      <ComponentRow title="Long">
        <Tooltip content="生成完成后会按章节自动切片，包含元数据、封面与章节点信息。">
          <Button variant="secondary">长文本</Button>
        </Tooltip>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Tooltip content="不会显示" disabled>
          <Button variant="secondary">已禁用提示</Button>
        </Tooltip>
      </ComponentRow>
    </ComponentGroup>
  );
}
