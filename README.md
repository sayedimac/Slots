# az-slots-net31

Using Azure Application Service Slots for App Configuration management. Config settings can be scoped to an individual Slot, or apply to all Slots.

This app reads values from the appsettings.json file by default and will continue to do so once deployed to an App Service ( until these fields (dbconn, colour, etc.) are created in the Config Configration section of the App Service.

There are 4 fields:
- dbconn (unique for DEV, UAT and PROD)
- colour (div background colour if you want to change colours between slots)
- site (site name Dev in json file, UAT in UAT slot, PROD in Production slot)
- auth (scope to app service annd applies to all sites)
'''
{
  "dbconn":"dbconn-from-test",
  "colour":"#FF7F50",
  "site":"DEV",
  "auth":"https://alwayson",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
'''
