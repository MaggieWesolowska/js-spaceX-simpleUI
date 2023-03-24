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
  rocketsContainer.innerHTML = rockets
    .map((rocket) => {
      return `<li data-rocket-id="${rocket.rocket_id}">${rocket.rocket_name}</li>`;
    })
    .join("");
});

const fetchSingleRocket = async (rocketId) => {
  const response = await fetch(
    `${ROCKETS_URL}/${rocketId}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const singleRocket = await response.json();
  return singleRocket;
};

rocketsContainer.addEventListener(
  "click",
  async (event) => {
    console.log(event.target.dataset.rocketId);
    const rocketId = event.target.dataset.rocketId;
    const rocket = await fetchSingleRocket(rocketId);
    console.log(rocket);
  }
);
