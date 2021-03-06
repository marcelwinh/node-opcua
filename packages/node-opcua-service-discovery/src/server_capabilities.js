const serverCapapbilities = [

    "NA",  // No capability information is available. Cannot be used in combination with any other capability.
    "DA",  // Provides current data.
    "HD",  // Provides historical data.
    "AC",  //Provides alarms and conditions that may require operator interaction.
    "HE",  // Provides historical alarms and events.
    "GDS", //Supports the Global Discovery Server information model.
    "LDS", // Only supports the Discovery Services. Cannot be used in combination with any other capability.
    "DI",  //Supports the Device Integration (DI) information model (see DI).
    "ADI", // Supports the Analyser Device Integration (ADI) information model (see ADI).
    "FDI", // Supports the Field Device Integration (FDI) information model (see FDI).
    "FDIC",// Supports the Field Device Integration (FDI) Communication Server information model (see FDI).
    "PLC", // Supports the PLCopen information model (see PLCopen).
    "S95", // Supports the ISA95 information model (see ISA-95).

    // new in 1.04

    "RCP", // Supports the reverse connect capabilities defined in Part 6.
    "PUB", // Supports the Publisher capabilities defined in Part 14.

];

exports.serverCapapbilities = serverCapapbilities;

