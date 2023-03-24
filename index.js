const ROCKETS_URL = "https://api.spacexdata.com/v3/rockets";

const rocketsContainer = document.querySelector(".rockets");
const rocketDetailsContainer = document.querySelector(
  ".rocket-details"
);

const fetchRockets = async () => {
  const response = await fetch(ROCKETS_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const rockets = await response.json();
  return rockets;
};

fetchRockets().then((rockets) => {
  rocketsContainer.innerHTML = rockets
    .map((rocket) => {
      return `<li data-rocket-id="${rocket.rocket_id}">${rocket.rocket_name}</li>`;
    })
    .join("");
  console.log(rockets);
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
    const rocketId = event.target.dataset.rocketId;
    const rocket = await fetchSingleRocket(rocketId);

    const rocketImages = rocket.flickr_images
      .map((image) => {
        return `<img src="${image}" />`;
      })
      .join("");

    rocketDetailsContainer.innerHTML = `
    <h2>${rocket.rocket_name}</h2>
    <p>Height: ${Object.entries(rocket.height)}</p>
    <p>Mass: ${Object.entries(rocket.mass)}</p>
    <p>First Flight: ${rocket.first_flight}</p>
    <p>${rocket.description}</p>
    <div class="rocket-images">${rocketImages}</div>
    `;
  }
);
