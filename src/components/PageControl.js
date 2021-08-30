import React from "react";

function PreviousButton({prev, next, onPrev}) {
    // need to make limit global
    if (!prev && next === 45) {
        return <></>;
    }
    return <>
        <button onClick={() => onPrev(prev)}>Previous</button>
    </>;
}

function NextButton({next, onNext}) {
    if (!next) {
        return <></>;
    }
    return <>
        <button onClick={() => onNext(next)}>Next</button>
    </>;
}

export default function PageControl({next, prev, changePage}) {
    return (
        <div>
            <PreviousButton next={next} prev={prev} onPrev={changePage}/>
            <NextButton next={next} onNext={changePage} />
        </div>
    );
}