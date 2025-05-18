import { PrismaClient } from "@prisma/client"

import { INVESTOR_ID } from "@/constants/common"
const prisma = new PrismaClient()

async function main() {
  await prisma.investorSummary.deleteMany()
  await prisma.investment.deleteMany()

  await prisma.investorSummary.create({
    data: {
      distributions_received: 12000,
      investor_id: INVESTOR_ID,
      outstanding_commitments: 5000,
      portfolio_value: 175000,
      total_invested_amount: 150000,
    },
  })

  // Generate 15 investments dynamically
  const investments = Array.from({ length: 15 }, (_, i) => ({
    id: `inv-${String(i + 1).padStart(3, "0")}`,
    investor_id: INVESTOR_ID,
    market_value: 20000 + i * 1000,
    next_distribution_date: new Date(2024, 5, 15 + i),
    project_name: `Project ${i + 1}`,
    roi_percent: 5 + i * 0.3,
    shares_owned: 100 + i * 5,
    token_class: i % 2 === 0 ? "Class A" : "Preferred",
  }))

  await prisma.investment.createMany({
    data: investments,
  })

  console.log("Seed finished")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
