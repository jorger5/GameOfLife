import React from 'react';
import {Col} from 'reactstrap';

export default function GameCommandButton(props) {
    const { buttonAction, textToShow, buttonType } = props;
    return (
        <Col>
            <button className={buttonType} onClick={() => buttonAction()}>{textToShow}</button>
        </Col>
    )
}
