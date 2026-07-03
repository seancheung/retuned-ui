import { SAMPLE, SectionHeader } from "@/components/demo";

const typeRows = [
  {
    label: "Display",
    spec: "text-3xl",
    className: "text-3xl",
  },
  {
    label: "H1",
    spec: "text-2xl",
    className: "text-2xl",
  },
  {
    label: "H2",
    spec: "text-xl",
    className: "text-xl",
  },
  {
    label: "H3",
    spec: "text-lg",
    className: "text-lg",
  },
  {
    label: "Body",
    spec: "text-base",
    className: "text-base text-content-200",
  },
  {
    label: "Label",
    spec: "text-sm",
    className: "text-sm tracking-wider text-content-200",
  },
  {
    label: "Caption",
    spec: "text-xs",
    className: "text-xs text-content-300",
  },
  {
    label: "Tiny",
    spec: "text-tiny",
    className: "text-tiny text-content-300",
  },
];

export default function TypographySection() {
  return (
    <section>
      <SectionHeader number="01" title="字体排版" />
      <div className="flex flex-col">
        {typeRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[140px_1fr] items-center gap-6 border-content-400/30 border-b border-dashed py-5 last:border-b-0"
          >
            <div className="pt-2 font-mono text-content-300 text-xs">
              <strong className="mb-1 block font-medium text-content-200 uppercase tracking-wider">
                {row.label}
              </strong>
              {row.spec}
            </div>
            <div className={row.className}>{SAMPLE}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
