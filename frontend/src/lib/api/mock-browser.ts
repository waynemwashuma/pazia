const MOCK_SERVICE_WORKER_PATH = "/mock-service-worker.js?v=1";

let serviceWorkerReadyPromise: Promise<void> | null = null;

export function shouldUseMockApi() {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === "true") {
    return true;
  }

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === "false") {
    return false;
  }

  return !process.env.NEXT_PUBLIC_API_URL?.trim();
}

export async function ensureMockServiceWorkerReady() {
  if (typeof window === "undefined" || !shouldUseMockApi()) {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not available in this browser.");
  }

  serviceWorkerReadyPromise ??= registerMockServiceWorker();
  return serviceWorkerReadyPromise;
}

async function registerMockServiceWorker() {
  await navigator.serviceWorker.register(MOCK_SERVICE_WORKER_PATH);
  await navigator.serviceWorker.ready;

  if (navigator.serviceWorker.controller) {
    return;
  }

  await new Promise<void>((resolve) => {
    const handleControllerChange = () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
      resolve();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    window.setTimeout(() => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
      resolve();
    }, 1500);
  });
}
