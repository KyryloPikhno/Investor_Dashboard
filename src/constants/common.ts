export enum ColumnType {
  RoiPercent = "roi_percent",
  NextDistributionDate = "next_distribution_date",
}

export const TOKEN_KEY = "token"

export const PATH = {
  INVESTMENTS: "/api/investments",
  LOGIN: "/login",
}

export const INVESTOR_ID = "1234-5678"

export const INVESTOR_ID_QUERY_PARAM = "investor-id"

export const TABLE_HEADERS = [
  { label: "Project Name", key: "project_name" },
  { label: "Token Class", key: "token_class" },
  { label: "Shares Owned", key: "shares_owned" },
  { label: "Market Value", key: "market_value" },
  { label: "ROI %", key: "roi_percent" },
  { label: "Next Distribution Date", key: "next_distribution_date" },
] as const

export const PUBLIC_PATHS = [PATH.LOGIN]

export const SORT = {
  ASC: "asc",
  DESC: "desc",
}

export const FILTER_INITIAL_STATE = {
  sortDirection: SORT.ASC,
  roiMin: "",
  sortBy: "",
}
