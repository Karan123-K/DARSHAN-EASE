import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function Organizer() {
  const { hasRole, user } = useContext(AuthContext);

  const [temples, setTemples] = useState([]);
  const [editingTemple, setEditingTemple] = useState(null);
  const [isAddingTemple, setIsAddingTemple] = useState(false);

  // Add form state
  const [addName, setAddName] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImage, setAddImage] = useState("");
  const [addSlots, setAddSlots] = useState("");
  const [addSeats, setAddSeats] = useState("");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editSlots, setEditSlots] = useState("");
  const [editSeats, setEditSeats] = useState("");

  // Slots management state
  const [templeSlots, setTempleSlots] = useState({});
  const [managingSlotsFor, setManagingSlotsFor] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [slotCapacity, setSlotCapacity] = useState("");
  const [slotDate, setSlotDate] = useState("");

  const fetchTemples = async () => {
    try {
      const res = await API.get("/temples");
      // Filter temples by current organizer
      const organizerTemples = res.data.filter(
        (temple) => temple.organizerId === user?.id
      );
      setTemples(organizerTemples);
      // Fetch slots for all temples
      organizerTemples.forEach((temple) => {
        fetchSlotsForTemple(temple._id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSlotsForTemple = async (templeId) => {
    try {
      const res = await API.get(`/slots/${templeId}`);
      setTempleSlots((prev) => ({
        ...prev,
        [templeId]: res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTemples();
    }
  }, [user?.id]);

  const startEditing = (temple) => {
    setEditingTemple(temple._id);
    setEditName(temple.name);
    setEditLocation(temple.location);
    setEditDescription(temple.description);
    setEditImage(temple.coverImage || "");
    setEditSlots(temple.slotsAvailable || 0);
    setEditSeats(temple.numberOfSeats || 0);
  };

  const cancelEditing = () => {
    setEditingTemple(null);
    setEditName("");
    setEditLocation("");
    setEditDescription("");
    setEditImage("");
    setEditSlots("");
    setEditSeats("");
  };

  const cancelAdding = () => {
    setIsAddingTemple(false);
    setAddName("");
    setAddLocation("");
    setAddDescription("");
    setAddImage("");
    setAddSlots("");
    setAddSeats("");
  };

  const createTemple = async (e) => {
    e.preventDefault();

    try {
      await API.post("/temples", {
        name: addName,
        location: addLocation,
        description: addDescription,
        coverImage: addImage,
        slotsAvailable: parseInt(addSlots) || 0,
        numberOfSeats: parseInt(addSeats) || 0,
        organizerId: user?.id
      });

      cancelAdding();
      fetchTemples();
      alert("Temple added successfully!");
    } catch (error) {
      console.error("Error adding temple:", error);
      alert("Failed to add temple");
    }
  };

  const updateTemple = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/temples/${editingTemple}`, {
        name: editName,
        location: editLocation,
        description: editDescription,
        coverImage: editImage,
        slotsAvailable: parseInt(editSlots) || 0,
        numberOfSeats: parseInt(editSeats) || 0
      });

      cancelEditing();
      fetchTemples();
      alert("Temple updated successfully!");
    } catch (error) {
      console.error("Error updating temple:", error);
      alert("Failed to update temple");
    }
  };

  const createSlot = async (e, templeId) => {
    e.preventDefault();

    if (!slotTime || !slotCapacity || !slotDate) {
      alert("Please fill in all slot fields");
      return;
    }

    try {
      await API.post("/slots", {
        temple: templeId,
        date: slotDate,
        time: slotTime,
        capacity: parseInt(slotCapacity),
      });

      alert("Slot added successfully!");
      setSlotTime("");
      setSlotCapacity("");
      setSlotDate("");
      fetchSlotsForTemple(templeId);
    } catch (error) {
      console.error("Error creating slot:", error);
      alert("Failed to add slot");
    }
  };

  const deleteSlot = async (slotId, templeId) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) {
      return;
    }

    try {
      await API.delete(`/slots/${slotId}`);
      alert("Slot deleted successfully!");
      fetchSlotsForTemple(templeId);
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete slot");
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

  if (!hasRole("organizer")) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Only organizers can access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Temple Management</h2>
          <p className="text-muted">Manage your temples, slots, and seating capacity</p>
        </div>
        {!isAddingTemple && (
          <button
            className="btn btn-success btn-lg"
            onClick={() => setIsAddingTemple(true)}
          >
            <i className="fas fa-plus me-2"></i>Add New Temple
          </button>
        )}
      </div>

      {/* ADD NEW TEMPLE FORM */}
      {isAddingTemple && (
        <div className="card shadow-sm mb-4 border-success border-3">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Add New Temple</h5>
          </div>
          <div className="card-body">
            <form onSubmit={createTemple}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Temple Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter temple name"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Address *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter complete address"
                    value={addLocation}
                    onChange={(e) => setAddLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description *</label>
                <textarea
                  className="form-control"
                  placeholder="Enter temple description (about history, significance, etc.)"
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Enter temple image URL"
                  value={addImage}
                  onChange={(e) => setAddImage(e.target.value)}
                />
                {addImage && (
                  <small className="text-muted d-block mt-2">
                    Preview: <img src={addImage} alt="preview" style={{ maxHeight: "100px", marginTop: "5px" }} onError={(e) => e.target.style.display = "none"} />
                  </small>
                )}
              </div>

              <div className="row">
                

                
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-success btn-lg">
                  <i className="fas fa-check me-2"></i>Add Temple
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={cancelAdding}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEMPLES LIST */}
      <div className="row">
        {temples.map((temple) => (
          <div key={temple._id} className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                {editingTemple === temple._id ? (
                  // Edit Form
                  <form onSubmit={updateTemple}>
                    <h5 className="card-title mb-3">Edit Temple Details</h5>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Temple Name *</label>
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
                      <label className="form-label fw-bold">Address *</label>
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
                      <label className="form-label fw-bold">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="Image URL"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                      />
                    </div>


                    <div className="mb-3">
                      <label className="form-label fw-bold">Description *</label>
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
                        <i className="fas fa-save me-2"></i>Save Changes
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
                    {temple.coverImage && (
                      <img
                        src={temple.coverImage}
                        alt={temple.name}
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: "250px", width: "100%", objectFit: "cover" }}
                      />
                    )}

                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{temple.name}</h5>
                      <div className="badge bg-primary">Active</div>
                    </div>

                    <p className="text-muted mb-3">
                      <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                      {temple.location}
                    </p>

                    <p className="card-text text-muted mb-3">{temple.description}</p>

                    <hr className="my-3" />

                    {/* SLOT MANAGEMENT */}
                    <div className="mb-3">
                      {managingSlotsFor === temple._id ? (
                        <div className="bg-light p-3 rounded mb-3">
                          <h6 className="mb-3">
                            <i className="fas fa-plus-circle me-2"></i>Add Time Slot
                          </h6>
                          <form onSubmit={(e) => createSlot(e, temple._id)}>
                            <div className="mb-2">
                              <label className="form-label small fw-bold">Date *</label>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                value={slotDate}
                                onChange={(e) => setSlotDate(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <label className="form-label small fw-bold">Time *</label>
                              <input
                                type="time"
                                className="form-control form-control-sm"
                                value={slotTime}
                                onChange={(e) => setSlotTime(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label small fw-bold">Capacity (Seats) *</label>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="Number of seats"
                                value={slotCapacity}
                                onChange={(e) => setSlotCapacity(e.target.value)}
                                min="1"
                                required
                              />
                            </div>
                            <div className="d-flex gap-2">
                              <button type="submit" className="btn btn-sm btn-success flex-grow-1">
                                <i className="fas fa-check me-1"></i>Add Slot
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary flex-grow-1"
                                onClick={() => {
                                  setManagingSlotsFor(null);
                                  setSlotTime("");
                                  setSlotCapacity("");
                                  setSlotDate("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-info w-100 mb-3"
                          onClick={() => setManagingSlotsFor(temple._id)}
                        >
                          <i className="fas fa-plus me-1"></i>Add Slot
                        </button>
                      )}
                    </div>

                    {/* DISPLAY SLOTS */}
                    {templeSlots[temple._id] && templeSlots[temple._id].length > 0 && (
                      <div className="mb-3">
                        <h6 className="mb-2 fw-bold">
                          <i className="fas fa-list me-2"></i>Available Slots ({templeSlots[temple._id].length})
                        </h6>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          {templeSlots[temple._id].map((slot) => (
                            <div key={slot._id} className="bg-light p-2 rounded mb-2 d-flex justify-content-between align-items-center">
                              <div>
                                <p className="mb-0 small">
                                  <strong>{new Date(slot.date).toDateString()}</strong> at{" "}
                                  <strong>{slot.time}</strong>
                                </p>
                                <small className="text-muted">{slot.capacity} seats</small>
                              </div>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteSlot(slot._id, temple._id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <hr className="my-2" />

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary flex-grow-1"
                        onClick={() => startEditing(temple)}
                      >
                        <i className="fas fa-edit me-2"></i>Edit Temple
                      </button>
                      <button
                        className="btn btn-danger flex-grow-1"
                        onClick={() => deleteTemple(temple._id)}
                      >
                        <i className="fas fa-trash me-2"></i>Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {temples.length === 0 && !isAddingTemple && (
        <div className="text-center mt-5 py-5">
          <i className="fas fa-temple text-muted" style={{ fontSize: "4rem" }}></i>
          <p className="text-muted mt-3 mb-3">No temples added yet</p>
          <button
            className="btn btn-success btn-lg"
            onClick={() => setIsAddingTemple(true)}
          >
            <i className="fas fa-plus me-2"></i>Add Your First Temple
          </button>
        </div>
      )}
    </div>
  );
}

export default Organizer;
