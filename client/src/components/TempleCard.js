import { Link } from "react-router-dom";

function TempleCard({ temple }) {

  return (
    <div className="col-md-4 mb-4">

      <div className="card h-100 shadow-sm">

        <div className="card-body">

          <h5 className="card-title">
            {temple.name}
          </h5>

          <p className="card-text">
            📍 {temple.location}
          </p>

          <p className="card-text">
            {temple.description}
          </p>

          <Link
            to={`/temple/${temple._id}`}
            className="btn btn-primary"
          >
            View Slots
          </Link>

        </div>

      </div>

    </div>
  );
}

export default TempleCard;