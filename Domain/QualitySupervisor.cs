namespace Domain
{
    public class QualitySupervisor : User
    {
        public ICollection<Production> Production { get; set; }
    }
}