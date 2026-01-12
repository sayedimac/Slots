using System;

namespace slots.Models
{
    public class ConfigViewModel
    {
        public required string Site { get; set; }
        public required string DbConn { get; set; }
        public required string Colour { get; set; }
        public required string Auth { get; set; }
    }
}