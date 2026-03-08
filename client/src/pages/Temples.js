import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";

function Temples(){
 const [temples, setTemples] = useState([]);
 const [filteredTemples, setFilteredTemples] = useState([]);
 const [searchParams] = useSearchParams();
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchTemples = async () => {
   try {
    const res = await API.get("/temples");
    setTemples(res.data);
    setFilteredTemples(res.data);
   } catch (err) {
    console.log(err);
   } finally {
    setLoading(false);
   }
  };

  fetchTemples();
 }, []);

 useEffect(() => {
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  if (searchQuery) {
   const filtered = temples.filter(temple =>
    temple.name.toLowerCase().includes(searchQuery) ||
    temple.location.toLowerCase().includes(searchQuery) ||
    temple.description.toLowerCase().includes(searchQuery)
   );
   setFilteredTemples(filtered);
  } else {
   setFilteredTemples(temples);
  }
 }, [searchParams, temples]);

 const searchQuery = searchParams.get('search');

 return(
  <div className="container mt-4">
   <div className="row">
    <div className="col-12">
     <h2 className="text-center mb-4">
       {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Temples'}
     </h2>

     {searchQuery && (
       <div className="alert alert-info d-flex align-items-center" role="alert">
         <i className="fas fa-search me-2"></i>
         <div>
           Found {filteredTemples.length} temple{filteredTemples.length !== 1 ? 's' : ''} matching "{searchQuery}"
           {filteredTemples.length === 0 && (
             <span className="d-block mt-1">
               Try searching with different keywords or <Link to="/temples" className="alert-link">view all temples</Link>
             </span>
           )}
         </div>
       </div>
     )}
    </div>
   </div>

   {loading ? (
    <div className="text-center mt-5">
     <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading temples...</span>
     </div>
     <p className="mt-2 text-muted">Loading temples...</p>
    </div>
   ) : (
    <div className="row">
     {filteredTemples.length > 0 ? (
      filteredTemples.map(t => (
       <div key={t._id} className="col-lg-4 col-md-6 mb-4">
        <div className="card shadow-sm h-100 temple-card">
         {/* Temple Image */}
         <div className="card-img-container position-relative">
          <img
           src={t.coverImage }
           className="card-img-top"
           alt={t.name}
           style={{height:"200px", objectFit:"cover"}}
          />
          {/* Location Badge - positioned absolutely within image container */}
          <div className="temple-badge position-absolute bottom-0 start-0 m-3">
            <i className="fas fa-map-marker-alt me-1"></i>
            {t.location}
          </div>
         </div>

         <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title mb-2">{t.name}</h5>

          <p className="card-text text-muted flex-grow-1 mb-3">
           {t.description.length > 100 ? `${t.description.substring(0, 100)}...` : t.description}
          </p>

          

          <div className="mt-auto">
           <Link
            to={`/temple/${t._id}`}
            className="btn btn-primary w-100 position-relative"
            style={{ zIndex: 10 }}
           >
            <i className="fas fa-calendar-check me-1"></i>
            View Slots & Book
           </Link>
          </div>
         </div>
        </div>
       </div>
      ))
     ) : (
      <div className="col-12 text-center mt-5">
       <div className="empty-state">
        <i className="fas fa-search fa-3x text-muted mb-3"></i>
        <h4 className="text-muted">No temples found</h4>
        <p className="text-muted mb-4">
         {searchQuery ? `No temples match your search for "${searchQuery}"` : 'No temples are currently available'}
        </p>
        <Link to="/temples" className="btn btn-primary">
         <i className="fas fa-list me-1"></i>
         View All Temples
        </Link>
       </div>
      </div>
     )}
    </div>
   )}
  </div>
 );
}

export default Temples;