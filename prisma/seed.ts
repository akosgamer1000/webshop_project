import {PrismaClient} from "@prisma/client"

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

  // Seed motherboard
  const motherboardProduct = await prisma.product.create({
    data: {
      name: "ASUS ROG Strix Z590-E",
      type: "MOTHERBOARD",
      price: 299.99,
      couantity: 10,
      Motherboard: {
        create: {
          cpuSocket: "LGA1200",
          chipset: "Z590",
          memoryType: "DDR4",
          processorSeller: "Intel",
          graphicCard: "Integrated",
          hdmi: true,
          sataConnectors: 6,
          pciConnectors: 3,
          usbPorts: 8,
          memorySockets: 4,
          integratedSound: true,
          bluetooth: true,
          wireless: true,
          sizeStandard: "ATX",
        },
      },
    },
  });

  // Seed CPU cooler
  const cpuCoolerProduct = await prisma.product.create({
    data: {
      name: "Noctua NH-D15",
      type: "CPUCOOLER",
      price: 89.99,
      couantity: 10,
      CPUCooler: {
        create: {
          fanSpeed: 1500,
          type: "Air",
          airflow: 82.52,
          frequency: 0,
        },
      },
    },
  });

  // Seed power supply
  const powerSupplyProduct = await prisma.product.create({
    data: {
      name: "Corsair RM750x",
      type: "POWERSUPPLY",
      price: 124.99,
      couantity: 10,
      PowerSupply: {
        create: {
          performance: 750,
          fourPinConnector: true,
          sixPinVGA: true,
          size: "Standard ATX",
        },
      },
    },
  });

  // Seed powerhouse
  const powerhouseProduct = await prisma.product.create({
    data: {
      name: "NZXT H510",
      type: "POWERHOUSE",
      price: 79.99,
      couantity: 10,
      Powerhouse: {
        create: {
          motherboardType: "ATX",
          fans: 2,
          size: "Mid Tower",
        },
      },
    },
  });


  console.log({
    user1,
    user2,
    processorProduct,
    memoryProduct,
    hardDriveProduct,
    videoCardProduct,
    motherboardProduct,
    cpuCoolerProduct,
    powerSupplyProduct,
    powerhouseProduct,
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
