import { ComponentGroup } from "@/components/demo";
import Badge from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const chapters = [
  {
    name: "第一章 · 科学边界",
    sentences: 312,
    duration: "42:18",
    status: "done",
  },
  { name: "第二章 · 台球", sentences: 247, duration: "35:06", status: "done" },
  {
    name: "第三章 · 射手和农场主",
    sentences: 289,
    duration: "—",
    status: "generating",
  },
  {
    name: "第四章 · 三体、周文王、长夜",
    sentences: 399,
    duration: "—",
    status: "pending",
  },
] as const;

const statusBadge = {
  done: { variant: "success", label: "已完成" },
  generating: { variant: "info", label: "生成中" },
  pending: { variant: "secondary", label: "等待中" },
} as const;

export default function TableDemo() {
  return (
    <ComponentGroup title="Table">
      <Table>
        <TableCaption>最近一次导出任务的章节明细</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>章节</TableHead>
            <TableHead className="text-right">句子数</TableHead>
            <TableHead className="text-right">时长</TableHead>
            <TableHead className="text-right">状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter.name}>
              <TableCell className="font-medium text-content-100">
                {chapter.name}
              </TableCell>
              <TableCell className="text-right font-mono">
                {chapter.sentences}
              </TableCell>
              <TableCell className="text-right font-mono">
                {chapter.duration}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={statusBadge[chapter.status].variant} size="sm">
                  {statusBadge[chapter.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>共 4 章</TableCell>
            <TableCell className="text-right font-mono">1,247</TableCell>
            <TableCell className="text-right font-mono">77:24</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </ComponentGroup>
  );
}
