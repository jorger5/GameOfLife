import React from 'react';
import {Col} from 'reactstrap';


export default function GameSizeButton(props) {
    const { changeGridSize, textToShow} = props;
    return (
        <Col>
            <button className='buttons-g' onClick={() => changeGridSize()}>{textToShow}</button>
        </Col>
    )
}

