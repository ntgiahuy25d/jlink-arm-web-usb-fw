===========
Purpose:
===========
This example demonstrates using WebUSB to communicate with J-Link + a Cortex-M target connected to that J-Link, via USB.
It connects to a J-Link and reads its firmware string.
It expects a Cortex-M device to be connected to J-Link and that device needs to be accessible via SWD.

===========
IMPORTANT:
===========
The connected J-Link must be configured for driverless (WinUSB) mode.
What to do:
  Download & install latest J-Link software package: https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack
  Start J-Link Configurator
  Navigate to connected J-Link -> Right-click -> Update firmware
  Wait for FW update to finish
  Double click J-Link in Configurator
  In the "USB Driver" section, select "WinUSB" and click "OK"
  Power-cycle J-Link
Future versions of the OB-S124 and OB-RA4M3 will be configured to WinUSB by default at factory

===========
Tested web browsers:
===========
  Google Chrome       Version 114.0.5735.91
  Microsoft Edge      Version Version 113.0.1774.57
  Mozilla Firefox     No WebUSB in May 2023 support. Error message is displayed by this example
  Safari              No WebUSB in May 2023 support. Error message is displayed by this example

  Firefox specifics:
    Test cannot be performed on localhost easily.
    HTML pages etc. must be placed on a server that supports HTTPS.
    The example then needs to be called like this: https://download.segger.com/JLinkWebIDE/Example.html
    Otherwise, Firefox will reject WebUSB support.

===========
Tested J-Link hardware:
===========
  J-Link BASE/PLUS V12 (J-Link V11 / V10 are not guaranteed to work)
  J-Link OB-S124       (May require FW update, see "IMPORTANT" below)
  J-Link-OB-RA4M2      (May require FW update, see "IMPORTANT" below)

===========
Tested target hardware:
===========
  SEGGER STM32F407 trace reference board (https://shop.segger.com/evaluation-boards/trace-reference-boards/cortex-m-trace-reference-board)
  Renesas EK-RA6M4 (J-Link-OB-S124 on it)
  Renesas EK-RA4M2 (J-Link-OB-S124 on it)
  Renesas EK-RA4W3 (J-Link-OB-RA4M2 on it)

===========
J-Link commands:
===========
  EMU_CMD_GET_VERSION => Get J-Link firmware string
  EMU_CMD_GET_CAPS / EMU_CMD_GET_CAPS_EX => Get J-Link capabilities
  EMU_CMD_REGISTER => Registers an active debug connection in the J-Link firmware (needed for EMU_CMD_CORESIGHT command)
  EMU_CMD_CORESIGHT => CMSIS-DAP like commands to communicate with the DAP of the target device
Protocol and responses of the commands is explained in src/programming.js -> _ConnectTarget()

===========
Technical support:
===========
  Arne Kulinna (support_jlink@segger.com)
  Please keep in CC: David Noverraz (david.noverraz@segger.com)
