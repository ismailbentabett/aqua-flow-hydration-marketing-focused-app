import { ReadonlyURLSearchParams } from "next/navigation";

export function createFilterQueryString(
  searchParams: ReadonlyURLSearchParams,
  params: Record<string, string | string[]>
): string {
  const newSearchParams = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    newSearchParams.delete(key);
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) newSearchParams.append(key, v);
      });
    } else if (value) {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams.toString();
}
