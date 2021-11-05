import React, { useState } from 'react';
import axios from 'axios';
/* import { useHistory } from 'react-router-dom';
 */import {
  Container, Row, Stack, Col, Button,
} from 'react-bootstrap';

function Task(listpro) {
  const { list, getList, task } = listpro;
  const [value, setvalue] = useState(list.task);
  const [edit, setedit] = useState(true);

  async function deleteList(ide) {
    await axios.delete(`http://localhost:3003/listTask/${ide}`);
    getList();
    console.log(task);
  }

  async function updateList(id) {
    await axios.put(`http://localhost:3003/listTask/${id}`, {
      task: value,
      status: 'pendente',
    }).then((res) => console.log(res)).catch((error) => {
      getList();
      console.log(error.message);
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <input
            type="text"
            className="form-control"
            id="inputGroup-sizing-lg"
            value={ value }
            onChange={ (event) => setvalue(event.target.value) }
            readOnly={ edit }
          />

        </Col>
        <Col>
          <Stack direction="horizontal" gap={ 2 }>

            {' '}
            {list.status}
            <Button
              variant="outline-primary"
              id="button-addon2"
              size="sm"
              onClick={ () => {
                if (!edit) {
                  setedit(true);
                  console.log('tchau');
                  updateList(list.id);
                } else {
                  setedit(false);
                  console.log('tchau');
                }
              } }
            >
              Editar
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={ () => deleteList(list.id) }
            >
              Delete
            </Button>

          </Stack>

          {' '}

        </Col>
      </Row>
    </Container>
  );
}

export default Task;
