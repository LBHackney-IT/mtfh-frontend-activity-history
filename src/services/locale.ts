import { ActivityTargetType } from '@services';

const locale = {
    activities: {
        pageTitle: 'Activity history',
        tableDate: 'date',
        tableCategory: 'category',
        tableEditDetails: 'edit details',
        tableEdittedBy: 'edited by',
        previouslyLabel: 'Previously:',
        changedToLabel: 'Changed to:',
        noEntryLabel: '[no entry]',
        editToLabel: 'Edit to',
        removedLabel: 'Removed',
        addedLabel: 'Added',
        noActivitiyHistory: 'No activity history',
        closeButton: 'Close activity history',
        person: 'Person',
        contactDetails: 'Contact detail',
        tenure: 'Tenure',
        asset: 'Asset',
        entityCreated: (type: ActivityTargetType) =>
            `${locale.activities[type]} created`,
        entityMigrated: (type: ActivityTargetType) =>
            `${locale.activities[type]} migrated`,
        entityEdited: (type: ActivityTargetType) =>
            `Edit to ${locale.activities[type]}`,
    },
};

export default locale;
