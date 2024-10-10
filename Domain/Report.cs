namespace Domain
{
    public class Report
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime GeneratedDate { get; set; }
        public string Details { get; set; }
        public BusinessUnitLeader BusinessUnitLeader { get; set; }
    }
}