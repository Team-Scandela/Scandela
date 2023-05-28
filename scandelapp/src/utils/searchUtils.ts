/*  Il faudra ici faire les appels a la base de données pour chercher tel
  lampadaire ou telle rue */

export const handleSearchUtils = (value: string, lat: number, setLat: React.Dispatch<React.SetStateAction<number>>, lng: number, setLng: React.Dispatch<React.SetStateAction<number>>, zoom: number, setZoom: React.Dispatch<React.SetStateAction<number>>): void => {
  console.log(value);
  if (value !== "") {
    if (value === "lamp" /* EPNA035100 */) {
      setLat(47.19615178966206);
      setLng(-1.59728986316391);
      setZoom(17);
    }
  } else {
    // default coordinate of the city
    setLat(47.21);
    setLng(-1.553621);
    setZoom(13);
  }
};
