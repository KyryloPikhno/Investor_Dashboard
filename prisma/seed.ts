import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.investorSummary.create({
    data: {
      investor_id: "1234-5678",
      total_invested_amount: 150000,
      portfolio_value: 175000,
      distributions_received: 12000,
      outstanding_commitments: 5000,
    },
  })

  await prisma.investment.createMany({
    data: [
      {
        id: "inv-001",
        investor_id: "1234-5678",
        project_name: "Greenfield Residential Fund",
        token_class: "Class A",
        shares_owned: 200,
        market_value: 22000,
        roi_percent: 8.4,
        next_distribution_date: new Date("2024-06-15"),
      },
      {
        id: "inv-002",
        investor_id: "1234-5678",
        project_name: "Commercial Office REIT",
        token_class: "Preferred",
        shares_owned: 150,
        market_value: 18000,
        roi_percent: 7.2,
        next_distribution_date: new Date("2024-07-01"),
      },
    ],
  })

  console.log("Seed finished")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
