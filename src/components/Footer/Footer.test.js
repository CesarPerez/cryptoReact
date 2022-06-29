import renderer from 'react-test-renderer'; // ES6
import Footer from './Footer';

test('Should match snapshot', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
