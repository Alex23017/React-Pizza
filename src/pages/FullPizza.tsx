import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.fullpiza.css";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get("https:/684a9f71165d05c5d35998cf.mockapi.io/items/" + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <div>"Загрузка..."</div>;
  }
  return (
    <div className="container container-full-pizza">
      <div className="container-column_1">
        <img src={pizza.imageUrl} alt="" />
        <div className="container-title"></div>
      </div>

      <div className="container-column_2">
        <h2>
          <strong>Пицца {pizza.title}</strong>
        </h2>
        <h2>Описание:</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, beatae, enim ex est,
          mollitia eius ipsum incidunt optio debitis minima error accusamus excepturi inventore
          magnam voluptates eaque itaque obcaecati. Deserunt? Nulla, distinctio nobis natus eaque
          voluptate voluptas dolore vel ipsum et. Provident, odit delectus officiis nulla accusamus
          adipisci tempore dolore est cum illo , nemo ea officia id praesentium optio rem!
        </p>
      </div>
    </div>
  );
};
export default FullPizza;
