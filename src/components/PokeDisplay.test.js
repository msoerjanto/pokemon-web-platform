import { render, screen } from "@testing-library/react";
import PokeDisplay from "./PokeDisplay";

test('PokeDisplay shows the name based on name props', () => {
    render(<PokeDisplay name={'bulbasaur'} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
});

test('PokeDisplay shows image with src image props', () => {
    render(<PokeDisplay image={'myImage'} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'myImage');
});