import { LockIcon } from "lucide-react";
import { ComponentGroup, ComponentRow } from "@/components/demo";
import InputPassword from "@/components/ui/input-password";

export default function InputPasswordDemo() {
  return (
    <ComponentGroup title="Input Password">
      <ComponentRow title="Default">
        <InputPassword defaultValue="12345" />
      </ComponentRow>
      <ComponentRow title="Icon">
        <InputPassword defaultValue="12345" icon={<LockIcon />} />
      </ComponentRow>
      <ComponentRow title="Error">
        <InputPassword defaultValue="12345" error />
      </ComponentRow>
      <ComponentRow title="Disabled">
        <InputPassword defaultValue="12345" disabled />
      </ComponentRow>
    </ComponentGroup>
  );
}
