namespace DDGS.Infrastructure.PostgresDb
{
    public static class PostgresDbFunctionNames
    {
        public const string GenerateUUIDv7 = "uuid_generate_v7";
        public const string TimeStampWithTimeZoneToUUIDv7 = "uuid_timestamptz_to_v7";
        public const string UUIDv7ToTimeStampWithTimeZone = "uuid_v7_to_timestamptz";
    }
}
