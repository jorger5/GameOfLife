import React from 'react';
import {Col} from 'reactstrap';

export default function GameTimeInput(props) {
    const {onChangeTime} = props;
    return (
        <Col>
        <input className='speedIn mt-5' style={{width: '350px'}}
        type='number'
        placeholder='Introduce tiempo de ejecución deseado'
        onChange={(e) => onChangeTime(e)}
        />
        </Col>
    )
}
