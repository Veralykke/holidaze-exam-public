import { useState, useEffect } from "react";
import { BASE_API } from "../../constants/api.js";
import { Link } from "react-router-dom";
import useAxios from "../../components/hooks/useAxios";

export default function HotelImages({ register }) {
  const [media, setMedia] = useState([]);

  const http= useAxios();

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await http.get("media")
        console.log("response", response);
        setMedia(response.data);
      } catch (error) {
          console.log(error);
      }
    }

    getMedia();

  }, []);

  return (
    <>
   <select name="featured_media" ref={register}>
       {media.map((media) => {
           return (
               <option key={media.id} value={media.id}>
                   {media.title.rendered}
               </option>
           );
       })}
   </select>
    </>
  );
}

