// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure AWS
AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY'
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'your-bucket-name';

app.post('/submit', async (req, res) => {
  const data = req.body;

  const filename = `report_${Date.now()}.json`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: JSON.stringify(data, null, 2),
    ContentType: 'application/json'
  };

  try {
    await s3.putObject(params).promise();
    res.json({ success: true, message: 'Data berjaya disimpan di S3!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal simpan data.' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
