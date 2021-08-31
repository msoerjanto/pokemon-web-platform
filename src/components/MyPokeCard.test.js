import { fireEvent, render, screen } from "@testing-library/react";
import MyPokeCard from "./MyPokeCard";

const mockStub = jest.fn();

jest.mock('./PokeDisplay', () => (props) => {
    mockStub(props);
    return <></>;
});

test('MyPokeCard should pass name and image to PokeDisplay', () => {
    render(
        <MyPokeCard name='nickname' image='myImage' />
    );
    expect(mockStub).toHaveBeenCalledWith(expect.objectContaining({
        name: 'nickname',
        image: 'myImage'
    }));
});

test('MyPokeCard should call release prop when release button clicked', () => {
    const release = jest.fn();
    render(
        <MyPokeCard name='nickname' release={release} />
    );
    fireEvent.click(screen.getByText('Release'));
    
    expect(release).toHaveBeenCalledWith('nickname');
});