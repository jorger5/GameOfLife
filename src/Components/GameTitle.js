import React from 'react';
import {Col, Row} from 'reactstrap';


export default function GameTitle() {
    return (
        <Col>
            <Col>
                <Row className='mt-5'>
                <h5>Bienvenido al</h5>
                </Row>
                <Row>
                <h2>Juego de la vida</h2>
                </Row>
            </Col>
        </Col>
    )
}
