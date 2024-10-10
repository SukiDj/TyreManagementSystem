namespace Domain
{
    public class QualitySupervisor : User
    {
        public Guid ProductionId { get; set; }
        public Production Production { get; set; }
    }
}