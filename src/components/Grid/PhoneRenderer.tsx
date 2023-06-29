import React from 'react';

interface PhoneRendererProps {
    valueFormatted?:any;
    value?: any;
}

const PhoneRenderer: React.FC<PhoneRendererProps> = (props:PhoneRendererProps) => {
    const cellValue:any= props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = ():void => {
        alert(`${cellValue}`);
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <button onClick={buttonClicked}>See Me</button>
        </span>
    );
};

export default PhoneRenderer;
