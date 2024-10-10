namespace Domain
{
    public class Sale
    {
        public Guid Id { get; set; }
        public DateTime SaleDate { get; set; }
        public Tyre Tyre { get; set; }
        public Client Client { get; set; }
    }
}