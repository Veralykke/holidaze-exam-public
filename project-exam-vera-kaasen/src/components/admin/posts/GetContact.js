import { useState, useEffect,useContext } from "react";
import { Card } from "react-bootstrap";
import { BASE_API, CONTACT } from "../../../constants/api.js";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

export default function PostContact() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function fetchData() {
      const token = auth.jwt;
      try {
        axios
          .get(BASE_API + CONTACT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setPosts(response.data);
          })
          .catch((e) => {
            setError("An error occured");
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <Card.Body>
        <ul>
          {posts.map((post) => {
            return <li key={post.id}><hr></hr>{post.name}<hr></hr>{post.email}<hr></hr>{post.message}</li>
          })}
        </ul>
      </Card.Body>
    </>
  );
}
