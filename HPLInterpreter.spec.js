const { process } = require("./HPLInterpreter")

describe('Hand Challenge', () => {
  test('👉 : moves the memory pointer to the next cell', () => {
    expect(process('👉')).toEqual([0, 0]);
    expect(process('👉👉')).toEqual([0, 0, 0]);
  })

  test('👈 : moves the memory pointer to the previous cell', () => {
    expect(process('👉👈👉')).toEqual([0, 0]);
    expect(process('👈👈👉')).toEqual([0, 0]);
  })

  test('👆 : increment the memory cell at the current position', () => {
    expect(process('👆')).toEqual([1]);
    expect(process('👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆')).toEqual([0]);
  })

  test('👇 : decreases the memory cell at the current position', () => {
    expect(process('👇')).toEqual([255]);
    expect(process('👇👇')).toEqual([254]);
  })

  test('🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛', () => {
    expect(process('🤜👆🤛👇')).toEqual([255]);
    expect(process('👆🤜👆👇')).toEqual([1]);
  })

  test('🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜', () => {
    expect(process('🤛👇')).toEqual([255]);
    expect(process('🤜👆🤛👆👆👆👆👉🤛👇')).toEqual([4,255]);
  })

  test('🤜 : allows nested loops', () => {
    expect(process('🤜👆🤜👇🤛👇🤛👉👆')).toEqual([0, 1]);
  })

  test('👊 : Display the current character represented by the ASCII code defined by the current position', () => {
    const display = jest.fn();

    process('👇👇👇👇👊', display);

    expect(display).toHaveBeenCalledWith('ü');
    expect(display).toHaveBeenCalledTimes(1);
  })

  test('Display Hello', () => {
    const display = jest.fn();

    process('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊', display);

    expect(display).toHaveBeenCalledWith('H');
    expect(display).toHaveBeenCalledWith('e');
    expect(display).toHaveBeenCalledWith('l');
    expect(display).toHaveBeenCalledWith('l');
    expect(display).toHaveBeenCalledWith('o');
    expect(display).toHaveBeenCalledTimes(5);
  })

  test('Display Hello World!', () => {
    const display = jest.fn();


    process('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊', display);

    expect(display).toHaveBeenCalledWith('H');
    expect(display).toHaveBeenCalledWith('e');
    expect(display).toHaveBeenCalledWith('l');
    expect(display).toHaveBeenCalledWith('l');
    expect(display).toHaveBeenCalledWith('o');
    expect(display).toHaveBeenCalledWith(' ');
    expect(display).toHaveBeenCalledWith('W');
    expect(display).toHaveBeenCalledWith('o');
    expect(display).toHaveBeenCalledWith('r');
    expect(display).toHaveBeenCalledWith('l');
    expect(display).toHaveBeenCalledWith('d');
    expect(display).toHaveBeenCalledWith('!');
    expect(display).toHaveBeenCalledTimes(13);
  })
})