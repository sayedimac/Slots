# Example of a C# ASP.NET Core 3.1 application and App Config Slots

Using Azure Application Service Slots for App Configuration management. Config settings can be scoped to an individual Slot, or apply to all Slots.

This app reads values from the appsettings.json file by default and will continue to do so once deployed to an App Service until these fields (dbconn, colour, etc.) are created in the Config Configration section of the App Service. 
See how to do that [here](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots#:~:text=%20Add%20a%20slot%20%201%20in%20the,added%2C%20select%20Close%20to%20close%20the...%20More%20). 

## There are 4 fields I am using in the app:
- dbconn (unique for DEV, UAT and PROD typically)
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
I am using views to surface these fields in the MVC application. The first view I had to change from the standard Dotnet MVC template, is the _ViewImports.cshtml  file. I simply added two lines that make these Configuration settings available in all views: 
```
@using Microsoft.Extensions.Configuration
@inject IConfiguration Conf
```
This allows you to read these values using the following syntax:
```
@{
    ViewData["Title"] = "Home Page";
}
<div class="text-center" style="background-color: @Conf["colour"];">
    <h1 class="display-4">Welcome the @Conf["site"] site</h1>
    <dl class="text-left">
        <dt>DB connection string</dt>
        <dd>@Conf["dbconn"]</dd>

        <dt>Auth URL string</dt>
        <dd>@Conf["auth"]</dd>
    </dl>
</div>
```
