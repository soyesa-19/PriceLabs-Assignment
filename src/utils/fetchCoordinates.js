import axios from "axios";
import { GEOCODING_API_KEY, CORDINATES_URL } from "./constants";

export const fetchCoordinates = async (city) => {
  try {
    const response = await axios.get(CORDINATES_URL, {
      params: {
        q: city,
        key: GEOCODING_API_KEY,
      },
    });
    console.log(response);
    const lat = response?.data?.results[0]?.geometry?.lat;
    const lng = response?.data?.results[0]?.geometry?.lng;
    console.log(lat, lng);

    return { lat, lng };
  } catch (error) {
    console.log(error);
    return;
  }
};
