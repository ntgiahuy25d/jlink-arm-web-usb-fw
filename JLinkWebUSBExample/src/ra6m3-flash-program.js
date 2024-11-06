var FlashPrg = {

    // Clock related registers address and bit definitions
    MCU_SYSTEM_BASE: 0x4001E000,
    MCU_SCKDIVCR_ADDR: 0x4001E000 + 0x20,
    SCKDIVCR_FCLK_1DEV_MASK: 0x8FFFFFFF,
    SCKDIVCR_ICLK_1DEV_MASK: 0xF8FFFFFF,
    MCU_SCKSCR_ADDR: 0x4001E000 + 0x26,
    SCKSCR_CKSEL_HOCO: 0x00,
    SCKSCR_CKSEL_MOCO: 0x01,
    SCKSCR_CKSEL_LOCO: 0x02,
    SCKSCR_CKSEL_MOSC: 0x03,
    SCKSCR_CKSEL_SOSC: 0x04,
    SCKSCR_CKSEL_PLL: 0x05,
    MCU_PLLCCR_ADDR: 0x4001E000 + 0x28,
    PLLCCR_MUL: 0x3F00,
    PLLCCR_PLSRCSEL_HOCO: 0x0010,
    PLLCCR_PLSRCSEL_MAIN: 0x0000,
    PLLCCR_PLSRCSEL_MASK: 0x0010,
    PLLCCR_PLIDIV_MASK: 0x0003,
    PLLCCR_PLIDIV_1DEV: 0x0000,
    PLLCCR_PLIDIV_2DEV: 0x0001,
    PLLCCR_PLIDIV_3DEV: 0x0002,
    MCU_HOCOCR_ADDR: 0x4001E000 + 0x36,
    HOCOCR_STOP: 1,
    HOCOCR_ON: 0,
    MCU_MOCOCR_ADDR: 0x4001E000 + 0x38,
    MOCOCR_STOP: 1,
    MOCOCR_ON: 0,
    MCU_OSCSF_ADDR: 0x4001E000 + 0x3C,
    OSCSF_HOCOSF: 0x01,
    OSCSF_MOSCSF: 0x08,
    OSCSF_PLLSF: 0x20,
    MCU_PRCR_ADDR: 0x4001E000 + 0x3FE,
    KEYCODE_PRCR: 0xA500,
    PRCR_PRC1: 0x0002,
    PRCR_PRC0: 0x0001,
    PRCR_PRC2: 0x0004,
    PRCR_PRC3: 0x0008,
    MCU_OPCCR_ADDR: 0x4001E000 + 0x0A0,
    OPCCR_OPCCR: 0x03,
    OPCCR_OPCCR_HIGH: 0x00,
    OPCCR_OPCCR_LOW: 0x01,
    OPCCR_OPCMTSF: 0x10,
    OPCCR_OPCMTSF_COMPLETE: 0x00,
    OPCCR_OPCMTSF_TRANS: 0x10,
    MCU_SOPCCR_ADDR: 0x4001E000 + 0x0AA,
    SOPCCR_SOPCM: 0x01,
    SOPCCR_SOPCM_SUBMODE: 0x01,
    SOPCCR_SOPCM_OTH: 0x00,
    SOPCCR_SOPCMTSF: 0x10,
    SOPCCR_SOPCMTSF_COMPLETE: 0x00,
    SOPCCR_SOPCMTSF_TRANS: 0x10,
    MCU_OFS1_ADDR: 0x00000404,
    OFS1_HOCOEN: 0x00000100,
    OFS1_HOCOFRQ0_MASK: 0x00000600,
    OFS1_HOCOFRQ0_16MHZ: 0x00000000,
    OFS1_HOCOFRQ0_18MHZ: 0x00000200,
    OFS1_HOCOFRQ0_20MHZ: 0x00000400,

    // Flash related registers address and bit definitions
    MCU_FLASH_BASE: 0x407F0000,
    MCU_FASTAT_ADDR: 0x407F0000 + 0xE010,
    FASTAT_CMDLK: 0x10,
    MCU_FAEINT_ADDR: 0x407F0000 + 0xE014,
    MCU_FRDYIE_ADDR: 0x407F0000 + 0xE018,
    MCU_FSADDR_ADDR: 0x407F0000 + 0xE030,
    MCU_FEADDR_ADDR: 0x407F0000 + 0xE034,
    MCU_FMEPROT_ADDR: 0x407F0000 + 0xE044,
    FMEPROT_CEPROT: 0x0001,
    FMEPROT_KEY: 0xD900,
    FMEPROT_NOTPROTECT_MODE: 0xD902,
    FMEPROT_PROTECT_MODE: 0xD903,
    MCU_FSTATR_ADDR: 0x407F0000 + 0xE080,
    FSTATR_FRDY: 0x00008000,
    FSTATR_ILGLERR: 0x00004000,
    FSTATR_ERSERR: 0x00002000,
    FSTATR_PRGERR: 0x00001000,
    FSTATR_DBFULL: 0x00000400,
    MCU_FENTRYR_ADDR: 0x407F0000 + 0xE084,
    FENTRYR_READ_MODE: 0xAA00,
    FENTRYR_DATAF_PE: 0xAA80,
    FENTRYR_CODEF_PE: 0xAA01,
    FENTRYR_CHK_FENTRYD: 0x0080,
    FENTRYR_CHK_FENTRYC: 0x0001,
    FENTRYR_CHK_READ: 0x0000,
    MCU_FSUINITR_ADDR: 0x407F0000 + 0xE08C,
    MCU_FCMDR_ADDR: 0x407F0000 + 0xE0A0,
    MCU_FPESTAT_ADDR: 0x407F0000 + 0xE0C0,
    MCU_FCPSR_ADDR: 0x407F0000 + 0xE0E0,
    MCU_FBCCNT_ADDR: 0x407F0000 + 0xE0D0,
    MCU_FBCSTAT_ADDR: 0x407F0000 + 0xE0D4,
    MCU_FPSADDR_ADDR: 0x407F0000 + 0xE0D8,
    MCU_FPCKAR_ADDR: 0x407F0000 + 0xE0E4,
    MCU_FMATSELC_ADDR: 0x407F0000 + 0xE020,
    FMATSELC_EXTRA2: 0x3B02,
    FMATSELC_USER_AREA: 0x3B00,
    MCU_FACI_CMD_AREA_ADDR: 0x407E0000,
    MCU_FWEPROR_ADDR: 0x4001E416,

    // Various parameters
    FPCKAR_KEY: 0x1E00,
    FWEPROR_PE_ENA: 0x01,
    MCU_FENTRYC_CMPADDR: 0x00000000,
    MCU_FENTRYD_CMPADDR: 0x40100000,
    MCU_CONFAREA_CMPADDR: 0x0100A100,
    DATAF_MASK_ADDR: 0x000FFFFF,
    CODEF_MASK_ADDR: 0x00FFFFFF,
    FACI_FORCED_QUIT_CMD: 0xB3,
    FACI_ERASE1_CMD: 0x20,
    FACI_STATUS_CLR_CMD: 0x50,
    FACI_ERASE2_CMD: 0x21,
    FACI_PROG_CMD: 0xE8,
    FACI_READ_LB_CMD: 0x71,
    FACI_PROG_LB_CMD: 0x77,
    FACI_CONF_EXTA_CMD: 0x40,
    FACI_END_CMD: 0xD0,
    FACI_PROG_U_NUM: 0x40,
    FACI_PROG_D_NUM: 0x02,
    FACI_CONF_EXTA_NUM: 0x08,

    CHG_CLK_AND_MOD_ENA: true,
    DEVICETYPE: 'RA6M3_2M',

    CODEF_8K_BLOCK_NUM: 0x08,

    // Block numbers for different configurations
    RA6M3_2M: {
        CODEF_32K_BLOCK_NUM: 0x3E,
        DATAF_64B_BLOCK_NUM: 0x400
    },
    RA6M3_1M: {
        CODEF_32K_BLOCK_NUM: 0x1E,
        DATAF_64B_BLOCK_NUM: 0x400
    },
    RA6M2_1M: {
        CODEF_32K_BLOCK_NUM: 0x1E,
        DATAF_64B_BLOCK_NUM: 0x200
    },
    RA6M2_512K: {
        CODEF_32K_BLOCK_NUM: 0xE,
        DATAF_64B_BLOCK_NUM: 0x200
    },
    RA6M1_512K: {
        CODEF_32K_BLOCK_NUM: 0xE,
        DATAF_64B_BLOCK_NUM: 0x80
    },
    RA6M1_CONF: {
        CODEF_32K_BLOCK_NUM: 0x0,
        DATAF_64B_BLOCK_NUM: 0x0
    },
    RA6M2_CONF: {
        CODEF_32K_BLOCK_NUM: 0x0,
        DATAF_64B_BLOCK_NUM: 0x0
    },
    RA6M3_CONF: {
        CODEF_32K_BLOCK_NUM: 0x0,
        DATAF_64B_BLOCK_NUM: 0x0
    },

    reg_data: {
        PRCR: 0,
        SCKSCR: 1,
        SCKDIVCR: 2,
        PLLCCR: 3,
        HOCOCR: 4,  
        MOCOCR: 5,
        SOPCCR: 6,
        OPCCR: 7,
        FPCKAR: 8,
        OFS1: 9,
        FWEPROR: 10,
        REG_MAX: 11
    },

    s_udwClockUserVal: new Uint32Array(11),

    /**************************************************************************//**
    * @details Initialize Flash Programming Functions
    * @param[in] adr:  Device Base Address
    * @param[in] clk:  Clock Frequency (Hz)
    * @param[in] fnc:  Function Code (1 - Erase, 2 - Program, 3 - Verify)
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_Init: async function (adr, clk, fnc) {

        let ub_ret_val = new Uint8Array(1);
        let ub_mhz_clk = new Uint8Array(1);

        let clk_temp = new Uint32Array(1);
        clk_temp[0] = clk;

        let dataArr = new Uint32Array(1);
        
        ub_ret_val[0] = await this.check_clock_and_mode(clk_temp); // Check if flash rewritable clock and power control mode

        if (this.CHG_CLK_AND_MOD_ENA) {
            /** If the clock and mode cannot rewrite the flash, switch to a possible state */
            if (ub_ret_val[0]) { 
                ub_ret_val[0] = await this.change_clock_and_mode(clk_temp); 
            }
        }

        if(ub_ret_val[0])
        {
            /** Failure if the flash cannot be rewritten */
            return (1); // Failed
        }

        dataArr[0] = this.FWEPROR_PE_ENA;
        await _WriteMem8(this.MCU_FWEPROR_ADDR, dataArr); // Permits P/E
        ub_mhz_clk[0] = Math.floor(clk_temp[0] / 1000000);

        if (clk_temp[0] % 1000000) {
            ub_mhz_clk[0] += 1;
        }

        dataArr[0] = this.FPCKAR_KEY | ub_mhz_clk[0];
        await _WriteMem16(this.MCU_FPCKAR_ADDR, dataArr);

        return await this.ilgl_chk();
    },

    /**************************************************************************//**
    * @details   De-Initialize Flash Programming Functions
    * @param[in] fnc:  Function Code (1 - Erase, 2 - Program, 3 - Verify)
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_UnInit: async function (fnc) {

        let dataArr = new Uint32Array(1);

        dataArr[0] = this.FENTRYR_READ_MODE;
        await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr);


        if (this.CHG_CLK_AND_MOD_ENA) {
            /** Restore clock and power control mode to the state before flash rewriting */
            if (await this.restore_clock_and_mode())
            {
                return (1); // Failed
            }
        }

        return 0;
    },

    /**************************************************************************//**
    * @details   Program Page in Flash Memory
    * @param[in] adr:  Block start Address
    * @param[in] sz:   Block size in byte
    * @param[in] pat:  Pattern to compare
    * @retval    0 - Memory is blank,  1 - Memory is not blank
    ******************************************************************************/
    FL_BlankCheck: async function (adr, sz, pat) {

        let ub_rd_buf = new Uint8Array(128);
        let i, j, k;
        let dataArr = new Uint32Array(1);

        dataArr[0] = this.FENTRYR_READ_MODE;
        await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr);

        for(i = 0; i < sz ; i += 128)
        {
            await this.read_page(adr, 128, ub_rd_buf);
            
            /** Determine size to compare */
            if ((sz - i) >= 128)
            {
                k = 128;
            } else
            {
                k = (sz - i);     
            }
            /** Check up to 128 bytes if equal to pattern "pat" */
            for (j = 0; j < k; j++)
            {	 
                if (ub_rd_buf[j] != pat)
                {
                    return (1); // Memory is not blank	
                }
            }	
        }

        return 0; // Memory is blank
    },

    /**************************************************************************//**
    * @details   Erase complete Flash Memory
    * @param     None
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_EraseChip: async function () {

        let udw_addr = new Uint32Array(1);
        let uby_ilgl_chk = new Uint8Array(1);
        let uw_block_total_num = new Uint16Array(1);
        let dataArr = new Uint32Array(1);
        let i;

        if (this.DEVICETYPE == "RA6M3_CONF") {
            /** Configuration area not support EraseChip */
            return (0); // OK
        } else if (this.DEVICETYPE =="RA6M2_CONF") {
            /** Configuration area not support EraseChip */
            return (0); // OK
 
        } else if (this.DEVICETYPE =="RA6M1_CONF") {
            /** Configuration area not support EraseChip */
            return (0); // OK
        }

        uw_block_total_num[0] = this.CODEF_8K_BLOCK_NUM + this[this.DEVICETYPE].CODEF_32K_BLOCK_NUM + this[this.DEVICETYPE].DATAF_64B_BLOCK_NUM;

        /** Repeat the process for the number of blocks of Code Flash and Data Flash */
        for(i = 0; i < uw_block_total_num[0]; i++)
        {
            /** Calculate the start address of a block from the size and number of blocks */
            if (i == 0)
            {
                await this.pe_mode_entry(this.MCU_FENTRYC_CMPADDR, udw_addr); // Transition to P/E mode
            } else if (0 < i && i <= this.CODEF_8K_BLOCK_NUM)
            {
                udw_addr[0] += 0x2000;
            } else if (this.CODEF_8K_BLOCK_NUM < i && i < (this.CODEF_8K_BLOCK_NUM + this[this.DEVICETYPE].CODEF_32K_BLOCK_NUM))
            {
                udw_addr[0] += 0x8000;
            } else if (i == this.CODEF_8K_BLOCK_NUM + this[this.DEVICETYPE].CODEF_32K_BLOCK_NUM) // First block of Data Flash
            {
                await this.pe_mode_entry(this.MCU_FENTRYD_CMPADDR, udw_addr); // Transition to P/E mode
            } else 
            {
                udw_addr[0] += 0x40;
            }
        
            await _WriteMem32(this.MCU_FSADDR_ADDR, udw_addr); // Set Erase Sector address
            dataArr[0] = this.FACI_ERASE1_CMD;
            await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of erase command
            dataArr[0] = this.FACI_END_CMD;
            await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of termination command
            
            while(!((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_FRDY))
            {
                ; // Waiting for command completion
            }

            if((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_ERSERR)
            {
                /** Erase error */
                return (1); // Failed
            }

            /** Check for command locked and illegal status */
            uby_ilgl_chk[0] = await this.ilgl_chk();
            if(uby_ilgl_chk[0])
            {
                return (1); // Failed
            }
        }

        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Erase Sector in Flash Memory
    * @param[in] adr:  Sector Address
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_EraseSector: async function (adr) {

        let udw_addr = new Uint32Array(1);
        let uby_ilgl_chk = new Uint8Array(1);
        let dataArr = new Uint32Array(1);

        /** Check Flash Write Mode */
         if(adr < this.MCU_CONFAREA_CMPADDR)
        {
            ; // Execute EraseSector command if Code Flash
        } else if(adr < this.MCU_FENTRYD_CMPADDR)
        {
            /** Configuration area not support EraseSector */
            return (0); // OK
        } else
        {
            ; // Execute EraseSector command if Data Flash
        }

        await this.pe_mode_entry(adr, udw_addr); // Transition to P/E mode
        
        await _WriteMem32(this.MCU_FSADDR_ADDR, udw_addr); // Set Erase Sector address
        dataArr[0] = this.FACI_ERASE1_CMD;
        await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of erase command
        dataArr[0] = this.FACI_END_CMD;
        await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of erase command

        while(!((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_FRDY))
        {
            ; // Waiting for command completion
        }
        
        if((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_ERSERR)
        {
            /** Erase error */
            return (1); // Failed
        }

        /** Check for command locked and illegal status */
        uby_ilgl_chk[0] = await this.ilgl_chk();
        if(uby_ilgl_chk[0])
        {
            return (1); // Failed
        }

        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Program Page in Flash Memory
    * @param[in] adr:  Page Start Address
    * @param[in] sz:   Page Size
    * @param[in] buf:  Page Data
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_ProgramPage: async function (adr, sz, buf) {

        let uw_start_data = new Uint16Array(1);
        uw_start_data[0] = 0;
        let uw_wrt_cnt = new Uint16Array(1);
        let uw_wrt_byte = new Uint16Array(1);
        let i;
        let udw_adr_tmp = new Uint32Array(1);
        let uby_area_flg = new Uint8Array(1);
        let uby_ilgl_chk = new Uint8Array(1);
        let dataArr = new Uint32Array(1);
        
        let buf16_temp = new Uint16Array(1);

        await this.pe_mode_entry(adr, udw_adr_tmp); // Check for command locked and illegal status

        while (sz)
        {	
            /** Check Flash Write Mode */
            if (adr < this.MCU_CONFAREA_CMPADDR)
            {
                uby_area_flg[0] = 1; // Code Flash
                if (sz < 128)
                {
                    for (i = sz; i < 128; i++) {
                        buf[uw_start_data[0] + i] = 0xFF;
                    }
                    sz = 128;
                }
            } else if (adr < this.MCU_FENTRYD_CMPADDR)
            {
                uby_area_flg[0] = 2; // Configuration area
                if (sz < 16)
                {
                    for (i = sz; i < 16; i++) {
                        buf[uw_start_data[0] + i] = 0xFF;
                    }
                    sz = 16;
                }
            } else
            {
                uby_area_flg[0] = 0; // Data Flash
                if (sz < 4)
                {
                    for (i = sz; i < 4; i++) {
                        buf[uw_start_data[0] + i] = 0xFF;
                    }
                    sz = 4;
                }
            }

            if (uby_area_flg[0] == 2)
            {
                dataArr[0] = adr;
                await _WriteMem32(this.MCU_FSADDR_ADDR, dataArr); // Set the program start address
                dataArr[0] = this.FACI_CONF_EXTA_CMD;
                await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of program command for configuration area
                dataArr[0] = this.FACI_CONF_EXTA_NUM;
                await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Set the number of write data access

                uw_wrt_cnt[0] = this.FACI_CONF_EXTA_NUM;
                uw_wrt_byte[0] = this.FACI_CONF_EXTA_NUM * 2; // Data size to write with one command
            } else
            {
                await _WriteMem32(this.MCU_FSADDR_ADDR, udw_adr_tmp); // Set the program start address

                if (uby_area_flg[0] == 1)
                {
                    dataArr[0] = this.FACI_PROG_CMD;
                    await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of program command
                    dataArr[0] = this.FACI_PROG_U_NUM;
                    await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Set the number of write data access
                    uw_wrt_cnt[0] = this.FACI_PROG_U_NUM;
                    uw_wrt_byte[0] = this.FACI_PROG_U_NUM * 2; // Data size to write with one command
                } else
                {
                    dataArr[0] = this.FACI_PROG_CMD;
                    await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of program command
                    dataArr[0] = this.FACI_PROG_D_NUM;
                    await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Set the number of write data access
                    uw_wrt_cnt[0] = this.FACI_PROG_D_NUM;
                    uw_wrt_byte[0] = this.FACI_PROG_D_NUM * 2; // Data size to write with one command
                }
            }

            if ((uby_area_flg[0] == 1) || (uby_area_flg[0] == 0))
            {
                for (i = 0; i < uw_wrt_cnt[0]; i++)
                {
                    /** Store 2 bytes each for programming data */
                    buf16_temp[0] = buf[uw_start_data[0]] | (buf[uw_start_data[0]+1] << 8)
                    await _WriteMem16(this.MCU_FACI_CMD_AREA_ADDR, buf16_temp); 
                    uw_start_data[0] +=2;
                    while (await _ReadMem32(this.MCU_FSTATR_ADDR, 1) & this.FSTATR_DBFULL)
                    {
                        ; // Waiting for Data Buffer full to resolve
                    }
                }
            } else
            {
                for (i = 0; i < uw_wrt_cnt[0]; i++)
                {
                    /** Store 2 bytes each for programming data */
                    buf16_temp[0] = buf[uw_start_data[0]] | (buf[uw_start_data[0]+1] << 8)
                    await _WriteMem16(this.MCU_FACI_CMD_AREA_ADDR, buf16_temp);
                    uw_start_data[0] +=2;
                }
            }

            dataArr[0] = this.FACI_END_CMD;
            await _WriteMem8(this.MCU_FACI_CMD_AREA_ADDR, dataArr); // Execution of termination command

            while (!((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_FRDY))
            {
                ; // Waiting for command completion
            }
            
            adr += uw_wrt_byte[0];
            udw_adr_tmp[0] += uw_wrt_byte[0]; // Update programming start address
            sz -= uw_wrt_byte[0]; // Update remaining size

            if ((await _ReadMem32(this.MCU_FSTATR_ADDR, 1))[0] & this.FSTATR_PRGERR)
            {
                /** Programming error */
                return (1); // Failed
            }
    
        }

        /** Check for command locked and illegal status */
        uby_ilgl_chk[0] = await this.ilgl_chk();
        if (uby_ilgl_chk[0])
        {
            return (1); // Failed
        }

        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Verify the size from the specified address
    * @param[in] adr:  Start Address
    * @param[in] sz:   Page Size
    * @param[in] buf:  Page Data
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    FL_Verify: async function(adr, sz, buf) {

        let byte_rd_buf = new Uint8Array(128);
        let adr_tmp = new Uint32Array(1);
        let i, j , k, m;
        let dataArr = new Uint32Array(1);
        adr_tmp[0] = adr;
        m = 0;

        // Return to READ Mode
        dataArr[0] = this.FENTRYR_READ_MODE;
        await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr); // Transition to read mode
        
        for(i = 0; i < sz ; i += 128)
        {
            await this.read_page(adr_tmp[0], 128, byte_rd_buf);

            /** Determine size to compare */
            if ((sz - i) >= 128)
            {
                k = 128;
            } else
            {
                k = (sz - i);     
            }
                    
            /** Check up to 128 bytes if equal to read data */
            for (j = 0; j < k; j++)
            {
                if (byte_rd_buf[j] != buf[m])
                {
                    // return (adr + m); // Address of Memory is not blank
                    return 1;
                }
                m++;
            }	
            adr_tmp[0] = adr + m;
        }

        // return (adr + sz); // Verify is success

        return 0;
    },

    /**************************************************************************//**
    * @details   Check if flash rewritable clock and power control mode
    * @param[in] udwp_clk:  Clock Frequency (Hz)
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    check_clock_and_mode: async function (udwp_clk) {

        let udw_sckdivcr = new Uint32Array(1);
        let udw_sckdivcr_val = new Uint32Array(1);
        let udw_clk_tmp = new Uint32Array(1);
        let uw_bai = new Uint16Array(1);
        let uw_plli_div = new Uint16Array(1);

        /** There is no problem with the following cast conversions
         * because it is a type conversion from unsigned to unsigned */
        /** Saving registers */
        this.s_udwClockUserVal[this.reg_data.PRCR] = (await _ReadMem16(this.MCU_PRCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.SCKSCR] = (await _ReadMem8(this.MCU_SCKSCR_ADDR, 1))[0];
        udw_sckdivcr[0] = (await _ReadMem32(this.MCU_SCKDIVCR_ADDR, 1))[0]; 
        this.s_udwClockUserVal[this.reg_data.SCKDIVCR] = udw_sckdivcr[0];
        this.s_udwClockUserVal[this.reg_data.PLLCCR] = (await _ReadMem16(this.MCU_PLLCCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.HOCOCR] = (await _ReadMem8(this.MCU_HOCOCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.MOCOCR] = (await _ReadMem8(this.MCU_MOCOCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.SOPCCR] = (await _ReadMem8(this.MCU_SOPCCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.OPCCR] = (await _ReadMem8(this.MCU_OPCCR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.FPCKAR] = (await _ReadMem16(this.MCU_FPCKAR_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.OFS1] = (await _ReadMem32(this.MCU_OFS1_ADDR, 1))[0];
        this.s_udwClockUserVal[this.reg_data.FWEPROR] = (await _ReadMem8(this.MCU_FWEPROR_ADDR, 1))[0];

        /** Failed if power control mode is Subosc-speed mode */
        if ((this.s_udwClockUserVal[this.reg_data.SOPCCR] & this.SOPCCR_SOPCM) != this.SOPCCR_SOPCM_OTH)
        {
            return (1); // Failed
        }
    
        /** Failed if power control mode is Low-speed mode */
        if ((this.s_udwClockUserVal[this.reg_data.OPCCR] & this.OPCCR_OPCCR) != this.OPCCR_OPCCR_HIGH)
        {
            return (1); // Failed
        }

        switch (this.s_udwClockUserVal[this.reg_data.SCKSCR])
        {
            case this.SCKSCR_CKSEL_PLL:
                if (this.s_udwClockUserVal[this.reg_data.PLLCCR] & this.PLLCCR_PLSRCSEL_HOCO)
                    { // Input clock source is HOCO
                        if (this.OFS1_HOCOFRQ0_16MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                        {
                            udw_clk_tmp[0] = 16000000;
                        } else if (this.OFS1_HOCOFRQ0_18MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                        {
                            udw_clk_tmp[0] = 18000000;
                        } else if (this.OFS1_HOCOFRQ0_20MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                        {
                            udw_clk_tmp[0] = 20000000;
                        } else
                        {
                            return (1); // Failed
                        }
                    } else
                    {
                        udw_clk_tmp[0] = udwp_clk[0]; // Input clock source is External clock
                    }
        
                    uw_plli_div[0] = (this.s_udwClockUserVal[this.reg_data.PLLCCR] & this.PLLCCR_PLIDIV_MASK) + 1; // PLL input frequency division
                    uw_bai[0] = ((this.s_udwClockUserVal[this.reg_data.PLLCCR] & this.PLLCCR_MUL) >> 8) + 1; // PLL frequency multiplication factor
                    udw_clk_tmp[0] = (udw_clk_tmp[0] / uw_plli_div[0]) * uw_bai[0]; // Frequency output as PLL
                break;
                case this.SCKSCR_CKSEL_MOSC:
                    udw_clk_tmp[0] = udwp_clk[0]; // Input clock source is External clock
                break;
                case this.SCKSCR_CKSEL_MOCO:
                    udw_clk_tmp[0] = 8000000; // MOCO frequency is 8MHz
                break;
                case this.SCKSCR_CKSEL_HOCO:
                    if(this.OFS1_HOCOFRQ0_16MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                    {
                        udw_clk_tmp[0] = 16000000; // HOCO frequency is 16MHz
                    } else if(this.OFS1_HOCOFRQ0_18MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                    {
                        udw_clk_tmp[0] = 18000000; // HOCO frequency is 18MHz
                    } else if(this.OFS1_HOCOFRQ0_20MHZ == (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK))
                    {
                        udw_clk_tmp[0] = 20000000; // HOCO frequency is 20MHz
                    } else
                    {
                        return (1); // Failed
                    }
                break;
                case this.SCKSCR_CKSEL_LOCO: // Failed because LOCO frequency is below 4MHz
                case this.SCKSCR_CKSEL_SOSC: // Failed because SOSC frequency is below 4MHz
                default:
                    return (1); // Failed
        }

        udw_sckdivcr[0] = udw_sckdivcr[0] >> 28;
        udw_sckdivcr_val[0] = 1 << udw_sckdivcr[0]; // FCLK division value
        udwp_clk[0] = udw_clk_tmp[0] / udw_sckdivcr_val[0]; // Calculate FCLK frequency

        /** Failed because outside the allowable frequency(4-60MHz) of FCLK */
         if(((udwp_clk[0]) < 4000000) || (60000000 < (udwp_clk[0])))
        {
            return (1); // Failed
        }
    
        return (0); // OK
    },
    
    /**************************************************************************//**
    * @details   Change to flash rewritable clock and power control mode
    * @param[in] udwp_clk:  Clock Frequency (Hz)
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    change_clock_and_mode: async function (udwp_clk) {

        let dataArr = new Uint32Array(1);

        dataArr[0] = this.KEYCODE_PRCR | this.PRCR_PRC1 | this.PRCR_PRC0;
        await _WriteMem16(this.MCU_PRCR_ADDR, dataArr);

        /** If it is Subosc-speed mode, set it to other than Subosc-speed mode */
        if ((this.s_udwClockUserVal[this.reg_data.SOPCCR] & this.SOPCCR_SOPCM) != this.SOPCCR_SOPCM_OTH)
        {
            dataArr[0] = this.SOPCCR_SOPCM_OTH;
            await _WriteMem8(this.MCU_SOPCCR_ADDR, dataArr);
            while ((await _ReadMem8(this.MCU_SOPCCR_ADDR, 1))[0] & this.SOPCCR_SOPCMTSF)
            {
                ; // Wait till transition completed
            }
        }

        /** If OFS1 is in the initial state, set the clock source to MOCO */
        if ((this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK) == this.OFS1_HOCOFRQ0_MASK)
        {
            /** If the clock source is MOCO, set the clock source to MOCO */
            if (this.s_udwClockUserVal[this.reg_data.SCKSCR] != this.SCKSCR_CKSEL_MOCO)
            {
                /** If MOCO oscillation is stopped, oscillate it */
                if (this.s_udwClockUserVal[this.reg_data.MOCOCR] == this.MOCOCR_STOP)
                {
                    dataArr[0] = this.MOCOCR_ON;
                    await _WriteMem8(this.MCU_MOCOCR_ADDR, dataArr);
                    await this.wait_ms(15/1000);// Wait for oscillation stabilization of MOCO
                }
                dataArr[0] = this.SCKSCR_CKSEL_MOCO;
                await _WriteMem16(this.MCU_SCKSCR_ADDR, dataArr); // Set the clock source to MOCO
            }
            /** Change ICLK and FCLK to divide by 1 */
            dataArr = await _ReadMem32(this.MCU_SCKDIVCR_ADDR, 1);
            dataArr[0] &= (this.SCKDIVCR_FCLK_1DEV_MASK & this.SCKDIVCR_ICLK_1DEV_MASK);
            await _WriteMem32(this.MCU_SCKDIVCR_ADDR, dataArr);

            udwp_clk[0] = 8000000; // FCLK frequency is 8MHz
        } else
        {/** If OFS1 is not in the initial state, set the clock source to HOCO */
            if (this.s_udwClockUserVal[this.reg_data.SCKSCR] != this.SCKSCR_CKSEL_HOCO)
            {
                /** If HOCO oscillation is stopped, oscillate it */
                if (this.s_udwClockUserVal[this.reg_data.HOCOCR] == this.HOCOCR_STOP)
                {
                    dataArr[0] = this.HOCOCR_ON;
                    await _WriteMem8(this.MCU_HOCOCR_ADDR, dataArr);
                    while (!((await _ReadMem8(this.MCU_OSCSF_ADDR, 1))[0] & this.OSCSF_HOCOSF))
                    {
                        ;// Wait for oscillation stabilization of HOCO
                    }
                }
                dataArr[0] = this.SCKSCR_CKSEL_HOCO;
                await _WriteMem16(this.MCU_SCKSCR_ADDR, dataArr);
            }

            /** Change ICLK and FCLK to divide by 1 */
            dataArr = await _ReadMem32(this.MCU_SCKDIVCR_ADDR, 1);
            dataArr[0] &= (this.SCKDIVCR_FCLK_1DEV_MASK & this.SCKDIVCR_ICLK_1DEV_MASK);
            await _WriteMem32(this.MCU_SCKDIVCR_ADDR, dataArr);

            switch (this.s_udwClockUserVal[this.reg_data.OFS1] & this.OFS1_HOCOFRQ0_MASK)
            {
                case this.OFS1_HOCOFRQ0_16MHZ:
                    udwp_clk[0] = 16000000; // FCLK frequency is 16MHz
                break;
                case this.OFS1_HOCOFRQ0_18MHZ:
                    udwp_clk[0] = 18000000; // FCLK frequency is 18MHz
                break;
                case this.OFS1_HOCOFRQ0_20MHZ:
                    udwp_clk[0] = 20000000; // FCLK frequency is 20MHz
                break;
                default:
                    return (1); // Failed
            }
        }
    
        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Restore clock and power control mode to the state before flash rewriting
    * @param     None
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    restore_clock_and_mode: async function () {

        let dataArr = new Uint32Array(1);
        /** There is no problem with the following cast conversions
        * because it is a type conversion from unsigned to unsigned */
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.SCKDIVCR];
        await _WriteMem32(this.MCU_SCKDIVCR_ADDR, dataArr);
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.SCKSCR];
        await _WriteMem16(this.MCU_SCKSCR_ADDR, dataArr);
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.HOCOCR];
        await _WriteMem8(this.MCU_HOCOCR_ADDR, dataArr);
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.MOCOCR];
        await _WriteMem8(this.MCU_MOCOCR_ADDR,dataArr);

        /** Restore power control mode */
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.OPCCR];
        await _WriteMem8(this.MCU_OPCCR_ADDR, dataArr);
        dataArr[0] = this.s_udwClockUserVal[this.reg_data.SOPCCR];
        await _WriteMem8(this.MCU_SOPCCR_ADDR, dataArr);

        dataArr[0] = this.s_udwClockUserVal[this.reg_data.FWEPROR];
        await _WriteMem8(this.MCU_FWEPROR_ADDR, dataArr);
        dataArr[0] = this.KEYCODE_PRCR | this.s_udwClockUserVal[this.reg_data.PRCR];
        await _WriteMem16(this.MCU_PRCR_ADDR, dataArr);
        
        return 0;
    },

    /**************************************************************************//**
    * @details    Transition to P/E mode
    * @param[in]  udw_addr: Write start address
    * @param[out] udwp_adr_ret: Write start address after mask
    * @retval    0 - OK,  1 - Failed
    * ******************************************************************************/
    pe_mode_entry: async function (udw_addr, udwp_adr_ret) {
        
        let dataArr = new Uint32Array(1);

        dataArr[0] = this.FENTRYR_READ_MODE;
        await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr); // Transition to read mode
        while ((await _ReadMem16(this.MCU_FENTRYR_ADDR, 1))[0] != this.FENTRYR_CHK_READ) // Wait until switching to read mode
        {
            ;
        }

        if (udw_addr < this.MCU_FENTRYD_CMPADDR)
        {
            dataArr[0] = this.FENTRYR_CODEF_PE;
            await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr); // Transition to Code Flash P/E mode
            udwp_adr_ret[0] = udw_addr & this.CODEF_MASK_ADDR; // Set the write start address after mask
            while ((await _ReadMem16(this.MCU_FENTRYR_ADDR, 1))[0] != this.FENTRYR_CHK_FENTRYC) // Wait until switching to Code Flash P/E mode
            {
                ;
            }
        } else
        {
            dataArr[0] = this.FENTRYR_DATAF_PE;
            await _WriteMem16(this.MCU_FENTRYR_ADDR, dataArr); // Transition to Data Flash P/E mode
            udwp_adr_ret[0] = udw_addr & this.DATAF_MASK_ADDR; // Set the write start address after mask
            while((await _ReadMem16(this.MCU_FENTRYR_ADDR, 1))[0] != this.FENTRYR_CHK_FENTRYD) // Wait until switching to Data Flash P/E mode
            {
                ;
            }
        }
        
        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Check for command locked and illegal status
    * @param     None
    * @retval    0 - OK,  1 - Failed
    ******************************************************************************/
    ilgl_chk: async function () {

        let ubydata = new Uint8Array(1);
        let udwdata = new Uint32Array(1);

        /** Check for command locked state */
        ubydata = await _ReadMem8(this.MCU_FASTAT_ADDR, 1);
        if(ubydata[0] & this.FASTAT_CMDLK)
        {
            return(1); // Failed
        }

        /** Check for illegal state */
        udwdata = await _ReadMem32(this.MCU_FSTATR_ADDR, 1);
        if(udwdata[0] & this.FSTATR_ILGLERR)
        {
            return(1); // Failed
        }

        return (0); // OK
    },

    /**************************************************************************//**
    * @details   Wait for oscillation stabilization of MOCO (about 15us)
    * @param[in] ms: Wait time (ms)
    * @retval    None
    ******************************************************************************/
    wait_ms: function (ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**************************************************************************//**
    * @details   Read the data written in the flash
    * @param[in] udw_addr:  Read start address
    * @param[in] udw_sz:   	Read size
    * @param[in] ubp_buf:   Buffer to store read data
    * @retval    None
    ******************************************************************************/
    read_page: async function (udw_addr, udw_sz, ubp_buf) {

        let i;

        for(i = 0; i < udw_sz ; i++)
        {
            ubp_buf[i] = (await _ReadMem8(udw_addr + i, 1))[0]; // Store read data byte by byte
        }
    }

};