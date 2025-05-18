export enum ColumnType {
  RoiPercent = "roi_percent",
  NextDistributionDate = "next_distribution_date",
}

export enum ButtonVariant {
  Solid = "solid",
  Outline = "outline",
}

export const TOKEN_KEY = "token"

export const PATH = {
  INVESTMENTS: "/api/investments",
  LOGIN: "/login",
}

export const INVESTOR_ID = "1234-5678"

export const INVESTOR_ID_QUERY_PARAM = "investor-id"

export const TABLE_HEADERS = [
  { key: "project_name", label: "Project Name" },
  { key: "token_class", label: "Token Class" },
  { key: "shares_owned", label: "Shares Owned" },
  { key: "market_value", label: "Market Value" },
  { key: "roi_percent", label: "ROI %" },
  { key: "next_distribution_date", label: "Next Distribution Date" },
] as const

export const PUBLIC_PATHS = [PATH.LOGIN]

export const SORT = {
  ASC: "asc",
  DESC: "desc",
}

export const FILTER_INITIAL_STATE = {
  roiMin: "",
  sortBy: "",
  sortDirection: SORT.ASC,
}

export const ROW_COUNT = 15

export const COLUMN_COUNT = 6

export const tdClassName = "border border-black p-2 h-12 w-28"
