namespace DDGS.Api.Error
{
    public static class ErrorMessages
    {
        public static class DataGrid
        {
            public const string NotExist = "Data grid does not exist";
        }

        public static class DataGridColumn
        {
            public const string NotExist = "Data grid column does not exist";
        }

        public static class DataGridRow
        {
            public const string NotExist = "Data grid row does not exist";

            public const string InvalidStructure = "Data grid row does not match the expected structure";

            public const string InvalidValue = "Invalid value for column '{0}'";
        }

        public static class General
        {
            public const string Unknown = "An unknown error occurred";
        }
    }
}
