[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://sayedimac-urban-acorn-wv5r6r9x455c9477.github.dev)
# Example of a C# ASP.NET 6.0 application and Azure App Service Deploymnet Slots!

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
So to see this in action with a staging slot, follow the following steps:
1. [Create an App Service](https://learn.microsoft.com/en-us/azure/app-service/quickstart-dotnetcore?tabs=net60&pivots=development-environment-azure-portal#publish-your-web-app) in Azure - you will need at least an S1 plan to get deployment slots
2. [Create configuration fields](https://learn.microsoft.com/en-us/azure/app-service/configure-common?tabs=portal#configure-app-settings) for each of these 4 config items (dbconn, colour, site and auth) as slot level config values except for Auth - scope that at the entire app service. Give them each production values like prod-dbconn, white, PROD and https://authendpoint
3. [Create a staging slot](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots#add-a-slot) for the app service and add config fields for each of the values except auth which should already be there. This time give them staging values like staing-dbconn, beige and STAGING
4. Clone or fork this repo in Github
5. [Setup the Deployment Center](https://learn.microsoft.com/en-us/azure/app-service/scripts/cli-deploy-github) to deploy the app from Github to the staging slot. You should see the Staging values in the app. MAke sure it is deployed to the Staging slot, not the Production slot
6. [Swap the slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots#swap-two-slots) - this should show the app in the Production slot, but with Production config values


I recently added a Docker file for building hte app as a docker container.
Simple run the following command to build and tag a container image of the app - this example tags the image fo rthe Github Container Registry and of course you would have had to login from Docker before you can execute and push this image to the registry:
``` 
docker build -f dockerfile . -t ghcr.io/sayedimac/slots:latest
docker push ghcr.io/sayedimac/slots:latest
```
This will publish the image to MY regsitry so you will have to replace the sayedimac part of the tag and the regsitry with your own orgsanisation name

Lastly I have created a yaml file you might use to publish this app to a Kubernetes Cluster (slots.yaml)
