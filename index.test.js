import { test, expect } from "vitest";
import { filteredWeather } from "./filteredWeather.js";
import { weather } from "./mockInput.js";
import { expected } from "./mockExpected.js";

test("should return an array of weather", async () => {
  const actual = await filteredWeather(weather);
  expect(actual).toEqual(expected);
});
