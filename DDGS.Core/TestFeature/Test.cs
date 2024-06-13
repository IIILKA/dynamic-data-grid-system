using DDGS.Core.Core;

namespace DDGS.Core.TestFeature
{
    public class Test : Entity
    {
        public required int Index { get; set; }

        public string? Login { get; set; }

        public string? Password { get; set; }

        public int Age { get; set; }

        public bool IsStudent { get; set; }
    }
}
