import axios from "axios";

export const getCoordinates = async (address: string) => {
  const apiKey: string = String(process.env.GEOCODE_API_KEY);

  const url = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data[0].display_name) {
      return {
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      };
    } else {
      console.log("Address not found");
    }
  } catch (error) {
    console.error(error);
  }
};
