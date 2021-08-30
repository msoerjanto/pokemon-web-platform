import { fireEvent, render, screen } from "@testing-library/react";
import PageControl from "./PageControl";

const next = 'Next';
const previous = 'Previous';

test('PageControl shows next button when there is valid next offset', () => {
    const validNextOffset = 46;
    render(<PageControl next={validNextOffset}/>);
    expect(screen.getByText(next)).toBeInTheDocument();
});

test('PageControl shows previous button when there is valid previous offset', () => {
    const prevOffset = 46;
    render(<PageControl prev={prevOffset} />);
    expect(screen.getByText(previous)).toBeInTheDocument();
});

test('PageControl does not show next button when next offset is 0', () => {
    const { queryByText } = render(<PageControl next={0} />);
    expect(queryByText(next)).toBeNull();
});

test('PageControl does not show previous button when previous offset is 0 and next is limit', () => {
    const { queryByText } = render(<PageControl previous={0} next={45}/>);
    expect(queryByText(previous)).toBeNull();
});

test('PageControl shows previous button when previous offset is 0 and next offset is not limit (only time prev shows when prevOffset is 0)', () => {
    const prevOffset = 0;
    const nextOffset = 46;
    render(<PageControl prev={prevOffset} next={nextOffset} />);
    expect(screen.getByText(previous)).toBeInTheDocument();
});

test('PageControl triggers changePage function with next when Next button is clicked', () => {
    const nextOffset = 46;
    const stub = jest.fn()
    render(<PageControl next={nextOffset} changePage={stub}/>);
    fireEvent.click(screen.getByText(next));
    
    expect(stub).toHaveBeenCalledWith(nextOffset);
});

test('PageControl triggers changePage function with prev when Previous button is clicked', () => {
    const prevOffset = 46;
    const stub = jest.fn()
    render(<PageControl prev={prevOffset} changePage={stub}/>);
    fireEvent.click(screen.getByText(previous));
    
    expect(stub).toHaveBeenCalledWith(prevOffset);
});