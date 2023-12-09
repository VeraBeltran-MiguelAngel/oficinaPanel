import { producto } from "src/app/models/producto";
describe('ListarProductoPipe', () => {
  it('create an instance', () => {
    const pipe = new producto();
    expect(pipe).toBeTruthy();
  });
});
