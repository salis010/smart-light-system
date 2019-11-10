//could not use 'import' here because babel is not being used.
//due to time constraints I just copied the function here from Devices.js

const setDisplayBrightness = bulbsData => {
  const bulbs = bulbsData.data;

  for (let i = 0; i < bulbs.length; i++) {
    Object.assign(bulbs[i], {
      brightness: bulbs[i].active ? bulbs[i].brightness : 0,
      storedBrightness: bulbs[i].brightness,
    });
  }
  return bulbs;
};

describe('Test setDisplayBrightness', () => {
  const bulbs = {
    data: [
      {
        active: true,
        brightness: 100,
      },
      {
        active: false,
        brightness: 100,
      },
    ],
  };

  const result = setDisplayBrightness(bulbs);

  it('returns an object with the property "storedBrightness"', () => {
    return expect(result[0]).toHaveProperty('storedBrightness');
  });

  it('returns an object with the property "storedBrightness" set to the brightness value of the supplied object', () => {
    return expect(result[0].storedBrightness).toEqual(bulbs.data[0].brightness);
  });

  it('returns an object with the property "brightness" set to the brightness value of the supplied object if active is true', () => {
    return expect(result[0].brightness).toEqual(bulbs.data[0].brightness);
  });

  it('returns an object with the property "brightness" set to the zero value of the supplied object if active is true', () => {
    return expect(result[1].brightness).toEqual(0);
  });
});
