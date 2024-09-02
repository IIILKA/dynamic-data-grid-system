db.createUser(
    {
        user: "defaultuser",
        pwd: "Pa$$w0rd",
        roles: [
            {
                role: "readWrite",
                db: "DynamicDataGridSystemMongoDb"
            },
            {
                role: "clusterAdmin", db: "admin"
            },
            {
                role: "root", db: "admin"
            }
        ]
    }
);
