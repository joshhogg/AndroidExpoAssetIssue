# AndroidExpoAssetIssue

* A repository for investigating a permissions issue when publishing an Android App and loading via Expo Go
* run `npm run publish` or `yarn run publish` to see behaviour and error message


## Notes
* Standalone builds should work fine, the issue is with a published build loaded via Expo Go
* The file being loaded is a csv inside of the assets folder
* Special metro config needs to be added to load a csv file type
