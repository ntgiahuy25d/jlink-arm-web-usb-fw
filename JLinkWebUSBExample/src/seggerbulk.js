/*********************************************************************
*                   (c) SEGGER Microcontroller GmbH                  *
*                        The Embedded Experts                        *
*                           www.segger.com                           *
**********************************************************************

-------------------------- END-OF-HEADER -----------------------------

File    : seggerbulk.js
Purpose : Implementation of WebUSB API
Literature:
  [1]  ...

Additional information:
  <Any additional information for this module>
*/

class SeggerBulk {

  /*********************************************************************
  *
  *       _LogOut()
  *
  *  Function description
  *    Outputs debug log into browser console. Enabled via variable
  */
  _LogOut(sLog) {
    if (this._DEBUG) {
      console.log(sLog);
    }
  }

  /*********************************************************************
  *
  *       _cbDetermineDeviceParas()
  *
  *  Function description
  *    Determines interface and EPs to be used.
  *    Called as callback during the connect process
  *
  *  Notes
  *    (1) Success callback of resolved promise
  */
  async _DetermineDeviceParas(result) {
    var configurationInterfaces;
    var iIF;
    var iAltIF;
    var element;
    var elementalt;
    var Found;
    var sErr;
    var v;
    //
    // For J-Link:
    // The EPs we need to use for communication depends on the J-Link configuration
    // As the BULK component is always the last one in the USB descriptors, the BULK EPs move depending on which USB components the J-Link populates
    // However, we can easily find them by looking for the interface that has class == 0xFF (vendor specific).
    // This is the interface that holds the BULK EPs we use for WebUSB
    //
    // For emPower:
    // Mainly the same as for J-Link
    //
    this._LogOut("_cbDetermineDeviceParas()");
    configurationInterfaces = this._Device.configuration.interfaces;    // Set in constructor of this class
    Found = 0;
    for (iIF = 0; iIF < configurationInterfaces.length; iIF++) {        // Iterate through interfaces of device
      element = configurationInterfaces[iIF];
      for (iAltIF = 0; iAltIF < element.alternates.length; iAltIF++) {  // Iterate through alternate interfaces of current interface
        elementalt = element.alternates[iAltIF];
        this._LogOut("_cbDetermineDeviceParas(): iIF: " + iIF + " iAltIF: " + iAltIF + " class: " + elementalt.interfaceClass);
        if (elementalt.interfaceClass==0xff) {                          // Vendor specific alternate interface found? => Done
          Found = 1;
          break;
        }
      }
      if (Found) {
        break;
      }
    }
    if (Found) {
      if (elementalt.endpoints.length != 2) {                          // We expect exact 2 EPs for the vendor specific interface
        Found = 0;
        sErr = "USB interface does not provide needed in/out EPs";
      }
    } else {
      sErr = "Not matching USB interface found";
    }
    if (Found) {
      this._InterfaceNumber = element.interfaceNumber;
      if (elementalt.endpoints[0] == "out") {
        this._EPOut = elementalt.endpoints[0].endpointNumber;
        this._EPIn  = elementalt.endpoints[1].endpointNumber;
      } else {
        this._EPIn  = elementalt.endpoints[0].endpointNumber;
        this._EPOut = elementalt.endpoints[1].endpointNumber;
      }
      this._MaxPacketSize = elementalt.endpoints[0].packetSize;
      v = Promise.resolve(0);
    } else {
      v = Promise.reject(sErr);
    }
    return v;
  }

  /*********************************************************************
  *
  *       _cbSetConfig()
  *
  *  Function description
  *    Schedules asynchronous select configuration of USB device.
  *    Called as callback during the connect process
  *
  *  Notes
  *    (1) Success callback of resolved promise
  */
  async _SetConfig(result) {
    this._LogOut("_cbSetConfig()");
    if (this._Device.configuration === null) {        // If OS has not already select a configuration for the device, trigger setting one
      return this._Device.selectConfiguration(1);            // Trigger set device configuration
    }
    return result;
  }

  /*********************************************************************
  *
  *       _cbClaimIF()
  *
  *  Function description
  *    Schedules asynchronous claim of interface of USB device.
  *    Called as callback during the connect process
  *
  *  Notes
  *    (1) Success callback of resolved promise
  */
  async _ClaimIF(result) {
    this._LogOut("_cbClaimIF(): claim IF " + this._InterfaceNumber);
    return this._Device.claimInterface(this._InterfaceNumber);               // Schedules asynchronous operation. Done as soon as we leave javascript function
  }

