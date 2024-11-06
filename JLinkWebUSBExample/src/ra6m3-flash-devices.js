var FlashDev = {
    
    RA6M1_512K: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M1 512KB Flash",        // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x00000000,                 // Device Start Address
        0x00080000,                 // Device Size in Bytes (512KB)
        8192,                        // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [

            new FlashOS.FlashSectors(0x00002000, 0x00000000),   // Sector Size  8kB (8 Sectors) 
            new FlashOS.FlashSectors(0x00008000, 0x00010000),   // Sector Size 32kB (14 Sectors) 
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF),
        ],
    ),

    RA6M2_512K: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M2 512KB Flash",        // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x00000000,                 // Device Start Address
        0x00080000,                 // Device Size in Bytes (512KB)
        8192,                        // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00002000, 0x00000000),   // Sector Size  8kB (8 Sectors)
            new FlashOS.FlashSectors(0x00008000, 0x00010000),   // Sector Size 32kB (14 Sectors) 
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF),
        ],
    ),

    RA6M2_1M: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M2 1MB Flash",          // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x00000000,                 // Device Start Address
        0x00100000,                 // Device Size in Bytes (1MB)
        8192,                        // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00002000, 0x00000000),   // Sector Size  8kB (8 Sectors)
            new FlashOS.FlashSectors(0x00008000, 0x00010000),   // Sector Size 32kB (30 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF),
        ],
    ),

    RA6M3_1M: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M3 1MB Flash",          // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x00000000,                 // Device Start Address
        0x00100000,                 // Device Size in Bytes (1MB)
        8192,                        // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00002000, 0x00000000),   // Sector Size  8kB (8 Sectors)
            new FlashOS.FlashSectors(0x00008000, 0x00010000),   // Sector Size 32kB (30 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF),   
        ],
    ),

    RA6M3_2M: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M3 2MB Flash",          // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x00000000,                 // Device Start Address
        0x00200000,                 // Device Size in Bytes (2MB)
        8192,                        // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00002000, 0x00000000),   // Sector Size  8kB (8 Sectors)
            new FlashOS.FlashSectors(0x00008000, 0x00010000),   // Sector Size 32kB (62 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M1_CONF: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M1 Config Area",        // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x0100A100,                 // Device Start Address
        0x00000080,                 // Device Size in Bytes (128B)
        16,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        100,                        // Program Page Timeout 100 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000010, 0x00000000),   // Sector Size  16B (8 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M2_CONF: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M2 Config Area",        // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x0100A100,                 // Device Start Address
        0x00000080,                 // Device Size in Bytes (128B)
        16,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        100,                        // Program Page Timeout 100 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000010, 0x00000000),   // Sector Size  16B (8 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M3_CONF: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M3 Config Area",        // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x0100A100,                 // Device Start Address
        0x00000080,                 // Device Size in Bytes (128B)
        16,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        100,                        // Program Page Timeout 100 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000010, 0x00000000),   // Sector Size  16B (8 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M1_DATA: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M1 8KB DataFlash",      // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x40100000,                 // Device Start Address
        0x00002000,                 // Device Size in Bytes (8KB)
        64,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000040, 0x00000000),   // Sector Size  64B (128 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M2_DATA: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M2 32KB DataFlash",     // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x40100000,                 // Device Start Address
        0x00008000,                 // Device Size in Bytes (32KB)
        64,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                   	// Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000040, 0x00000000),   // Sector Size  64B (512 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

    RA6M3_DATA: new FlashOS.FlashDevice (
        
        FlashOS.FLASH_DRV_VERS,     // Driver Version, do not modify!
        "RA6M3 64KB DataFlash",     // Device Name 
        FlashOS.ONCHIP,             // Device Type
        0x40100000,                 // Device Start Address
        0x00010000,                 // Device Size in Bytes (64KB)
        64,                         // Programming Page Size
        0,                          // Reserved, must be 0
        0xFF,                       // Initial Content of Erased Memory
        1000,                       // Program Page Timeout 1000 mSec
        3000,                       // Erase Sector Timeout 3000 mSec

        // Specify Size and Address of Sectors
        [
            new FlashOS.FlashSectors(0x00000040, 0x00000000),   // Sector Size  64B (1024 Sectors)
            new FlashOS.FlashSectors(0xFFFFFFFF, 0xFFFFFFFF), 
        ],
    ),

}


// console.log(FlashDev.RA6M1_512K.sectors[1].AddrSector);