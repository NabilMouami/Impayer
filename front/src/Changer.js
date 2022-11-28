import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { useNavigate } from "react-router-dom";

export const Changer = () => {
  const load = useSelector((state) => state.load);
  const { cheque } = load;
  const navigate = useNavigate();

  const [post, setUser] = useState({
    intitule: cheque.intitule,
    nom: cheque.nom,
    nremise: cheque.nremise,
    montant: cheque.montant,
    verser: cheque.verser,
    datereception: "",
    dateecheance: "",
  });
  console.log(post);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...post,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/client/${cheque._id}`, post)
      .then(() => {
        toast.success("Success: Vous avez Changer quelque Chose!!.");
      });
      navigate("/")
  };
  return (
    <div>
      <div className="login validation">
        <h3>Changer:</h3>
        <form onSubmit={submitHandler}>
          <div>
            <label>Nom De Client:</label>
            <input
              type="text"
              name="intitule"
              placeholder="Nom De Client..."
              defaultValue={cheque.intitule}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Nom/Cheque:</label>
            <input
              type="text"
              name="nom"
              placeholder="Cheque De Client Principale..."
              defaultValue={cheque.nom}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Numero De Remise:</label>
            <input
              type="text"
              name="nremise"
              placeholder="Numero Remise..."
              defaultValue={cheque.nremise}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Montant:</label>
            <input
              type="text"
              name="montant"
              placeholder="Montant..."
              defaultValue={cheque.montant}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Versement:</label>
            <input
              type="text"
              defaultValue={cheque.verser}
              onChange={handleChange}
              placeholder="Versement ..."
              name="verser"
            />
          </div>
        

          <button type="submit" className="btn">
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};
