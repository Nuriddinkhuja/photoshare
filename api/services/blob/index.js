import path from 'path';
const appDir = path.dirname(require.main.filename);

export default function userService() {
  const app = this;

  // feathers-blob service
  const blobService = require('feathers-blob');
  // Here we initialize a FileSystem storage,
  // but you can use feathers-blob with any other
  // storage service like AWS or Google Drive.
  const fs = require('fs-blob-store');
  const blobStorage = fs(path.normalize(appDir + '/../uploads'));

  app.use('/uploads', blobService({Model: blobStorage}));
}
