import { ComponentGroup, ComponentRow } from "@/components/demo";
import Progress from "@/components/ui/progress";

export default function ProgressDemo() {
  return (
    <ComponentGroup title="Progress">
      <ComponentRow title="Default">
        <Progress value={67} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Success">
        <Progress variant="success" value={100} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Info">
        <Progress variant="info" value={20} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Error">
        <Progress variant="error" value={40} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Small">
        <Progress size="sm" value={50} className="flex-1" />
      </ComponentRow>
      <ComponentRow title="Circular">
        <Progress shape="circular" value={67} />
        <Progress shape="circular" variant="success" value={100} />
        <Progress
          shape="circular"
          variant="info"
          className="animate-spin"
          value={20}
        />
        <Progress shape="circular" variant="error" value={40} />
        <Progress shape="circular" size="sm" value={45} />
      </ComponentRow>
    </ComponentGroup>
  );
}