  /*********************************************************************
  *
  *       _cbSetAltIF()
  *
  *  Function description
  *    Triggers asynchronous setting of alternate interface of interface of USB device.
  *    Called as callback during the connect process
  *
  *  Notes
  *    (1) Success callback of resolved promise
  */
  async _SetAltIF(result) {
    this._LogOut("_cbSetAltIF() select IF " + this._InterfaceNumber);
    return this._Device.selectAlternateInterface(this._InterfaceNumber, 0);  // Schedules asynchronous operation. Done as soon as we leave javascript function
  }

  /*********************************************************************
  *
  *       _cbOpenDevice()
  *
  *  Function description
  *    Triggers asynchronous setting of opening the USB device.
  *    Called as callback during the connect process
  *
  *  Notes
  *    (1) Success callback of resolved promise
  */
  async _OpenDevice(result) {
    this._LogOut("_cbOpenDevice()");
    this._Device = result;
    return await this._Device.open();                              // Schedules asynchronous operation. Done as soon as we leave javascript function
  }

  /*********************************************************************
  *
  *       Send()
  *
  *  Function description
  *    Schedules asynchronous send to USB device.
  *
  *  Return value
  *    Promise object
  */
  Send(data, cbOnOK, cbOnErr) {
    var ObjPromise;

    this._LogOut("send()");
    ObjPromise = this._Device.transferOut(this._EPOut, data);
    ObjPromise.then(cbOnOK, cbOnErr);
    return ObjPromise;
  }

  /*********************************************************************
  *
  *       Receive()
  *
  *  Function description
  *    Schedules asynchronous receive from USB device.
  *
  *  Return value
  *    Promise object
  */
  Receive(cbOnOK, cbOnErr) {
    var ObjPromise;
    var NumBytesAtOnce;
    //
    // By default, request up to 2048 bytes from the device in 1 chunk.
    // This is to mimic the old SEGGER USB kernel driver behavior.
    // There is no NULL packet expected after a transfer of 2048 bytes.
    // The application may change this value and configure J-Link differently, if it supports EMU_CMD_SET_EMU_OPTION with the option SET_MAX_TRANSFER_SIZE.
    // The receive function will return if either all data (MaxTransferSize) has been received or a short packet (< MaxPacketSize> has been received.
    //
    NumBytesAtOnce = this._MaxTransferSize;                            // Request up to <MaxTransferSize> at once. Needs to be a multiple of <MaxPacketSize>
    this._LogOut("receive(NumBytesAtOnce = " + NumBytesAtOnce + ")");
    ObjPromise = this._Device.transferIn(this._EPIn, NumBytesAtOnce);
    ObjPromise.then(cbOnOK, cbOnErr);
    return ObjPromise;
  };

  /*********************************************************************
  *
  *       SetMaxTransferSize()
  */
  SetMaxTransferSize(MaxTransferSize) {
    this._MaxTransferSize = MaxTransferSize;
  }

  /*********************************************************************
  *
  *       Disconnect()
  *
  *  Function description
  *    Schedules asynchronous disconnect sequence from USB device.
  *
  *  Return value
  *    Promise object
  */
  Disconnect() {
    this._LogOut("disconnect()");
    return this._Device.close();
  }

  /*********************************************************************
  *
  *       Connect()
  *
  *  Function description
  *    Schedules asynchronous connection sequence to USB device.
  *
  *  Return value
  *    Promise object
  */
  async Connect() {
    var v;
    var USBObjPromise;
    var cb;
    var Filters = { 'filters' : 0 };
    //
    // Register an open sequence
    // Every asynchronous operation will be executed sequentially.
    // If an operation fails the error will be catched and handled.
    //
    this._LogOut("connect()");
    Filters['filters'] = this.aFilters;
    try {
      USBObjPromise = await navigator.usb.requestDevice(Filters);  // Schedules asynchronous operation. Done as soon as we leave javascript function
      await this._OpenDevice(USBObjPromise);
      await this._SetConfig();
      await this._DetermineDeviceParas();
      await this._ClaimIF();
      await this._SetAltIF();
      this._LogOut("connect() finished");
    } catch(e) {
      this._LogOut(e);
      if (e instanceof TypeError) {
        //
        // Check for browser support
        //
        alert("This browser does not support WebUSB.\rPlease use a supporting Browser.\rCheck compatibility: https://caniuse.com/webusb");
        return Promise.reject("Error: Browser does not support WebUSB. Check compatibility: https://caniuse.com/webusb");
      } else if (e instanceof DOMException) {
        //
        // Handle DOMExceptions
        //
        switch (e.name) {
          case "NotFoundError":
              return Promise.reject("Disconnected"); // User closed device selection popup
          default:
        }
      }
      return Promise.reject(e);
    }
    return Promise.resolve();
  }

