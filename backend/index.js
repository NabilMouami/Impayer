const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));
const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "123456789",
  database: "impayer",
  dateStrings: true,
  insecureAuth: true,
});

//create a new employee
app.post("/client", (req, res) => {
  console.log(req.body);
  const nom = req.body.nom;
  const intitule = req.body.intitule;
  const type = req.body.type;
  const nremise = req.body.nremise;
  const montant = req.body.montant;
  const verser = req.body.verser;
  const dateretour = req.body.dateretour;
  const dateecheance = req.body.dateecheance;
  db.query(
    "INSERT INTO client (nom, intitule, type, nremise, montant, verser, dateretour,dateecheance) VALUES (?,?,?,?,?,?,?,?)",
    [nom, intitule, type, nremise, montant, verser, dateretour, dateecheance],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/client", (req, res) => {
  db.query(
    "SELECT id,nom,intitule,type,nremise,montant,verser,dateretour,dateecheance,(montant-verser) as reste FROM client",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//delete a Collab
app.delete("/client/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM client WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.patch("/client/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const { intitule, nom, montant, verser,nremise,dateretour,dateecheance } = req.body;

    db.query(
        "UPDATE client SET nom = ?, intitule = ?, montant = ?, verser = ?, nremise = ?,dateretour = ?,dateecheance = ? WHERE id = ?",
        [nom, intitule, montant, verser, nremise,dateretour,dateecheance, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
  })
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server is running ...");
});
