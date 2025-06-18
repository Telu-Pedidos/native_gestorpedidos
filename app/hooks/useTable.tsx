import { useMemo, useState } from "react";

type UseTableProps<T> = {
  data: T[];
  pageSize?: number;
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
};

export function useTable<T>({
  data,
  pageSize = 5,
  sortKey,
  sortDirection = "asc",
}: UseTableProps<T>) {
  const [page, setPage] = useState(0);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return {
    rows: paginatedData,
    page,
    setPage,
    totalPages,
  };
}
