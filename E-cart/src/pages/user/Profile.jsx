import { Link } from "react-router-dom"


function Profile() {
  return (
    <div>
      <div>
        Profile Picture
        <img className="rounded-full"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNRvTySGiqhVyuwBnAQ0GUhl84SQ7fepALDk38Z1EVVDj7uO6EKhpyMvP8C44Mh119NWE&usqp=CAU" alt="Profile" />
      </div>


      <div>

        <Link to='/profile/update' >
        <button>

        update password
        </button>
        
        </Link>
      </div>


      <div>
        Orders
      </div>

      <div>
        wishList
      </div>

      <div>
        History
      </div>
    </div>
  )
}

export default Profile
