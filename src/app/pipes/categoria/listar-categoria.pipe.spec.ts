import { categoria } from "src/app/service/categoria";

describe('ListarCategoriaPipe', () => {
    it('create an instance', () => {
      const pipe = new categoria();
      expect(pipe).toBeTruthy();
    });
  });
