import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const createUrlForFiles = (files) => {
  const urls = [];
  files.forEach((file) => {
    urls.push(`http://localhost:8080/static/images/${file.filename}`);
  });
  return urls;
};

export const uploader = multer({ storage });
export const urlCreator = createUrlForFiles;
export default __dirname;
