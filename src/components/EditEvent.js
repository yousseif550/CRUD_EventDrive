import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const EditEvent = (props) => {
  const { editEvent, events } = useContext(GlobalContext);
  const [selectedEvent, setSelectedEvent] = useState({
    id: '',
    name: '',
  })
  const history = useHistory();
  const currentEventId = props.match.params.id;

  useEffect(() => {
    const eventId = currentEventId;
    const selectedEvent = events.find(event => event.id === eventId);
    setSelectedEvent(selectedEvent);
  }, [currentEventId, events])

  const onChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editEvent(selectedEvent);
    history.push("/")
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" value={selectedEvent.name} onChange={onChange} name="name" placeholder="Enter event" required></Input>
      </FormGroup>
      <Button type="submit">Edit Name</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}
