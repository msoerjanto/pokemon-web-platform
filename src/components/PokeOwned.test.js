import { render, screen } from "@testing-library/react"
import PokeOwnedComponent from "./PokeOwned"

test('PokeOwned shows caught.length as heading element', () => {
    const caught = [1, 2, 3, 4, 5];
    render(
        <PokeOwnedComponent caught={caught} />
    );
    expect(screen.getByText(5)).toBeInstanceOf(HTMLHeadingElement);
});

test('PokeOwned shows 0 if no caught props passed', () => {
    render(
        <PokeOwnedComponent />
    );
    expect(screen.getByText(0)).toBeInstanceOf(HTMLHeadingElement);
});