-- CreateTable
CREATE TABLE "BlackList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,

    CONSTRAINT "BlackList_pkey" PRIMARY KEY ("id")
);
