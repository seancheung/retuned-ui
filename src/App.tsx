import ColorSection from "@/components/color-section";
import ComponentsSection from "@/components/components-section";
import TypographySection from "@/components/typography-section";

export default function App() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12">
      <TypographySection />
      <ColorSection />
      <ComponentsSection />
    </div>
  );
}
