const { PrismaClient } = require('@prisma/client');
const productsData     = require('./products-data');

const prisma = new PrismaClient();

async function main() {
  // Delete any existing rows in the table
  await prisma.product.deleteMany({});

  // Insert all items from data file into table
  for (const p of productsData) {
    await prisma.product.create({
      data: {
        title:       p.title,
        images:      p.images,
        price:       p.price,
        category:    p.category,
        description: p.description,
        details:     p.details,
      },
    });
  }

  console.log(`Seeded ${productsData.length} products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
