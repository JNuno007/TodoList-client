import axios from "axios";

export let AuthHelper = {
  isAuthenticated: false,
  authenticate: function(cb) {
    let token = localStorage.getItem("JWT");

    if(token){
      axios
      .get(window.origin + "/api/isUserLogged", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        if (res.status === 200) {
          this.isAuthenticated = true;
          cb(true);
        } else {
          this.isAuthenticated = false;
          cb(false);
        }
      });
    }else{
      this.isAuthenticated = false;
      cb(false);
    }
  }
};