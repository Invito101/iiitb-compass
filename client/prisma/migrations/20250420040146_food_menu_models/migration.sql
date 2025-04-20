-- CreateTable
CREATE TABLE "FoodMenuItems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dietType" TEXT[],

    CONSTRAINT "FoodMenuItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItemRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL,
    "imageUrl" TEXT,
    "foodMenuEntryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodMenuCycle" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "weekNumber" INTEGER NOT NULL,

    CONSTRAINT "FoodMenuCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodMenuEntries" (
    "id" TEXT NOT NULL,
    "foodMenuCycleId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodMenuEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodItemRating" ADD CONSTRAINT "FoodItemRating_foodMenuEntryId_fkey" FOREIGN KEY ("foodMenuEntryId") REFERENCES "FoodMenuEntries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItemRating" ADD CONSTRAINT "FoodItemRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMenuEntries" ADD CONSTRAINT "FoodMenuEntries_foodMenuCycleId_fkey" FOREIGN KEY ("foodMenuCycleId") REFERENCES "FoodMenuCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMenuEntries" ADD CONSTRAINT "FoodMenuEntries_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodMenuItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
