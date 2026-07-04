"use client";

import { useEffect } from "react";
import {
  ensureMockServiceWorkerReady,
  shouldUseMockApi,
} from "@/lib/api/mock-browser";

export function MockServiceWorkerBoot() {
  useEffect(() => {
    if (!shouldUseMockApi()) {
      return;
    }

    void ensureMockServiceWorkerReady();
  }, []);

  return null;
}
