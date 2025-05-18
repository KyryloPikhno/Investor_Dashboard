import { ColumnType, SORT } from "@/constants/common"

export const getSortDirectionLabel = (column: string, direction: string) => {
  if (column === ColumnType.RoiPercent) {
    return direction === SORT.ASC ? "Lowest ROI first" : "Highest ROI first"
  }
  if (column === ColumnType.NextDistributionDate) {
    return direction === SORT.ASC ? "Earliest date first" : "Latest date first"
  }
  return direction === SORT.ASC ? "Ascending" : "Descending"
}
