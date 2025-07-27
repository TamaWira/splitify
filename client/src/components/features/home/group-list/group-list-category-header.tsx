import Link from "next/link";

type GroupListCategoryHeaderProps = {
  type: string;
  seeAllHref: string;
};

export function GroupListCategoryHeader({
  type,
  seeAllHref,
}: GroupListCategoryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-600/80 font-semibold">{type}</p>
      <Link className="text-primary-green underline" href={seeAllHref}>
        See All
      </Link>
    </div>
  );
}
