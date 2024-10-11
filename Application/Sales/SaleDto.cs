namespace Application.Sales
{
    public class SaleDto
    {
        public Guid Id { get; set; }
        public string TyreName { get; set; }
        public int QuantitySold { get; set; }
        public DateTime SaleDate { get; set; }
        public string ClientName { get; set; }
    }
}