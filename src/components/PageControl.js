import React from "react";

function PreviousButton(props) {
    // need to make limit global
    if (!props.prev && props.next === 45) {
        return <></>;
    }
    return <>
        <button onClick={() => props.onPrev(props.prev)}>Previous</button>
    </>;
}

function NextButton(props) {
    if (!props.next) {
        return <></>;
    }
    return <>
        <button onClick={() => props.onNext(props.next)}>Next</button>
    </>;
}

export default function PageControl(props) {
    return (
        <div>
            <PreviousButton next={props.next} prev={props.prev} onPrev={props.onPrev}/>
            <NextButton next={props.next} onNext={props.onNext} />
        </div>
    );
}