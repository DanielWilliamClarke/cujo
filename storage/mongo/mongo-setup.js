db.createUser(
  {
      user: "external",
      pwd: "readOnly",
      roles: ["read"]
  })

db.createCollection("cvData")
db.cvData.insertOne({
  about: "#I am the title\n**I am some markdown content**"
})