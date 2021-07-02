import { rest } from 'msw';
import { getActivityHistory } from './activities';
import { config } from '../config';
import { server, mockActivities } from '../../mocks';

test('it returns data on an ok response', async () => {
    const data = await getActivityHistory({
        targetId: 'string',
    });
    expect(data).toStrictEqual(mockActivities);
});