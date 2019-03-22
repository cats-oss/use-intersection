describe('useIntersection', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should display "hiding" text on page', async () => {
    await expect(page).toMatch('hiding');
  });

  it('should display "intersecting" text on page', async () => {
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight);
    });

    await expect(page).toMatch('intersecting');

    await page.evaluate(() => {
      window.scrollTo(0, document.body.clientHeight - window.innerHeight);
    });

    await expect(page).toMatch('hiding');
  });
});
