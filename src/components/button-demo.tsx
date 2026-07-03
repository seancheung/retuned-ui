import { HomeIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import Button from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <ComponentGroup title="Button">
      <ComponentRow title="Variant">
        <Button>
          <PlusIcon />
          Primary
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </ComponentRow>
      <ComponentRow title="Size">
        <Button variant="primary" size="lg">
          <PlusIcon />
          Large
        </Button>
        <Button variant="secondary" size="md">
          Medium
        </Button>
        <Button variant="danger" size="sm">
          Small
        </Button>
      </ComponentRow>
      <ComponentRow title="Shape">
        <Button shape="normal">
          <PlusIcon />
          Button
        </Button>
        <Button shape="square">
          <PlusIcon />
        </Button>
        <Button shape="circle">
          <PlusIcon />
        </Button>
      </ComponentRow>
      <ComponentRow title="Disabled">
        <Button variant="primary" disabled>
          <PlusIcon />
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="danger" disabled>
          Disabled
        </Button>
        <Button variant="ghost" disabled>
          <HomeIcon />
        </Button>
      </ComponentRow>
      <ComponentRow title="Loading">
        <Button variant="primary" disabled>
          <Loader2Icon className="animate-spin" />
          Loading
        </Button>
        <Button variant="secondary" disabled>
          <Loader2Icon className="animate-spin" />
          Loading
        </Button>
      </ComponentRow>
    </ComponentGroup>
  );
}
