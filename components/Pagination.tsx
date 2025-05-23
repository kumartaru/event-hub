import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

export default function Pagination({
  page,
  hasNext,
  query,
}: {
  page: number;
  hasNext: boolean;
  query: ParsedUrlQuery;
}) {
  return (
    <div className="flex gap-4 pt-4">
      {page > 1 && (
        <Link
          href={`?${new URLSearchParams({
            ...query,
            page: String(page - 1),
          } as any)}`}
          className="underline"
        >
          Prev
        </Link>
      )}
      {hasNext && (
        <Link
          href={`?${new URLSearchParams({
            ...query,
            page: String(page + 1),
          } as any)}`}
          className="underline"
        >
          Next
        </Link>
      )}
    </div>
  );
}
