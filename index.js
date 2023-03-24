const ROCKETS_URL = "https://api.spacexdata.com/v3/rockets";

const fetchRockets = () => {
  fetch(ROCKETS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

fetchRockets();
