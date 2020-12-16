import React from 'react';
import {Col, Row} from 'reactstrap';


export default function GameStatus(props) {
    const { playStatus, generationStatus, autoTimeStatus, statusType } = props;
    return (
        <>
        <Col>
                <p className={statusType}>Turno: {generationStatus}</p>
        </Col>
        <Col>
            <Row>
                <p>Juego {playStatus ? 'iniciado' : 'detenido'}</p>
            </Row>
            <Row>
                <p>con una velocidad de <strong><span style={{color:'#E4FF3E'}}>{autoTimeStatus/1000}</span></strong> seg</p>
            </Row>
        </Col>
        </>
    )
}
