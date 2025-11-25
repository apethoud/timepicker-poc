const generateTimeOptions = () => {
  const opts = [];
  for (let i = 100; i < 1260; i++) {
    const lastTwoDigits = i - Math.floor(i / 100) * 100;
    if (lastTwoDigits > 59) {
      continue;
    }
    opts.push(i.toString().length === 3 ? `0${i}` : `${i}`);
  }
  return opts;
};

export const timeOptions = generateTimeOptions();
