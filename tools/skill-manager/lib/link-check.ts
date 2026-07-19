export type LinkProblem = {
  path: string;
  url: string;
  reason: string;
  /** Dead links block publishing; unreachable ones only warn. */
  blocking: boolean;
};

export type LinkFetcher = (url: string) => Promise<{ ok: boolean; status: number }>;

/**
 * Domains the CI link check never resolves, so neither do we: example.com is
 * reserved for documentation and loopback addresses only exist on this Mac.
 */
const SKIPPED_HOSTS = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|(.*\.)?example\.(com|org|net))$/;
const URL_PATTERN = /https?:\/\/[^\s)>"'`\]]+/g;

/** Collects every URL a link checker would see, frontmatter and prose alike. */
export function extractLinks(source: string): string[] {
  const found = source.match(URL_PATTERN) ?? [];
  const urls = new Set<string>();
  for (const raw of found) {
    // Trailing punctuation belongs to the sentence, not to the address.
    const url = raw.replace(/[.,:;!?'"]+$/, "");
    let host: string;
    try {
      host = new URL(url).hostname;
    } catch {
      continue;
    }
    if (SKIPPED_HOSTS.test(host)) continue;
    if (url.includes("$")) continue; // shell placeholders such as :$port
    urls.add(url);
  }
  return [...urls].sort();
}

const defaultFetcher: LinkFetcher = async (url) => {
  const attempt = async (method: "HEAD" | "GET") => {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    return { ok: response.ok, status: response.status };
  };
  const head = await attempt("HEAD");
  // Some hosts answer HEAD with 403/405 while serving GET normally.
  return head.ok || (head.status !== 403 && head.status !== 405)
    ? head
    : attempt("GET");
};

/** Checks every link in the given files, one file's worth at a time. */
export async function checkLinks(
  files: { path: string; source: string }[],
  fetcher: LinkFetcher = defaultFetcher,
): Promise<LinkProblem[]> {
  const problems: LinkProblem[] = [];
  for (const file of files) {
    const results = await Promise.all(
      extractLinks(file.source).map(async (url): Promise<LinkProblem | undefined> => {
        try {
          const { ok, status } = await fetcher(url);
          if (ok) return undefined;
          return {
            path: file.path,
            url,
            reason: `打不开（HTTP ${status}）`,
            blocking: true,
          };
        } catch (error) {
          // A flaky network is not evidence that the address is wrong.
          const timedOut = error instanceof Error && error.name === "TimeoutError";
          return {
            path: file.path,
            url,
            reason: timedOut ? "检查超时，没能确认" : "暂时无法访问，没能确认",
            blocking: false,
          };
        }
      }),
    );
    problems.push(...results.filter((result): result is LinkProblem => Boolean(result)));
  }
  return problems;
}
