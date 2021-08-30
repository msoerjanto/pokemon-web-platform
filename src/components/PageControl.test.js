import { fireEvent, render, screen } from "@testing-library/react";
import PageControl from "./PageControl";

const next = 'Next';
const previous = 'Previous';

test('PageControl shows next button when next is truthy', () => {
    const validNextOffset = 46;
    render(<PageControl next={next} nextOffset={validNextOffset} />);
    expect(screen.getByText(next)).toBeInTheDocument();
});

test('PageControl shows previous button when prev is truthy', () => {
    const prevOffset = 46;
    render(<PageControl prev={previous} prev={prevOffset} />);
    expect(screen.getByText(previous)).toBeInTheDocument();
});

test('PageControl does not show next is not truthy', () => {
    const { queryByText } = render(<PageControl />);
    expect(queryByText(next)).toBeNull();
});

test('PageControl does not show previous button when previous offset is 0 and next is limit', () => {
    const { queryByText } = render(<PageControl />);
    expect(queryByText(previous)).toBeNull();
});

test('PageControl triggers changePage function with next when Next button is clicked', () => {
    const nextOffset = 46;
    const stub = jest.fn()
    render(<PageControl next={next} nextOffset={nextOffset} changePage={stub}/>);
    fireEvent.click(screen.getByText(next));
    
    expect(stub).toHaveBeenCalledWith(nextOffset);
});

test('PageControl triggers changePage function with prev when Previous button is clicked', () => {
    const prevOffset = 46;
    const stub = jest.fn()
    render(<PageControl prev={previous} prevOffset={prevOffset} changePage={stub}/>);
    fireEvent.click(screen.getByText(previous));
    
    expect(stub).toHaveBeenCalledWith(prevOffset);
});