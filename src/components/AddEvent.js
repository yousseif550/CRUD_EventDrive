import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddEvent = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const { addEvent } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: uuid(),
      name,
      first_date, 
      last_date
    }
    addEvent(newEvent);
    history.push("/");
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const [first_date, setFirstDate] = useState('');
  const [last_date, setLastDate] = useState('');
  const requestOptions = {
    method: 'POST',
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
    fetch('https://api.dev.eventdrive.com/public/v1/events')
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
      <div class="container">
        <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Event</Label>
          <Input type="text" value={name} onChange={onChangeName} name="name" placeholder="Nom Event" required></Input>
          <div class="row">
            <div class="col">
            <Label>Début de l'Event</Label>
            </div> 
            <div class="col">
            <Label>Fin de l'Event</Label>
            </div> 
          </div>
          <div class="d-flex justify-content-around">
            <DatePicker selected={first_date} onChange={(date) => setFirstDate(date)} name="first_date" placeholder="Enter Début de l'Event" required/>
            <DatePicker selected={last_date} onChange={(date) => setLastDate(date)} name="last_date" placeholder="Enter fin de l'Event" required/>
          </div> 
          </FormGroup>
          <div class="row">
            <div class="col">
            <Label> </Label>
            </div> 
          </div>
        <Button type="submit">Submit</Button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </Form>
    </div>
    )
  }
}
