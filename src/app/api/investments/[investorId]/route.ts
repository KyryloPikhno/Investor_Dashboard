import { NextRequest, NextResponse } from "next/server"

import { ColumnType, SORT } from "@/constants/common"
import prisma from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { investorId: string } },
): Promise<NextResponse> {
  try {
    const { investorId } = await params

    const url = new URL(req.url)

    const roiMin = url.searchParams.get("roiMin")
      ? Number(url.searchParams.get("roiMin"))
      : undefined

    const distributionDateMin = url.searchParams.get("distributionDateMin")
      ? new Date(url.searchParams.get("distributionDateMin")!)
      : undefined

    const sortBy = url.searchParams.get("sortBy") as ColumnType | undefined
    const sortDirection = url.searchParams.get("sortDirection") === SORT.DESC ? SORT.DESC : SORT.ASC

    const whereFilter: any = { investor_id: investorId }

    if (roiMin !== undefined && !isNaN(roiMin)) {
      whereFilter.roi_percent = { gte: roiMin }
    }

    if (distributionDateMin) {
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

    const res = NextResponse.json({ investments, summary })

    res.headers.set(
      "Access-Control-Allow-Origin",
      "https://investor-dashboard-7ly2nku5l-kyrylopikhnos-projects.vercel.app",
    )
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
