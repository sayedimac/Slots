# Example of a C# ASP.NET Core 3.1 application and App Config Slots

Using Azure Application Service Slots for App Configuration management. Config settings can be scoped to an individual Slot, or apply to all Slots.

This app reads values from the appsettings.json file by default and will continue to do so once deployed to an App Service ( until these fields (dbconn, colour, etc.) are created in the Config Configration section of the App Service.See how to do that [here](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots#:~:text=%20Add%20a%20slot%20%201%20in%20the,added%2C%20select%20Close%20to%20close%20the...%20More%20). 

## There are 4 fields:
- dbconn (unique for DEV, UAT and PROD)
- colour (div background colour if you want to change colours between slots)
- site (site name Dev in json file, UAT in UAT slot, PROD in Production slot)
- auth (scope to app service annd applies to all sites)
```
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
```
