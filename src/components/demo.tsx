export const SAMPLE = "开始你的第一本有声书 · Start your first audiobook";

export const voiceOptions = [
  { value: "alloy", label: "Alloy · 中性" },
  { value: "echo", label: "Echo · 男声" },
  { value: "fable", label: "Fable · 英式男声" },
  { value: "onyx", label: "Onyx · 低沉男声" },
  { value: "nova", label: "Nova · 女声" },
  { value: "shimmer", label: "Shimmer · 柔和女声" },
];

export function SectionHeader({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-6 border-base-400 border-b pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-primary-500 text-xs">{number}</span>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <p className="max-w-sm text-right text-content-300 text-xs">{desc}</p>
    </div>
  );
}

export function ComponentGroup({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const isNamed = typeof title === "string";
  const id = isNamed
    ? `demo-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;
  return (
    <div
      id={id}
      data-demo-group={isNamed ? title : undefined}
      className="scroll-mt-6 rounded-lg border border-base-400 bg-base-100 p-6"
    >
      <div className="mb-5 flex items-center gap-2 font-semibold text-content-300 text-sm uppercase tracking-wider">
        <span className="h-1 w-1 rounded-full bg-primary-500" />
        {title}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function ComponentRow({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-20 font-mono text-content-300 text-xs uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  );
}
