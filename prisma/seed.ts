import { INVESTOR_ID } from "@/constants/common"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.investorSummary.deleteMany()
  await prisma.investment.deleteMany()

  await prisma.investorSummary.create({
    data: {
      investor_id: INVESTOR_ID,
      total_invested_amount: 150000,
      portfolio_value: 175000,
      distributions_received: 12000,
      outstanding_commitments: 5000,
    },
  })

  // Generate 15 investments dynamically
  const investments = Array.from({ length: 15 }, (_, i) => ({
    id: `inv-${String(i + 1).padStart(3, "0")}`,
    investor_id: INVESTOR_ID,
    project_name: `Project ${i + 1}`,
    token_class: i % 2 === 0 ? "Class A" : "Preferred",
    shares_owned: 100 + i * 5,
    market_value: 20000 + i * 1000,
    roi_percent: 5 + i * 0.3,
    next_distribution_date: new Date(2024, 5, 15 + i),
  }))

  await prisma.investment.createMany({
    data: investments,
  })

  console.log("Seed finished")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
