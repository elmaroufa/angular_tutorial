import { ListpipePipe } from './listpipe.pipe';

describe('ListpipePipe', () => {
  it('create an instance', () => {
    const pipe = new ListpipePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return array', ()=> {
    const pipe = new ListpipePipe();
    expect(pipe.transform('A,B,C')).toEqual(['A','B','C']);
  })
});
