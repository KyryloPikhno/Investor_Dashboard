import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { investorId: string } }) {
  try {
    const { investorId } = params

    const summary = await prisma.investorSummary.findUnique({
      where: { investor_id: investorId },
    })

    const investments = await prisma.investment.findMany({
      where: { investor_id: investorId },
    })

    return NextResponse.json({ summary, investments })
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
