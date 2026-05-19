import type { Metadata } from "next";
import BlogWorkspace from "@/components/blogs/BlogWorkspace";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Writing about full-stack engineering, AI products, frontend systems, and shipping polished digital experiences.",
};

export default function BlogsPage() {
  return <BlogWorkspace />;
}
