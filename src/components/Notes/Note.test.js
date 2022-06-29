import renderer from 'react-test-renderer'; // ES6
import Note from './Note';

test('Should match the snapshot', () => {
  const handlerRemoveMock = jest.fn();
  const dummyText = 'dummyText';
  const dummyId = 1;
  const tree = renderer.create(<Note text={dummyText} handlerRemove={handlerRemoveMock} id={dummyId} />).toJSON();
  expect(tree).toMatchSnapshot();
});
