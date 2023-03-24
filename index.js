const ROCKETS_URL = "https://api.spacexdata.com/v3/rockets";

const rocketsContainer = document.querySelector(".rockets");

const fetchRockets = async () => {
  const response = await fetch(ROCKETS_URL);
  console.log(response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const rockets = await response.json();
  console.log(rockets);
  return rockets;
};

fetchRockets().then((rockets) => {
  console.log(rockets);
  rocketsContainer.innerHTML = rockets
    .map((rocket) => {
      return `<li>${rocket.rocket_name}</li>`;
    })
    .join("");
});
