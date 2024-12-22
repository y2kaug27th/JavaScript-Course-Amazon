import {formatCurrency} from "../../../../scripts/utils/money.js";

describe('Test suite: formatCurrency', () => {

  it('formatCurrency(2095)', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('formatCurrency(0)', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('formatCurrency(2000.5)', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
})