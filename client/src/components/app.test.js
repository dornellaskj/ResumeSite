import expect from 'expect';
import App from './App';

describe('App', () => {
  it('shall exist', () => {
    let app = new App();

    expect(app).toNotBe(undefined);
  });
});