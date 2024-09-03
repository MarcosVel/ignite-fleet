import { LocationObjectCoords, reverseGeocodeAsync } from "expo-location";

export async function getAddressLocation({
  latitude,
  longitude,
}: LocationObjectCoords) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.formattedAddress;
  } catch (error) {
    console.error("Error on getAddressLocation", error);
  }
}
