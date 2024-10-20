import Logger from '@src/pairtest/lib/Observability/Logger';

describe('Logger', () => {
  let mockedLogger;
  beforeEach(() => {
    mockedLogger = jest.spyOn(Logger, 'error');
  });

  afterEach(() => {
    mockedLogger.mockRestore();
  });

  it('should call the error logger with the correct message', () => {
    const result = Logger.error('logging message!');

    expect(mockedLogger).toHaveBeenCalledWith('logging message!');

    expect(result).toBe(true);
  });
});
