export async function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function waitAndReturnText(
  ms: number,
  text: string,
): Promise<string> {
  await wait(ms);
  return text;
}

export async function waitAndFail(ms: number, message: string): Promise<void> {
  await wait(ms);
  throw new Error(message);
}

export function waitForTexts(): Promise<string[]> {
  return Promise.all([
    waitAndReturnText(500, 'Test 1'),
    waitAndReturnText(1200, 'Test 2'),
    waitAndReturnText(800, 'Test 3'),
  ]);
}

export function waitForTextsWithFailure(): Promise<(string | void)[]> {
  return Promise.all([
    waitAndReturnText(500, 'Test 1'),
    waitAndFail(1200, 'Test 2'),
    waitAndReturnText(800, 'Test 3'),
  ]);
}

export async function waitForTextsAllSettled(): Promise<
  PromiseSettledResult<string | void>[]
> {
  return Promise.allSettled([
    waitAndReturnText(500, 'Test 1'),
    waitAndFail(1200, 'Test 2'),
    waitAndReturnText(800, 'Test 3'),
  ]);
}

export async function anySuccess() {
  return Promise.any([
    waitAndReturnText(1000, 'Test 1'),
    waitAndReturnText(2000, 'Test 2'),
    waitAndReturnText(200, 'Test 3'),
  ]);
}

export async function anyFailure() {
  return Promise.any([
    waitAndFail(1000, 'Test 1'),
    waitAndFail(2000, 'Test 2'),
    waitAndFail(200, 'Test 3'),
  ]);
}
