-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "investor_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "token_class" TEXT NOT NULL,
    "shares_owned" INTEGER NOT NULL,
    "market_value" DOUBLE PRECISION NOT NULL,
    "roi_percent" DOUBLE PRECISION NOT NULL,
    "next_distribution_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorSummary" (
    "investor_id" TEXT NOT NULL,
    "total_invested_amount" DOUBLE PRECISION NOT NULL,
    "portfolio_value" DOUBLE PRECISION NOT NULL,
    "distributions_received" DOUBLE PRECISION NOT NULL,
    "outstanding_commitments" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvestorSummary_pkey" PRIMARY KEY ("investor_id")
);
