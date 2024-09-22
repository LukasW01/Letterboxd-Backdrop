import {checkInput} from "../src/util/validation";

describe("Validation", (): void => {
    test("checkInput returns true for valid input", (): void => {
        expect(checkInput("https://letterboxd.com/")).toBe(false);
        expect(checkInput("https://a.ltrbxd.com/resized/sm/upload/7x/d5/lo/hi/moon-270-1200-1200-675-675-crop-000000.jpg")).toBe(true);
        expect(checkInput("https://a.ltrbxd.com/resized/sm/upload/7x/d5/lo/hi/moon-270-1200-1200-675-675-crop-000000.mp3")).toBe(false);
        expect(checkInput("https://a.ltrbxd.com/resized/sm/upload/7x/d5/lo/hi/moon-270-1200-1200-675-675-crop-000000")).toBe(false);
        expect(checkInput("")).toBe(false);
        expect(checkInput("https://cdn.wigger.one/img/hero.webp")).toBe(false);
    });
});
