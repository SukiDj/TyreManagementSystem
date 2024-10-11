using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Tyres.Any())
            {
                var tyres = new List<Tyre>
                {
                    new Tyre
                    {
                        Code = Guid.NewGuid(),
                        Name = "Continental EcoContact",
                        Type = "Summer",
                        Size = "205/55 R16",
                        Brand = "Continental",
                        Price = 90.5,
                        ProductionDate = DateTime.UtcNow.AddMonths(-3)
                    },
                    new Tyre
                    {
                        Code = Guid.NewGuid(),
                        Name = "Michelin Pilot Sport",
                        Type = "All-Season",
                        Size = "225/45 R17",
                        Brand = "Michelin",
                        Price = 120.0,
                        ProductionDate = DateTime.UtcNow.AddMonths(-2)
                    },
                    new Tyre
                    {
                        Code = Guid.NewGuid(),
                        Name = "Pirelli Cinturato",
                        Type = "Winter",
                        Size = "195/65 R15",
                        Brand = "Pirelli",
                        Price = 85.0,
                        ProductionDate = DateTime.UtcNow.AddMonths(-1)
                    },
                    new Tyre
                    {
                        Code = Guid.NewGuid(),
                        Name = "Goodyear Eagle F1",
                        Type = "Performance",
                        Size = "235/40 R18",
                        Brand = "Goodyear",
                        Price = 150.0,
                        ProductionDate = DateTime.UtcNow.AddMonths(-4)
                    },
                    new Tyre
                    {
                        Code = Guid.NewGuid(),
                        Name = "Bridgestone Turanza",
                        Type = "Touring",
                        Size = "215/60 R16",
                        Brand = "Bridgestone",
                        Price = 110.0,
                        ProductionDate = DateTime.UtcNow.AddMonths(-5)
                    }
                };

                await context.Tyres.AddRangeAsync(tyres);
                await context.SaveChangesAsync();
            }
        }
    }
}
