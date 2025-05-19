import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ investorId: string }> },
) {
  try {
    const { investorId } = await params

    const url = new URL(req.url)
    const roiMinRaw = url.searchParams.get("roiMin")
    const roiMin = roiMinRaw ? Number(roiMinRaw) : undefined

    const distributionDateRaw = url.searchParams.get("distributionDateMin")
    const distributionDateMin = distributionDateRaw ? new Date(distributionDateRaw) : undefined

    const sortByRaw = url.searchParams.get("sortBy")

    const sortBy = (
      [
        "project_name",
        "token_class",
        "shares_owned",
        "market_value",
        "roi_percent",
        "next_distribution_date",
      ] as string[]
    ).includes(sortByRaw || "")
      ? sortByRaw
      : undefined

    const sortDirectionRaw = url.searchParams.get("sortDirection")
    const sortDirection = sortDirectionRaw === "desc" ? "desc" : "asc"

    const whereFilter: any = { investor_id: investorId }

    if (roiMin !== undefined && !isNaN(roiMin)) {
      whereFilter.roi_percent = { gte: roiMin }
    }

    if (distributionDateMin && !isNaN(distributionDateMin.getTime())) {
      whereFilter.next_distribution_date = { gte: distributionDateMin }
    }

    const orderBy: any = {}
    if (sortBy) {
      orderBy[sortBy] = sortDirection
    }

    const investments = await prisma.investment.findMany({
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
      where: whereFilter,
    })

    const summary = await prisma.investorSummary.findUnique({
      where: { investor_id: investorId },
    })

    return NextResponse.json({ investments, summary })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
