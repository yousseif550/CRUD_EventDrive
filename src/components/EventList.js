import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

export const EventList = ()  => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { events, removeEvent } = useContext(GlobalContext);
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyNSIsImp0aSI6IjZmZGM3NjQ3M2FkYjUyZTk1YzM4YmVjOTk4ZTZiNTMwOTRiNjBkZDA2OTA1MjUxMmQ0MjYwMDRkMjQyNmIyN2IxZDA2ZmE3ZDAwYzNkZDk1IiwiaWF0IjoxNjI5NjMzMDgzLCJuYmYiOjE2Mjk2MzMwODMsImV4cCI6MTY2MTE2OTA4Mywic3ViIjoiMTI0Iiwic2NvcGVzIjpbXX0.PaBXjNGAfAqX65FRrUSn1NhoOhd7FydvQbDuNCY-_RcBOhkE0jVR1PV5yz3UFHV_Kfv0mbpg1TuPJ1Lh3Q7LDCReGbOZo1AggplFENSHydaMv87owNg1530DqLsk5koRoDD-BqNAGF-oRuVm0k4zRXhjTq3uONQIqH-CW4URTbBcvpaVhACAy9VbVePkG9QNXxonDH-ANDdDMCaOO5WShGgsc2AweqDp75jVKBIpVPVntDZiDulobtMYzLrEz-pf_KEEKnlvzFJBU9RgWn8Ozipmkq7ZX5XMNkB7HYdy5CjHHt0vh1SclCWhZfUCFwzMmeUEvMi_0bcxuOOdXWxQ5XN5IJr-rvBIJtIw0B7CeIk4ybsqxSyRm723PgNfIhyaDRBTdtM3n7n8TbhQxrCts-8_V_Hk_GCmXGgMrfhvH0UnrQx2d-g0Wdl1X8yN_9YgZdx89ZTXDd7HNPo-N-xNfRx9UpYZY8bi-6uHeO6EBEWJlaEoj1TpEcRMCR-1sP_sZPRbtf3EhG7k9GYiwJsF5wt3EtvOxIIuWpQAgAmVeEb4n36eZSIrtphbnHuYllB1k4qoqcWVA5TV7ZgZuWAj6pI6G28DesHQu25FT-Eo8wwB__B9CDrnPi03GxYgZ04NcyFzbfW7UEtst2k-EqG_jG_WcSSeINzpPdNivgkkP40',
      'X-Use-External-Id': 0
    },
    body: JSON.stringify({ title: 'React POST Request Example' })
};

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch('https://api.dev.eventdrive.com/public/v1/events/')
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
        },
        
      );
   
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ListGroup className="mt-4">
        {events.length > 0 ? (
          <>
            {events.map(event => (
              <ListGroupItem className="d-flex justify-content-between" key={event.id}>
                <div className="p-2">
                  <strong> {event.name}</strong>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to={`/edit/${event.id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                  <Button onClick={() => removeEvent(event.id)} color="danger">Delete</Button>
                </div>
              </ListGroupItem>
            ))}
          </>
        ) : (
            <h4 className="text-center">No Events</h4>
          )}
      </ListGroup>
    );
  }
}


// export const EventList = () => {
//   const { events, removeEvent } = useContext(GlobalContext);

//   return (
//     <ListGroup className="mt-4">
//       {events.length > 0 ? (
//         <>
//           {events.map(event => (
//             <ListGroupItem className="d-flex" key={event.id}>
//               <strong>{event.name}</strong>
//               <p> {event.last_dat}</p>

//               <div className="ml-auto">
//                 <Link to={`/edit/${event.id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
//                 <Button onClick={() => removeEvent(event.id)} color="danger">Delete</Button>
//               </div>
//             </ListGroupItem>
//           ))}
//         </>
//       ) : (
//           <h4 className="text-center">No Events</h4>
//         )}
//     </ListGroup>
//   )
// }
