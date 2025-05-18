import { twMerge } from "tailwind-merge"

import { TriangleIcon } from "@/components/icons/triangle-icon"
import { ColumnType, SORT } from "@/constants/common"
import { SortableHeaderCellProps } from "@/types/common"

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
        "border border-b-0 px-4 py-2 relative",
        isSortable && "cursor-pointer select-none",
        isActiveSort && "bg-gray-200",
      )}
      onClick={() => isSortable && toggleSort(dataKey as ColumnType)}
    >
      {header}

      {isActiveSort && (
        <div className="ml-1 absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2">
          {filters.sortDirection === SORT.ASC ? (
            <TriangleIcon className="rotate-180" />
          ) : (
            <TriangleIcon />
          )}
        </div>
      )}
    </th>
  )
}
