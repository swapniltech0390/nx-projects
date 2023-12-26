import path = require('path');
import { CodeownersExecutorSchema } from './schema';
import {
  PathLike,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from 'fs';

export default async function runExecutor(options: CodeownersExecutorSchema) {
  console.log('Executor ran for Codeowners');
  const sources = options.sources;
  const defaultReviewers = options.reviewers;
  let codeOwnersObject = '';
  let codeOwnersJSON = {};

  try {
    codeOwnersJSON['*'] = defaultReviewers;
    sources.forEach((source) => {
      const codeOwnersSetForApplications = addCodeOwners(
        `./${source}`,
        defaultReviewers
      );
      codeOwnersJSON = { ...codeOwnersJSON, ...codeOwnersSetForApplications };
    });

    for (const key in codeOwnersJSON) {
        const val = codeOwnersJSON[key];
        codeOwnersObject += `${key} ${val.join(' ')}\n`;
    }
    writeFileSync(`CODEOWNERS`, codeOwnersObject);
  } catch (e) {
    console.error(e);
  }
  return {
    success: true
  };
}

const addCodeOwners = (folderPath: PathLike, reviewers: string[] = []) => {
  const fileList = getFileNames(folderPath);
  const applicationCodeOwners = {};
  // Fetching reviewers from the project json of respective applications or libraries
  const listOfProjectJSON = fileList.filter((filePath) =>
    filePath.includes('project.json')
  );

  listOfProjectJSON.forEach((filePath) => {
    const fileLocation = filePath.replace(/\\/g, '/');
    if (fileLocation.includes('src/asseets')) {
      console.log(
        `Skipping "${filePath}" since it is inside a src/asset folder`
      );
    }
    const content = readFileSync(fileLocation, { encoding: 'utf8', flag: 'r' });
    const applicationReviewers = JSON.parse(content)['reviewers'];
    if (
      Array.isArray(applicationReviewers) &&
      applicationReviewers.length > 0
    ) {
      applicationCodeOwners[fileLocation] = applicationReviewers;
    } else {
      applicationCodeOwners[fileLocation] = reviewers;
    }
  });
  return applicationCodeOwners;
};

const getFileNames = (directory: PathLike, fileNames: string[] = []) => {
  const files = readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory.toString(), file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      getFileNames(filePath, fileNames);
    } else {
      fileNames.push(filePath);
    }
  });
  return fileNames;
};
