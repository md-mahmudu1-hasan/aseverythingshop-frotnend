"use client";

import AlertHost from "@/components/ui/AlertHost";
import ProvidersRoot from "@/authentication/Providers/Providers";

export default function Providers({ children }) {
  return (
    <ProvidersRoot>
      {children}
      <AlertHost />
    </ProvidersRoot>
  );
}
