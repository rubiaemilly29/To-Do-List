import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Stack, Button } from 'react-bootstrap';
import Task from './Task';

export default function TaskList() {
  const [task, settask] = useState([]);
  const [value, setvalue] = useState('');

  async function createlist() {
    await axios.post('http://localhost:3003/listTask', {
      task: value,
      status: 'pendente',
    }).then((res) => console.log(res));
    await axios
      .get('http://localhost:3003/listTask/searchCreationOrder/ascending')
      .then((response) => {
        console.log(response);
        settask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get('http://localhost:3003/listTask/searchCreationOrder/ascending')
      .then((response) => {
        console.log(response);
        settask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <h3>Lista De Tarefas</h3>
      <Stack direction="horizontal" gap={ 2 }>
        <input
          type="text"
          className="form-control"
          value={ value }
          onChange={ (event) => setvalue(event.target.value) }
        />
        <Button
          as="input"
          type="button"
          value="Adicionar"
          onClick={ () => createlist() }
        />
      </Stack>
      <ul>
        {task.map((list, index) => (
          <Task list={ list } key={ index } settask={ settask } />
        ))}
      </ul>
    </Container>
  );
}
