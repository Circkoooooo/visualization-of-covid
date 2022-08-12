import { it, describe, expect } from 'vitest';
import AxiosInstance from '../src/axiosInstance';

describe('test global api', () => {
  it('all data', async () => {
    const response = await AxiosInstance.get('https://c.m.163.com/ug/api/wuhan/app/data/list-total').then((res) => res.data);
    expect(response.msg).equals('成功');
  });
});
