// Będziemy używać expressa do node
const express = require("express");

// Będziemy zapisywać pliki więc będziemy potrzebować ścieżki i fs do zapisu plików
const path = require("path");
const fs = require("fs").promises;

const multer = require("multer");
// Będziemy chcieli startować aplikację
const app = express();
// I dwie ścieżki dla wrzucanych plików, w zależności czy będzie to obrazek czy nie obrazek. Nie jest to konieczne, ale tak jest w konspekcie

// za pomocą path i join do łączenia ścieżek możemy użyć przygotowanego przez node process.cwd który zwraca current working directory czyli w tym przypadku multer. Uploads to będą pliki tymczasowe a images już przetworzone
const uploadDir = path.join(process.cwd(), "uploads");
const storeImage = path.join(process.cwd(), "images");

// można to zgodnie z insturkcją na github multera dodać dest: ... ale żeby mieć trochę więcej władania nad plikiem, dodamy oddzielnie strage (w instrukcji storage - DiskStorage)
const storage = multer.diskStorage({
  // Tu wpisujemy domyślne destination
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  // I jak nasz plik ma się nazywać. Poniżej widać orginalną nazwę dodaną na końcu z uniqueSuffix, który jest skonstruowany chwilę wcześniej
  filename(req, file, cb) {
    // 1E9 to 10 do potęgi 9. Dodajemy to do nazwy, żeby pliki o jednakowej nazwie się nie nadpisywały. Nazwa będzie zawierała dodatkowy ciąg znaków
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, uniqueSuffix + "-" + file.originalname);
    getFilenameWithSuffix(file.originalname, cb);
  },
  // możemy dodawać limity jak maksymalna wielkość pliku
  // limits: { fileSize: 1047474 },
});

function getFilenameWithSuffix(originalname, callback) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  callback(null, uniqueSuffix + "-" + file.originalname);
}

const upload = multer({
  storage,
});

// picture poniżej to nazwa pola, z którego będziemy się spodziewać otrzymania elementu. Musi to być taka sama nazwa jak w postmanie (formularzu?) w body/form data jako key
app.post("/upload", upload.single("picture"), async (req, res, next) => {
  // jeśli będzie jakieś description do obrazka to pobieramy:
  const { description } = req.body;
  //   chcielibyśmy też pobrać informacje z pliku, bo prawie każdy jakieś ma, takie metadane, w tym przypadku pobieramy z request req.file. Warto zauważyć, że path już był wcześniej użyty, przez co jeśli nie nadam mu nowej nazwy (tempPathName) wywali błąd, że path.join is not a function (linijka niżej)
  const { path: tempPathName, originalname, filename, mimetype } = req.file;
  // const { path: tempPathName, originalname, filename } = req.file.mimetype;

  // i jeśli chciałbym to nazwać jakoś inaczej, to używam path:
  const fileName = path.join(storeImage, originalname);
  //   a jeśli chciałbym zostawić nazwę, to zamiast orginalname daję filename i wtedy nawet jak dodamy kilka razy ten sam obrazek, to i tak doda go kilka razy bo suffix będzie sie zmieniać
  //   const fileName = path.join(storeImage, filename);

  // TESTY:
  // console.log("tempPathName: ", tempPathName);
  // console.log("originalname: ", originalname);
  // console.log("fileName: ", fileName);
  // console.log("mimeType: ", mimetype);

  // teraz coś co pozwoli nam zapisać plik, bo normalnie multer nam tylko go udostępni, ale sam nie zapisze na dysku, więc używamy najlepiej przez try catch
  try {
    // if (mimeType === "image/png" || mimetype === 'image/jpeg) {
    //   // wtedy zrób await...
    // }
    // chcielibyśmy nadpisać nasz plik (tu znów używam tempPathName żeby nie pomylić z path)
    await fs.rename(tempPathName, fileName);
  } catch (error) {
    // zabezpieczenie:
    await fs.unlink(tempPathName);
    console.error(error);
  }

  //   i pobieramy odpowiedź. z góry zakładamy, że będzie description, jeśli nie w tym przypadku trudno, po prostu dostaniemy null, normalnie powiniśmy to zabezpieczyć przed błędem:
  res.json({
    description,
    message: "plik załadowany pomyślnie",
    status: 200,
  });
});

// w konspekcie mamy użycie libki http-errors(npm install http-errors) a my użyjemy z poprzednich zajęć rozpisanych errorów:
app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "You need to use /api route!",
    data: "Nothing found",
  });
});

app.use((err, _, res, __) => {
  console.error(err.stack);

  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "internal server error",
  });
});

// funkcja do sprawdzania, czy plik nie istnieje
const folderAlreadyExist = (path) => {
  // najłatwiej to sprawdzić przez access (próba dostania się do ścieżki) i jeśli wejdzie do thena to true, bo istnieje, a jeśli wejdzie do catcha to false bo nie istnieje:
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

// jeśli nie mamy jakiegoś katalogu, możemy go sobie stworzyć:
const createFolderIfNotExist = async (folderName) => {
  if (!(await folderAlreadyExist(folderName))) {
    // i jeśli plik nie istnieje, to mkdir stworzy nam folder
    await fs.mkdir(folderName);
  }
};

// Tworzymy nasz port:
const PORT = process.env.PORT || 3000;

// i nasłuch na port
app.listen(PORT, async () => {
  // możemy też coś tu zrobić więcej, np. stworzyć folder jeśli nie istnieje
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
  // teraz jak tylko wpiszemy npm start to foldery (jeśli ich nie ma) się stworzą

  // konsolujemy, że port został nawiązany
  console.log(`Server running on port ${PORT}`);
});

// jak uruchomię apke, wchodzę w POSTMAN i wpisuję w pasek adresu localhost:3000/upload, zmieniam na post, wchodzę w form-data, wpisuję w key picture, a value zmieniam z text na file. generalnie postman się dużo domyśla, ale warto sprawdzić czy w headers (mogą być ukryte, trzeba kliknąć oczko na górze) dodał Content-Type na multipart/form-data
