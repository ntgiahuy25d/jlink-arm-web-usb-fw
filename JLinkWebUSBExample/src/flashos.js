const FlashOS = {

    VERS: 1,
    UNKNOWN: 0,
    ONCHIP: 1,
    EXT8BIT: 2,
    EXT16BIT: 3,
    EXT32BIT: 4,
    EXTSPI: 5,

    SECTOR_NUM: 512,
    PAGE_MAX: 65536,

    FLASH_DRV_VERS: 1,
    SECTOR_END: [0xFFFFFFFF, 0xFFFFFFFF],

    FlashSectors: function (szSector, AddrSector) {

        this.szSector = szSector;
        this.AddrSector = AddrSector;
        return this;
    },

    FlashDevice: function (Vers, DevName, DevType, DevAdr, szDev, szPage, Res, valEmpty, toProg, toErase, sectors) {
        
        this.Vers = Vers;
        this.DevName = DevName;
        this.DevType = DevType;
        this.DevAdr = DevAdr;
        this.szDev = szDev;
        this.szPage = szPage;
        this.Res = Res;
        this.valEmpty = valEmpty;
        this.toProg = toProg;
        this.toErase = toErase;
        this.sectors = sectors;
    },

}