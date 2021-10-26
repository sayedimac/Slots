# az-slots-net31

Using Azure Application Service Slots for App Configuration management. Config settings can be scoped to an individual Slot, or apply to all Slots.

This app reads values from the appsettings.json file by default and will continue to do so once deployed to an App Service until these fields (dbconn, colour, etc.) are created.
