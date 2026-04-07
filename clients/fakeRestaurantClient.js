export async function getRestaurants(){
  const response = await fetch(
    "https://fakerestaurantapi.runasp.net/api/Restaurant",
  ).then((res) => res.json());
  return response;
}

export async function getRestaurantById(id){
  const response = await fetch(
    `https://fakerestaurantapi.runasp.net/api/Restaurant/${id}`,
  ).then((res) => res.json());
  return response;
}

export async function getRestaurantMenu(id){
  const response = await fetch(
    `https://fakerestaurantapi.runasp.net/api/Restaurant/${id}/menu`,
  ).then((res) => res.json());
  return response;
}
