import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { caseStudies, experience, profile, repositories, stackGroups } from "@/data/portfolio";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("contains updated GitHub-backed portfolio data without excluded projects or taglines", () => {
    const serialized = JSON.stringify({
      profile,
      caseStudies,
      experience,
      repositories,
      stackGroups,
    }).toLowerCase();

    expect(serialized).not.toContain("women in tech");
    expect(serialized).not.toContain("woman in tech");
    expect(serialized).not.toContain("nextjs-ai-chatbot");
    expect(serialized).not.toContain("modi-to-devanagari-scribe");
    expect(caseStudies).toHaveLength(3);
    expect(repositories).toHaveLength(2);
    expect(experience[0]?.company).toBe("CrelioHealth");
  });
});
