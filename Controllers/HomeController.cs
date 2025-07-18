using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using slots.Models;

namespace slots.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IConfiguration _configuration;

    public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }
    public IActionResult Index()
    {

        var configModel = new ConfigViewModel
        {
            Site = _configuration["site"] ?? "Default Site",
            DbConn = _configuration["dbconn"] ?? "Default Connection String",
            Colour = _configuration["colour"] ?? "Default Colour",
            Auth = _configuration["auth"] ?? "Default Auth"
        };

        return View(configModel);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}