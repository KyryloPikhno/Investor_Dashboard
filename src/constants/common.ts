import { Investment } from "@prisma/client"

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
  "Project Name",
  "Token Class",
  "Shares Owned",
  "Market Value",
  "ROI %",
  "Next Distribution Date",
]

export const HEADER_KEY_MAP: { [label: string]: keyof Investment } = {
  "Project Name": "project_name",
  "Token Class": "token_class",
  "Shares Owned": "shares_owned",
  "Market Value": "market_value",
  "ROI %": "roi_percent",
  "Next Distribution Date": "next_distribution_date",
}

export const PUBLIC_PATHS = [PATH.LOGIN]

export const SORT = {
  ASC: "asc",
  DESC: "desc",
}
