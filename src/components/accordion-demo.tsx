import { BookOpenIcon, MicIcon, SlidersHorizontalIcon } from "lucide-react";
import { ComponentGroup, ComponentRow, SAMPLE } from "@/components/demo";
import Accordion from "@/components/ui/accordion";

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
      <ComponentRow title="Icon">
        <Accordion
          items={[
            {
              value: "intro",
              title: "章节简介",
              content: SAMPLE,
              icon: <BookOpenIcon />,
            },
            {
              value: "voice",
              title: "声音设置",
              content: SAMPLE,
              icon: <MicIcon />,
            },
            {
              value: "export",
              title: "导出选项",
              content: SAMPLE,
              icon: <SlidersHorizontalIcon />,
            },
          ]}
          className="flex-1"
        />
      </ComponentRow>
      <ComponentRow title="Bordered">
        <Accordion items={chapters} bordered className="flex-1" />
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
