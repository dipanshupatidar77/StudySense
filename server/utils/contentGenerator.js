const fs = require('fs');
const path = require('path');

const generateContent = (interest, category) => {
  return new Promise((resolve, reject) => {
    const folderPath = path.join(__dirname, '../public/interest', interest);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return reject('Error reading interest folder');
      }

      let filteredFiles = [];

      if (category.toLowerCase() === 'image') {
        filteredFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        if (filteredFiles.length === 0) return reject('No image found');
        const randomImage = filteredFiles[Math.floor(Math.random() * filteredFiles.length)];
        const imageUrl = `/interest/${interest}/${randomImage}`;
        resolve({ type: 'image', data: imageUrl });
      } else if (category.toLowerCase() === 'short story') {
        filteredFiles = files.filter(file => /\.txt$/i.test(file));
        if (filteredFiles.length === 0) return reject('No story found');
        const randomStory = filteredFiles[Math.floor(Math.random() * filteredFiles.length)];
        const storyPath = path.join(folderPath, randomStory);
        fs.readFile(storyPath, 'utf-8', (err, data) => {
          if (err) return reject('Error reading story file');
          resolve({ type: 'story', data });
        });
      } else {
        reject('Invalid category');
      }
    });
  });
};

module.exports = generateContent;
