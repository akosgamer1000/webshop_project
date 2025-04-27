import { PrismaClient } from "@prisma/client";
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: await argon2.hash("securepassword"),
      address: "sesam street 1",
      role: "ADMIN",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: await argon2.hash("Verysecurepassword"),
      address: "sesam street 2",
      role: "USER",
    },
  });

  // Seed processor
  const processorProduct = await prisma.product.create({
    data: {
        name: "Intel Core i9",
        manufacturer: "Intel",
        type: "PROCESSOR",
        price: 499.99,
        quantity: 10,
        imgSrc: "intel_core_i9.png",
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
const processorProduct1 = await prisma.product.create({
    data: {
        name: "Intel Core i7-11700K",
        manufacturer: "Intel",
        type: "PROCESSOR",
        price: 399.99,
        quantity: 10,
        imgSrc: "intel_core_i7.jpg",
        Processor: {
          create: {
            coreNumber: 8,
            baseFrequency: 3.6,
            turboBoostFrequency: 5.0,
            cache: 16,
            architecture: "x86_64",
            processorSeller: "Intel",
            processorModel: "i7-11700K",
            integratedGraphicModel: "Intel UHD Graphics 750",
            processorTechnology: "14nm",
          },
        },
      },
});
const processorProduct2 = await prisma.product.create({
    data:  {
        name: "AMD Ryzen 9 5900X",
        manufacturer: "AMD",
        type: "PROCESSOR",
        price: 549.99,
        quantity: 10,
        imgSrc: "AMD Ryzen 9 5900X.jpg",
        Processor: {
          create: {
            coreNumber: 12,
            baseFrequency: 3.7,
            turboBoostFrequency: 4.8,
            cache: 64,
            architecture: "x86_64",
            processorSeller: "AMD",
            processorModel: "Ryzen 9 5900X",
            integratedGraphicModel: "None",
            processorTechnology: "7nm",
          },
        },
      },
});
const processorProduct3 = await prisma.product.create({
    data:  {
        name: "AMD Ryzen 7 5800X",
        manufacturer: "AMD",
        type: "PROCESSOR",
        price: 449.99,
        quantity: 10,
        imgSrc: "AMD Ryzen 7 5800X.webp",
        Processor: {
          create: {
            coreNumber: 8,
            baseFrequency: 3.8,
            turboBoostFrequency: 4.7,
            cache: 32,
            architecture: "x86_64",
            processorSeller: "AMD",
            processorModel: "Ryzen 7 5800X",
            integratedGraphicModel: "None",
            processorTechnology: "7nm",
          },
        },
      },
});

const memoryProduct = await prisma.product.create({
    data: {
        name: "Corsair Vengeance",
        manufacturer: "Corsair",
        type: "MEMORY",
        price: 129.99,
        quantity: 10,
        imgSrc: "Corsair Vengeance.jpg",
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

const hardDriveProduct = await prisma.product.create({
    data: {
        name: "Samsung 970 EVO Plus",
        manufacturer: "Samsung",
        type: "HARDDRIVE",
        price: 199.99,
        quantity: 10,
        imgSrc: "Samsung 970 EVO Plus.jpg",
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

const videoCardProduct = await prisma.product.create({
    data: {
        name: "NVIDIA GeForce RTX 3080",
        manufacturer: "NVIDIA",
        type: "VIDEOCARD",
        price: 699.99,
        quantity: 10,
        imgSrc: "NVIDIA GeForce RTX 3080.jpg",
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

const motherboardProduct = await prisma.product.create({
    data: {
        name: "ASUS ROG Strix Z590-E",
        manufacturer: "ASUS",
        type: "MOTHERBOARD",
        price: 299.99,
        quantity: 10,
        imgSrc: "ASUS ROG Strix Z590-E.jpg",
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

const cpuCoolerProduct = await prisma.product.create({
    data: {
        name: "Noctua NH-D15",
        manufacturer: "Noctua",
        type: "CPUCOOLER",
        price: 89.99,
        quantity: 10,
        imgSrc: "Noctua NH-D15.jpg",
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

const powerSupplyProduct = await prisma.product.create({
    data: {
        name: "Corsair RM750x",
        manufacturer: "Corsair",
        type: "POWERSUPPLY",
        price: 124.99,
        quantity: 10,
        imgSrc: "Corsair RM750x.jpg",
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

const powerhouseProduct = await prisma.product.create({
    data: {
        name: "NZXT H510",
        manufacturer: "NZXT",
        type: "POWERHOUSE",
        price: 79.99,
        quantity: 10,
        imgSrc: "NZXT H510.jpg",
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
