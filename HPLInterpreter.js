function process(input, display = () => {}) {
  const instructions = [...input];
  const memory = [0];
  let memoryPointer = 0;
  let pointer = 0;

  while (pointer < instructions.length) {
    const instruction = instructions[pointer];

    if (instruction === '👉') {
      if (memoryPointer + 1 >= memory.length) memory.push(0);

      memoryPointer++;
    }

    if (instruction === '👈') {
      if (memoryPointer === 0) memoryPointer = memory.length;
      
      memoryPointer--;
    }

    if (instruction === '👆') {
      memory[memoryPointer]++;
      if (memory[memoryPointer] == 256) memory[memoryPointer] = 0;
    }

    if (instruction === '👇') {
      memory[memoryPointer]--;
      if (memory[memoryPointer] == -1) memory[memoryPointer] = 255;
    }

    if (instruction === '🤜' && memory[memoryPointer] === 0) {
      let openLoops = 0;

      while (true) {
        if(instructions[pointer] === '🤜') openLoops++;
        if(instructions[pointer] === '🤛') {
          openLoops--;
          if(openLoops === 0) break;
        }
        
        pointer++;
      }
    }

    if (instruction === '🤛' && memory[memoryPointer] > 0) {
      let openLoops = 0;
      while (true) {
        if(instructions[pointer] === '🤛') openLoops++;
        if(instructions[pointer] === '🤜') {
          openLoops--;
          if(openLoops === 0) break;
        }
        pointer--;
      }
    }

    if (instruction === '👊') {
      display(String.fromCharCode(memory[memoryPointer]));
    }
    
    pointer++;
  }

  return memory;
}

module.exports = { process }