import { mockFilms } from "@/lib/mock-data/films";

export const dynamic = "force-static";

function createMockServiceWorkerScript() {
  return `
    const FILMS = ${JSON.stringify(mockFilms)};

    self.addEventListener("install", () => self.skipWaiting());

    self.addEventListener("activate", (event) => {
      event.waitUntil(self.clients.claim());
    });

    self.addEventListener("fetch", (event) => {
      const url = new URL(event.request.url);

      if (!url.pathname.startsWith("/api/")) {
        return;
      }

      event.respondWith(handleRequest(event.request, url));
    });

    async function handleRequest(request, url) {
      if (request.method === "GET" && url.pathname === "/api/films") {
        await wait(420);
        return jsonResponse(sortFilms(FILMS));
      }

      const filmMatch = url.pathname.match(/^\\/api\\/films\\/([^/]+)$/);

      if (request.method === "GET" && filmMatch) {
        await wait(520);
        const film = FILMS.find((entry) => entry.slug === filmMatch[1]);

        if (!film) {
          return jsonResponse({ message: "That launch could not be found." }, 404);
        }

        return jsonResponse(film);
      }

      if (
        request.method === "POST" &&
        (url.pathname === "/api/newsletter" || url.pathname === "/api/contact")
      ) {
        await wait(760);
        const payload = await request.json().catch(() => ({}));
        const email = String(payload.email || "").trim();

        if (!email || !/\\S+@\\S+\\.\\S+/.test(email)) {
          return jsonResponse(
            { message: "Enter a valid email address to join the bulletin." },
            422,
          );
        }

        if (email.includes("hold")) {
          return jsonResponse(
            { message: "The guest list is temporarily paused. Try again shortly." },
            503,
          );
        }

        return jsonResponse(
          {
            id: self.crypto && self.crypto.randomUUID
              ? self.crypto.randomUUID()
              : String(Date.now()),
            message:
              "You are on the bulletin for teaser drops, premiere dates, and opening-night notes.",
          },
          201,
        );
      }

      return fetch(request);
    }

    function sortFilms(films) {
      return [...films].sort((left, right) => {
        return new Date(left.premiereDate).getTime() - new Date(right.premiereDate).getTime();
      });
    }

    function jsonResponse(body, status = 200) {
      return new Response(JSON.stringify(body), {
        status,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      });
    }

    function wait(duration) {
      return new Promise((resolve) => setTimeout(resolve, duration));
    }
  `;
}

export async function GET() {
  return new Response(createMockServiceWorkerScript(), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/javascript; charset=utf-8",
    },
  });
}
