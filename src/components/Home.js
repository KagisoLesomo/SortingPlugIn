import { useNavigate } from "react-router-dom";

let Home = () => {
  const navigate = useNavigate()

  return (
        <div>
          Choose the type of practice you want to engage in.
          <div typeof="inline">
            <button onClick={() => navigate('Question_1')}>Questions</button>
            <button onClick={() => navigate('Visualizer')}>Visualizer</button>
          </div>
        </div>
  )
};

export default Home;
