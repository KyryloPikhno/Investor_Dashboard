import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ investorId: string }> },
) {
  try {
    const { investorId } = await params
    console.log("Investor ID:", investorId)

    const url = new URL(req.url)
    const roiMinRaw = url.searchParams.get("roiMin")
    const roiMin = roiMinRaw ? Number(roiMinRaw) : undefined
    console.log("roiMin:", roiMin, "raw:", roiMinRaw)

    const distributionDateRaw = url.searchParams.get("distributionDateMin")
    const distributionDateMin = distributionDateRaw ? new Date(distributionDateRaw) : undefined
    console.log("distributionDateMin:", distributionDateMin)

    const sortByRaw = url.searchParams.get("sortBy")
    console.log("sortByRaw:", sortByRaw)

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

    console.log("sortBy:", sortBy, "sortDirection:", sortDirection)

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

    console.log("whereFilter:", whereFilter)
    console.log("orderBy:", orderBy)

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

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 })

  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
  res.headers.set("Access-Control-Allow-Credentials", "true")

  return res
}
