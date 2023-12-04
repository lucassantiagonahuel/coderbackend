import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";

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

const sortOrdField = (sortOrd) => {
  switch (sortOrd) {
    case 'asc':
      return { price: 1 }; 
    case 'desc':
      return { price: -1 };
    default:
      return { price: 1 }; 
  }
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

export const uploader = multer({ storage });
export const urlCreator = createUrlForFiles;
export const sortOrder = sortOrdField;
export default __dirname;
