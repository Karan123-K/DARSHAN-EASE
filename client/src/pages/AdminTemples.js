import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function AdminTemples() {
  const { hasRole } = useContext(AuthContext);

  const [temples, setTemples] = useState([]);
  const [editingTemple, setEditingTemple] = useState(null);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editSlots, setEditSlots] = useState("");

  const fetchTemples = async () => {
    const res = await API.get("/temples");
    setTemples(res.data);
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  const startEditing = (temple) => {
    setEditingTemple(temple._id);
    setEditName(temple.name);
    setEditLocation(temple.location);
    setEditDescription(temple.description);
    setEditImage(temple.coverImage || "");
    setEditSlots(temple.slotsAvailable || 0);
  };

  const cancelEditing = () => {
    setEditingTemple(null);
    setEditName("");
    setEditLocation("");
    setEditDescription("");
    setEditImage("");
    setEditSlots("");
  };

  const updateTemple = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/temples/${editingTemple}`, {
        name: editName,
        location: editLocation,
        description: editDescription,
        coverImage: editImage,
        slotsAvailable: parseInt(editSlots) || 0
      });

      cancelEditing();
      fetchTemples();
      alert("Temple updated successfully!");
    } catch (error) {
      console.error("Error updating temple:", error);
      alert("Failed to update temple");
    }
  };

  const deleteTemple = async (templeId) => {
    if (!window.confirm("Are you sure you want to delete this temple?")) {
      return;
    }

    try {
      await API.delete(`/temples/${templeId}`);
      fetchTemples();
      alert("Temple deleted successfully!");
    } catch (error) {
      console.error("Error deleting temple:", error);
      alert("Failed to delete temple");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Temple Management</h2>
      <p className="text-muted">Edit temple details and manage available slots</p>

      {hasRole("admin") || hasRole("organizer") ? (
        <div>
          <div className="row">
            {temples.map((temple) => (
              <div key={temple._id} className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    {editingTemple === temple._id ? (
                      // Edit Form
                      <form onSubmit={updateTemple}>
                        <h5 className="card-title mb-3">Edit Temple</h5>

                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Temple Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Location/Address"
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="url"
                            className="form-control"
                            placeholder="Image URL"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Available Slots"
                            value={editSlots}
                            onChange={(e) => setEditSlots(e.target.value)}
                            min="0"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows="3"
                            required
                          />
                        </div>

                        <div className="d-flex gap-2">
                          <button type="submit" className="btn btn-success">
                            Update Temple
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Display Mode
                      <>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title">{temple.name}</h5>
                          <div>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => startEditing(temple)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteTemple(temple._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <p className="text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {temple.location}
                        </p>

                        <p className="mb-2">
                          <strong>Available Slots:</strong> {temple.slotsAvailable || 0}
                        </p>

                        {temple.coverImage && (
                          <img
                            src={temple.coverImage}
                            alt={temple.name}
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }}
                          />
                        )}

                        <p className="card-text">{temple.description}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {temples.length === 0 && (
            <div className="text-center mt-5">
              <p className="text-muted">No temples found. Please contact administrator to add temples.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="alert alert-warning">
          Only admins and organizers can manage temples.
        </div>
      )}
    </div>
  );
}

export default AdminTemples;