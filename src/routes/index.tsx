import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import HomePage from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northbridge International Academy — Where curious minds shape the future" },
      { name: "description", content: "Premier international secondary school for grades 6–12. IB, IGCSE & AP curricula, world-class STEM, arts and athletics." },
      { property: "og:title", content: "Northbridge International Academy" },
      { property: "og:description", content: "A premier international secondary school for grades 6–12." },
    ],
  }),
  component: () => <Layout><HomePage /></Layout>,
});
