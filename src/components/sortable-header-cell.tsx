import { TriangleIcon } from "@/components/icons/triangle-icon"
import { ColumnType, SORT } from "@/constants/common"
import { SortableHeaderCellProps } from "@/types/common"
import { twMerge } from "tailwind-merge"

export default function SortableHeaderCell({
  header,
  dataKey,
  filters,
  toggleSort,
}: SortableHeaderCellProps) {
  const isSortable =
    dataKey === ColumnType.RoiPercent || dataKey === ColumnType.NextDistributionDate
  const isActiveSort = filters.sortBy === dataKey

  return (
    <th
      className={twMerge(
        "border border-gray-300 px-4 py-2",
        isSortable && "cursor-pointer select-none",
      )}
      onClick={() => isSortable && toggleSort(dataKey as ColumnType)}
    >
      {header}
      {isActiveSort && (
        <span className="ml-1">
          {filters.sortDirection === SORT.ASC ? (
            <TriangleIcon className="rotate-180" />
          ) : (
            <TriangleIcon />
          )}
        </span>
      )}
    </th>
  )
}
