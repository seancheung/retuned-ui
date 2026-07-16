import {
  BookOpenIcon,
  MicIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Accordion from "@/components/ui/accordion";
import Button from "@/components/ui/button";

const chapters = [
  { value: "intro", title: "章节简介", content: SAMPLE },
  { value: "voice", title: "声音设置", content: SAMPLE },
  { value: "export", title: "导出选项", content: SAMPLE },
];

export default function AccordionDemo() {
  return (
    <ComponentGroup title="Accordion">
      <ComponentRow title="Default">
        <Accordion items={chapters} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Open">
        <Accordion items={chapters} defaultValue="voice" className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Multiple">
        <Accordion
          items={chapters}
          multiple
          defaultValue={["intro", "export"]}
          className="flex-1"
        />
      </ComponentRow>
      <ComponentRow title="Bordered">
        <Accordion items={chapters} bordered className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Custom title">
        <Accordion
          items={[
            {
              value: "intro",
              title: (
                <div className="flex flex-1 shrink-0 items-center gap-2">
                  <BookOpenIcon className="size-3.5 text-content-400" />
                  <span className="flex-1 truncate">章节简介</span>
                </div>
              ),
              content: SAMPLE,
            },
            {
              value: "voice",
              title: (
                <div className="flex flex-1 shrink-0 items-center gap-2">
                  <MicIcon className="size-3.5 text-content-400" />
                  <span className="flex-1 truncate">声音设置</span>
                </div>
              ),
              content: SAMPLE,
            },
            {
              value: "export",
              title: (
                <div className="flex flex-1 shrink-0 items-center gap-2">
                  <SlidersHorizontalIcon className="size-3.5 text-content-400" />
                  <span className="flex-1 truncate">导出选项</span>
                </div>
              ),
              content: SAMPLE,
            },
          ]}
          className="flex-1"
        />
      </ComponentRow>
      <ComponentRow title="Custom chevron">
        <Accordion
          items={chapters}
          bordered
          className="flex-1"
          chevron={(_open, item) => (
            <div className="flex shrink-0 items-center gap-1 pr-3">
              <Button
                variant="ghost"
                shape="square"
                size="sm"
                aria-label={`删除${item.value}`}
              >
                <Trash2Icon />
              </Button>
            </div>
          )}
        />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Accordion
          items={[chapters[0], { ...chapters[1], disabled: true }, chapters[2]]}
          className="flex-1"
        />
      </ComponentRow>
    </ComponentGroup>
  );
}
