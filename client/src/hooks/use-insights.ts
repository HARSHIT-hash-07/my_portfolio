import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useInsights() {
  return useQuery({
    queryKey: [api.insights.list.path],
    queryFn: async () => {
      const res = await fetch(api.insights.list.path);
      if (!res.ok) throw new Error("Failed to fetch insights");
      return api.insights.list.responses[200].parse(await res.json());
    },
  });
}

export function useInsight(slug: string) {
  return useQuery({
    queryKey: [api.insights.get.path, slug],
    queryFn: async () => {
      const res = await fetch(api.insights.get.path.replace(":slug", slug));
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch insight");
      return api.insights.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}
