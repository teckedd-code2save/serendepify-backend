CREATE TABLE "CapabilityPackage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "manifest" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CapabilityPackage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CapabilityPackage_slug_version_key"
ON "CapabilityPackage"("slug", "version");

CREATE INDEX "CapabilityPackage_slug_idx"
ON "CapabilityPackage"("slug");
