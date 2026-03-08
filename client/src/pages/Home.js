import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">🕉️ DarshanEase</h1>
          <p className="lead mb-5">Online Temple Darshan Booking System</p>

          

           

          <div className="mt-5">
            <Link to="/temples" className="btn btn-success btn-lg">Browse Available Temples</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;