import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBarLink from "./NavBarLink";

test('NavBarLink shows props.description as text', () => {
    const expectedText = 'Hello World';
    render(
        <MemoryRouter>
            <NavBarLink description={expectedText} />
        </MemoryRouter>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
});

test('NavBarLink renders link to / if "to" props is not provided', () => {
    const description = 'Click Me';
    render(
        <MemoryRouter>
            <NavBarLink description={description} />
        </MemoryRouter>
    );
    expect(screen.getByText(description)).toHaveAttribute("href", "/");
});

test('NavBarLink renders link to destination provided in "to" props', () => {
    const expectedTo = '/to';
    const description = 'click me';

    render(<MemoryRouter history={history} >
        <NavBarLink to={expectedTo} description={description} />
    </MemoryRouter>)

    expect(screen.getByText(description)).toHaveAttribute("href", expectedTo);
});