import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import HomePage from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Preeminence International Montessori — Where curious minds shape the future" },
      { name: "description", content: "A warm, child-centred international Montessori school for Nursery through Primary. The Montessori method, Nigerian curriculum and joyful hands-on learning." },
      { property: "og:title", content: "Preeminence International Montessori" },
      { property: "og:description", content: "A warm, child-centred Montessori school for Nursery through Primary." },
    ],
  }),
  component: () => <Layout><HomePage /></Layout>,
});
