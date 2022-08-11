import { describe, expect, it } from 'vitest';
import Api from '../src/apis/index';

describe('test api', () => {
  it('fulldata', async () => {
    const res = await Api.getFullData() as any;
    expect(res.data_title).equals('fymap');
  });
});
