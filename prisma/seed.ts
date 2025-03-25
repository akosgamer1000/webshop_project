import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "sesam street 1",
      role: "ADMIN",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securepassword",
      address: "sesam street 2",
      role: "USER",
    },
  });

  // Seed processor
  const processorProduct = await prisma.product.create({
    data: {
      name: "Intel Core i9",
      type: "PROCESSOR",
      price: 499.99,
      couantity: 10,
      imgSrc: "https://www.google.com/search?q=Intel+Core+i9&tbm=isch&ved=2ahUKEwjymqDPuPz-AhVbnf0HHZAkC9cQ2-cCegQIABAA&oq=Intel+Core+i9&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgoIABBHENYEELADOgoIABCKBRCwAxBDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJID",  // This is a placeholder link, replace with actual image URL
      Processor: {
        create: {
          coreNumber: 8,
          baseFrequency: 3.5,
          turboBoostFrequency: 5.3,
          cache: 16,
          architecture: "x86_64",
          processorSeller: "Intel",
          processorModel: "i9-11900K",
          integratedGraphicModel: "Intel UHD Graphics 750",
          processorTechnology: "14nm",
        },
      },
    },
  });

  // Seed memory
  const memoryProduct = await prisma.product.create({
    data: {
      name: "Corsair Vengeance",
      type: "MEMORY",
      price: 129.99,
      couantity: 10,
      imgSrc: "https://www.google.com/search?q=Corsair+Vengeance+memory+image&tbm=isch&ved=2ahUKEwiK9t6u-Pz-AhVqhv0HHd8pCXkQ2-cCegQIABAA&oq=Corsair+Vengeance+memory+image&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgoIABBHENYEELADOgoIABCKBRCwAxBDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJID",  // Placeholder link, replace with actual URL
      Memory: {
        create: {
          memoryCapacity: 16,
          memoryType: "DDR4",
          installedMemory: 16,
          frequency: 3200,
          supportedMemoryCapacity: 128,
        },
      },
    },
  });

  // Seed hard drive
  const hardDriveProduct = await prisma.product.create({
    data: {
      name: "Samsung 970 EVO Plus",
      type: "HARDDRIVE",
      price: 199.99,
      couantity: 10,
      imgSrc: "https://www.google.com/search?q=Samsung+970+EVO+Plus+SSD+image&tbm=isch&ved=2ahUKEwiR0sWq-Pz-AhVrPfcHHQ-iDrkQ2-cCegQIABAA&oq=Samsung+970+EVO+Plus+SSD+image&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgoIABBHENYEELADOgoIABCKBRCwAxBDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJID",  // Placeholder link, replace with actual URL
      HardDrive: {
        create: {
          capacity: 1,
          storageType: "SSD",
          connectionInterface: "NVMe",
          readingSpeed: 3500,
          writingSpeed: 3300,
          nandFlashType: "V-NAND",
          pciGeneration: 3,
        },
      },
    },
  });

  // Seed video card
  const videoCardProduct = await prisma.product.create({
    data: {
      name: "NVIDIA GeForce RTX 3080",
      type: "VIDEOCARD",
      price: 699.99,
      couantity: 10,
      imgSrc: "https://www.google.com/search?q=NVIDIA+GeForce+RTX+3080+image&tbm=isch&ved=2ahUKEwjvl6DquPz-AhX7gP0HHdOCAG4Q2-cCegQIABAA&oq=NVIDIA+GeForce+RTX+3080+image&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgoIABBHENYEELADOgoIABCKBRCwAxBDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJIDOgYIABAWEB46CAgAEIoFEJID",  // Placeholder link, replace with actual URL
      VideoCard: {
        create: {
          videoChipset: "GA102",
          producer: "NVIDIA",
          cpuSocket: "PCIe 4.0",
          coolingType: "Air",
          graphicChipSpeed: 1440,
          graphicMemorySpeed: 19000,
          memoryCapacity: 10,
          bandwidth: 760,
          suggestedPower: 320,
          displayPort: 3,
          size: "2-slot",
        },
      },
    },
  });

  // Add other products with similar structure...

  console.log({
    user1,
    user2,
    processorProduct,
    memoryProduct,
    hardDriveProduct,
    videoCardProduct,
    // Add other products...
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
