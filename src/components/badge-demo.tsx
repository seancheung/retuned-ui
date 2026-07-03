import { ComponentGroup, ComponentRow } from "@/components/demo";
import Badge from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <ComponentGroup title="Badge">
      <ComponentRow title="Variant">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </ComponentRow>
      <ComponentRow title="Rounded">
        <Badge variant="primary" rounded>
          Primary
        </Badge>
        <Badge variant="secondary" rounded>
          Secondary
        </Badge>
        <Badge variant="success" rounded>
          Success
        </Badge>
        <Badge variant="info" rounded>
          Info
        </Badge>
        <Badge variant="warning" rounded>
          Warning
        </Badge>
        <Badge variant="error" rounded>
          Error
        </Badge>
      </ComponentRow>
      <ComponentRow title="Bordered">
        <Badge variant="primary" bordered>
          Primary
        </Badge>
        <Badge variant="secondary" bordered>
          Secondary
        </Badge>
        <Badge variant="success" bordered>
          Success
        </Badge>
        <Badge variant="info" bordered>
          Info
        </Badge>
        <Badge variant="warning" bordered>
          Warning
        </Badge>
        <Badge variant="error" bordered>
          Error
        </Badge>
      </ComponentRow>
      <ComponentRow title="Opaque">
        <Badge variant="primary" opaque>
          Primary
        </Badge>
        <Badge variant="secondary" opaque>
          Secondary
        </Badge>
        <Badge variant="success" opaque>
          Success
        </Badge>
        <Badge variant="info" opaque>
          Info
        </Badge>
        <Badge variant="warning" opaque>
          Warning
        </Badge>
        <Badge variant="error" opaque>
          Error
        </Badge>
      </ComponentRow>
      <ComponentRow title="Small">
        <Badge variant="primary" size="sm">
          Primary
        </Badge>
        <Badge variant="secondary" size="sm">
          Secondary
        </Badge>
        <Badge variant="success" size="sm">
          Success
        </Badge>
        <Badge variant="info" size="sm">
          Info
        </Badge>
        <Badge variant="warning" size="sm">
          Warning
        </Badge>
        <Badge variant="error" size="sm">
          Error
        </Badge>
      </ComponentRow>
    </ComponentGroup>
  );
}
