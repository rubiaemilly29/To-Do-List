import React, { useState } from 'react';
import axios from 'axios';
/* import { useHistory } from 'react-router-dom';
 */import { Container, Row, Stack, Col, Button } from 'react-bootstrap';

function Task(listpro) {
  const { list, settask } = listpro;
  const [value, setvalue] = useState(list.task);
  const [edit, setedit] = useState(true);
  console.log(value);
  async function deleteList(id) {
    await axios.delete(`http://localhost:3003/listTask/${id}`).then((response) => {
      console.log(response.data);
    });
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
  return (
    <Container>
      <Row>
        <Col>
          <input
            type="text"
            className="form-control"
            value={ value }
            onChange={ (event) => setvalue(event.target.value) }
            readOnly={ edit }
          />
        </Col>
        <Col>
          <Stack direction="horizontal" gap={ 2 }>
            <Button
              variant="outline-primary"
              id="button-addon2"
              size="sm"
              onClick={ () => (!edit ? setedit(true) : setedit(false)) }
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
        </Col>
      </Row>
    </Container>
  );
}

export default Task;
