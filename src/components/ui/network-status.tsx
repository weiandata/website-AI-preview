"use client";

import { WifiOff } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/language/language-provider";

function subscribeToNetworkStatus(onStoreChange: () => void): () => void {
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);
  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
}

function getNetworkStatus(): boolean {
  return window.navigator.onLine;
}

export function NetworkStatus() {
  const { locale } = useLanguage();
  const isOnline = useSyncExternalStore(
    subscribeToNetworkStatus,
    getNetworkStatus,
    () => true,
  );

  if (isOnline) return null;

  return (
    <div className="network-status liquid-glass" role="status" aria-live="polite">
      <WifiOff aria-hidden="true" size={17} strokeWidth={1.8} />
      <span>
        {locale === "zh"
          ? "当前处于离线状态，部分外部下载暂不可用。"
          : "You are offline. Some external downloads may be unavailable."}
      </span>
    </div>
  );
}
