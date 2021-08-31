import { ActivityTargetType } from '@services';

export const isPerson = (targetType: ActivityTargetType): boolean =>
    targetType === 'person';

export const isContactDetails = (targetType: ActivityTargetType): boolean =>
    targetType === 'contactDetails';

export const isTenure = (targetType: ActivityTargetType): boolean =>
    targetType === 'tenure';
