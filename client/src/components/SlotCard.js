function SlotCard({ slot, onBook, loading }) {

  const date = new Date(slot.date).toDateString();

  return (
    <div className="col-md-4 mb-3">

      <div className="card shadow-sm">

        <div className="card-body">

          <h5 className="card-title">
            {date}
          </h5>

          <p className="card-text">
            ⏰ Time: {slot.time}
          </p>

          <p className="card-text">
            👥 Available: {slot.available}
          </p>

          <button
            className="btn btn-success"
            disabled={loading || slot.available === 0}
            onClick={() => onBook(slot._id)}
          >

            {slot.available === 0
              ? "Slot Full"
              : "Book Darshan"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default SlotCard;