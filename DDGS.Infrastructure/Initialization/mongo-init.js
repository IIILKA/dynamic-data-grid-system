db.createUser(
    {
        user: "defaultuser",
        pwd: "Pa$$w0rd",
        roles: [
            {
                role: "readWrite",
                db: "DynamicDataGridSystemDb"
            }
        ]
    }
);