  /*********************************************************************
  *
  *       constructor()
  *
  *  Function description
  *    Constructor of this class.
  *    Adds members and methods of class and remembers passed device
  */
  constructor() {
    //
    // Add member variables to class
    // Most Will be initialized during connect phase at runtime
    //
    this._InterfaceNumber = 0;  // Initialized during connect phase
    this._EPIn            = 0;  // Initialized during connect phase
    this._EPOut           = 0;  // Initialized during connect phase
    this._Device          = 0;  // Initialized during connect phase
    this._MaxPacketSize   = 0;  // Initialized during connect phase
    this._MaxTransferSize = 2048;  // Compatibility to SEGGER kernel mode driver behavior and older J-Links (See Receive()). May be modified later on by application via SetMaxTransferSize()
    this._DEBUG           = 0;  // May be set to enable debug log output for class instance
    this.aFilters         = [
      // [old format]
      { 'vendorId': 0x1366, 'productId': 0x0101 }, // J-Link (default)                 | Flasher STM8 | Flasher ARM | Flasher 5 PRO
      { 'vendorId': 0x1366, 'productId': 0x0102 }, // J-Link USBAddr = 1 (obsolete)
      { 'vendorId': 0x1366, 'productId': 0x0103 }, // J-Link USBAddr = 2 (obsolete)
      { 'vendorId': 0x1366, 'productId': 0x0104 }, // J-Link USBAddr = 3 (obsolete)
      { 'vendorId': 0x1366, 'productId': 0x0105 }, // CDC + J-Link
      { 'vendorId': 0x1366, 'productId': 0x0106 }, // CDC
      { 'vendorId': 0x1366, 'productId': 0x0107 }, // RNDIS  + J-Link
      { 'vendorId': 0x1366, 'productId': 0x0108 }, // J-Link + MSD
      // [new format]
      { 'vendorId': 0x1366, 'productId': 0x1001 }, // MSD
      { 'vendorId': 0x1366, 'productId': 0x1002 }, // RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1003 }, // RNDIS  + MSD
      { 'vendorId': 0x1366, 'productId': 0x1004 }, // 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x1005 }, // 1x CDC    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1006 }, // RNDIS  + 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x1007 }, // RNDIS  + 1x CDC    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1008 }, // HID
      { 'vendorId': 0x1366, 'productId': 0x1009 }, // MSD    + HID
      { 'vendorId': 0x1366, 'productId': 0x100a }, // RNDIS  + HID
      { 'vendorId': 0x1366, 'productId': 0x100b }, // RNDIS  + MSD    + HID
      { 'vendorId': 0x1366, 'productId': 0x100c }, //          1x CDC    + HID
      { 'vendorId': 0x1366, 'productId': 0x100d }, //          1x CDC    + MSD    + HID
      { 'vendorId': 0x1366, 'productId': 0x100e }, // RNDIS  + 1x CDC    + HID
      { 'vendorId': 0x1366, 'productId': 0x100f }, // RNDIS  + 1x CDC    + MSD + HID
      { 'vendorId': 0x1366, 'productId': 0x1010 }, // J_LINK_SEGGER_DRV
      { 'vendorId': 0x1366, 'productId': 0x1011 }, // J_LINK_SEGGER_DRV                                + MSD
      { 'vendorId': 0x1366, 'productId': 0x1012 }, // J_LINK_SEGGER_DRV                     + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1013 }, // J_LINK_SEGGER_DRV                     + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1014 }, // J_LINK_SEGGER_DRV          + 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x1015 }, // J_LINK_SEGGER_DRV          + 1x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1016 }, // J_LINK_SEGGER_DRV          + 1x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1017 }, // J_LINK_SEGGER_DRV          + 1x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1018 }, // J_LINK_SEGGER_DRV + HID
      { 'vendorId': 0x1366, 'productId': 0x1019 }, // J_LINK_SEGGER_DRV + HID                          + MSD
      { 'vendorId': 0x1366, 'productId': 0x101a }, // J_LINK_SEGGER_DRV + HID               + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x101b }, // J_LINK_SEGGER_DRV + HID               + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x101c }, // J_LINK_SEGGER_DRV + HID    + 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x101d }, // J_LINK_SEGGER_DRV + HID    + 1x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x101e }, // J_LINK_SEGGER_DRV + HID    + 1x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x101f }, // J_LINK_SEGGER_DRV + HID    + 1x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1020 }, // J_LINK_WINUSB_DRV
      { 'vendorId': 0x1366, 'productId': 0x1021 }, // J_LINK_WINUSB_DRV                                + MSD
      { 'vendorId': 0x1366, 'productId': 0x1022 }, // J_LINK_WINUSB_DRV                     + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1023 }, // J_LINK_WINUSB_DRV                     + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1024 }, // J_LINK_WINUSB_DRV          + 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x1025 }, // J_LINK_WINUSB_DRV          + 1x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1026 }, // J_LINK_WINUSB_DRV          + 1x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1027 }, // J_LINK_WINUSB_DRV          + 1x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1028 }, // J_LINK_WINUSB_DRV + HID
      { 'vendorId': 0x1366, 'productId': 0x1029 }, // J_LINK_WINUSB_DRV + HID                          + MSD
      { 'vendorId': 0x1366, 'productId': 0x102a }, // J_LINK_WINUSB_DRV + HID               + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x102b }, // J_LINK_WINUSB_DRV + HID               + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x102c }, // J_LINK_WINUSB_DRV + HID    + 1x CDC
      { 'vendorId': 0x1366, 'productId': 0x102d }, // J_LINK_WINUSB_DRV + HID    + 1x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x102e }, // J_LINK_WINUSB_DRV + HID    + 1x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x102f }, // J_LINK_WINUSB_DRV + HID    + 1x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1050 }, // J_LINK_SEGGER_DRV          + 2x CDC
      { 'vendorId': 0x1366, 'productId': 0x1051 }, // J_LINK_SEGGER_DRV          + 2x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1052 }, // J_LINK_SEGGER_DRV          + 2x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1053 }, // J_LINK_SEGGER_DRV          + 2x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1054 }, // J_LINK_SEGGER_DRV          + 3x CDC
      { 'vendorId': 0x1366, 'productId': 0x1055 }, // J_LINK_SEGGER_DRV          + 3x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1056 }, // J_LINK_SEGGER_DRV          + 3x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1057 }, // J_LINK_SEGGER_DRV          + 3x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1058 }, // J_LINK_SEGGER_DRV + HID    + 2x CDC
      { 'vendorId': 0x1366, 'productId': 0x1059 }, // J_LINK_SEGGER_DRV + HID    + 2x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x105a }, // J_LINK_SEGGER_DRV + HID    + 2x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x105b }, // J_LINK_SEGGER_DRV + HID    + 2x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x105c }, // J_LINK_SEGGER_DRV + HID    + 3x CDC
      { 'vendorId': 0x1366, 'productId': 0x105d }, // J_LINK_SEGGER_DRV + HID    + 3x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x105e }, // J_LINK_SEGGER_DRV + HID    + 3x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x105f }, // J_LINK_SEGGER_DRV + HID    + 3x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1060 }, // J_LINK_WINUSB_DRV          + 2x CDC
      { 'vendorId': 0x1366, 'productId': 0x1061 }, // J_LINK_WINUSB_DRV          + 2x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1062 }, // J_LINK_WINUSB_DRV          + 2x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1063 }, // J_LINK_WINUSB_DRV          + 2x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1064 }, // J_LINK_WINUSB_DRV          + 3x CDC
      { 'vendorId': 0x1366, 'productId': 0x1065 }, // J_LINK_WINUSB_DRV          + 3x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x1066 }, // J_LINK_WINUSB_DRV          + 3x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x1067 }, // J_LINK_WINUSB_DRV          + 3x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x1068 }, // J_LINK_WINUSB_DRV + HID    + 2x CDC
      { 'vendorId': 0x1366, 'productId': 0x1069 }, // J_LINK_WINUSB_DRV + HID    + 2x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x106a }, // J_LINK_WINUSB_DRV + HID    + 2x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x106b }, // J_LINK_WINUSB_DRV + HID    + 2x CDC   + RNDIS    + MSD
      { 'vendorId': 0x1366, 'productId': 0x106c }, // J_LINK_WINUSB_DRV + HID    + 3x CDC
      { 'vendorId': 0x1366, 'productId': 0x106d }, // J_LINK_WINUSB_DRV + HID    + 3x CDC              + MSD
      { 'vendorId': 0x1366, 'productId': 0x106e }, // J_LINK_WINUSB_DRV + HID    + 3x CDC   + RNDIS
      { 'vendorId': 0x1366, 'productId': 0x106f }, // J_LINK_WINUSB_DRV + HID    + 3x CDC   + RNDIS    + MSD
    ];
  }
}
