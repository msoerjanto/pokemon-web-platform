import React from "react";

function PreviousButton({ prev, prevOffset, onPrev }) {
    // need to make limit global
    if (prev) {
        return <>
            <button onClick={() => onPrev(prevOffset)}>Previous</button>
        </>;
    }
    return <></>;
}

function NextButton({ next, nextOffset, onNext }) {
    if (next) {
        return <>
            <button onClick={() => onNext(nextOffset)}>Next</button>
        </>;
    }
    return <></>;
}

export default function PageControl({ next, prev, nextOffset = 0, prevOffset = 0, changePage }) {
    return (
        <div>
            <PreviousButton prev={prev} prevOffset={prevOffset} onPrev={changePage} />
            <NextButton next={next} nextOffset={nextOffset} onNext={changePage} />
        </div>
    );
}

