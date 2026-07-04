function normaliseBasePath(basePath: string) {
  if (!basePath || basePath === "/") {
    return "";
  }

  const trimmedPath = basePath.replace(/\/+$/, "");

  if (!trimmedPath) {
    return "";
  }

  return trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
}

const configuredBasePath = normaliseBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "",
);

export function getBasePath() {
  return configuredBasePath;
}

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (
    !configuredBasePath ||
    path === configuredBasePath ||
    path.startsWith(`${configuredBasePath}/`)
  ) {
    return path;
  }

  return path === "/" ? configuredBasePath : `${configuredBasePath}${path}`;
}

export function stripBasePath(path: string) {
  if (!configuredBasePath) {
    return path;
  }

  if (path === configuredBasePath) {
    return "/";
  }

  if (path.startsWith(`${configuredBasePath}/`)) {
    return path.slice(configuredBasePath.length) || "/";
  }

  return path;
}
