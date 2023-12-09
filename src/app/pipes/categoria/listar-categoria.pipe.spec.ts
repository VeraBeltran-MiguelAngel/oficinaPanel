import { categoria } from "src/app/models/categoria";

describe('ListarCategoriaPipe', () => {
    it('create an instance', () => {
      const pipe = new categoria();
      expect(pipe).toBeTruthy();
    });
  });
