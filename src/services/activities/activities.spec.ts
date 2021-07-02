import { getActivityHistory } from './activities';
import { mockActivities } from '../../mocks';

test('it returns data on an ok response', async () => {
    const data = await getActivityHistory({
        targetId: 'string',
    });
    expect(data).toStrictEqual(mockActivities);
});
